"use client";

import { useState, useRef, useEffect } from "react";
import { FaTimes, FaPaperPlane } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const API_URL = "https://ai.vhbuyio.in/api/chat";

export default function AiModal({ openModal, setOpenModal }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const chatEndRef = useRef(null);
  const abortControllerRef = useRef(null);

  /* ----------------------------- auto scroll ----------------------------- */

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isLoading]);

  /* ------------------------------ cleanup -------------------------------- */

  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort();
    };
  }, []);

  /* ------------------------------- close --------------------------------- */

  const handleClose = () => {
    abortControllerRef.current?.abort();
    setIsLoading(false);
    setOpenModal(false);
  };

  /* ---------------------------- send message ----------------------------- */

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();

    setInput("");
    setIsLoading(true);

    /*
     * Build conversation history BEFORE adding the new assistant message.
     *
     * Frontend:
     * {
     *   sender: "user",
     *   text: "Hello"
     * }
     *
     * Backend:
     * {
     *   role: "user",
     *   content: "Hello"
     * }
     */
    const history = [
      ...messages,
      {
        sender: "user",
        text: userMessage,
      },
    ]
      .filter((message) => message.text?.trim())
      .map((message) => ({
        role:
          message.sender === "user"
            ? "user"
            : "assistant",
        content: message.text,
      }));

    /*
     * Add user message immediately.
     */
    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: userMessage,
      },
    ]);

    /*
     * Add empty bot message.
     *
     * The streaming response will progressively fill this message.
     */
    setMessages((prev) => [
      ...prev,
      {
        sender: "bot",
        text: "",
      },
    ]);

    /*
     * Abort any previous request.
     */
    abortControllerRef.current?.abort();

    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      /* ----------------------------- request ----------------------------- */

      const response = await fetch(API_URL, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Accept: "text/event-stream",
        },

        body: JSON.stringify({
          messages: history,
        }),

        signal: controller.signal,
      });

      /* ----------------------------- errors ------------------------------ */

      if (!response.ok) {
        let errorMessage = "Unable to connect to Ayira AI.";

        try {
          const errorData = await response.json();

          if (errorData?.reply) {
            errorMessage = errorData.reply;
          }
        } catch {
          // Response wasn't JSON.
        }

        throw new Error(errorMessage);
      }

      if (!response.body) {
        throw new Error(
          "The server did not return a streaming response."
        );
      }

      /* --------------------------- read stream ---------------------------- */

      const reader = response.body.getReader();

      const decoder = new TextDecoder("utf-8");

      let buffer = "";
      let assistantText = "";

      while (true) {
        const { done, value } = await reader.read();

        if (done) break;

        /*
         * Decode incoming bytes.
         */
        buffer += decoder.decode(value, {
          stream: true,
        });

        /*
         * SSE events are separated by a blank line.
         *
         * Example:
         *
         * data: {"type":"delta","text":"Hello"}
         *
         * data: {"type":"delta","text":" world"}
         */
        const events = buffer.split("\n\n");

        /*
         * Keep the incomplete event for the next chunk.
         */
        buffer = events.pop() || "";

        for (const event of events) {
          const lines = event.split("\n");

          for (const line of lines) {
            const trimmedLine = line.trim();

            if (!trimmedLine.startsWith("data:")) {
              continue;
            }

            const data = trimmedLine.slice(5).trim();

            if (!data) {
              continue;
            }

            if (data === "[DONE]") {
              continue;
            }

            try {
              const parsed = JSON.parse(data);

              /* ---------------------------- start ---------------------------- */

              if (parsed.type === "start") {
                console.log(
                  "Ayira AI model:",
                  parsed.model?.name
                );

                if (parsed.fellBack) {
                  console.warn(
                    "Requested model was unavailable. Fallback model is being used."
                  );
                }
              }

              /* ---------------------------- delta ---------------------------- */

              if (parsed.type === "delta") {
                const text = parsed.text || "";

                assistantText += text;

                /*
                 * Update ONLY the last bot message.
                 */
                setMessages((prev) => {
                  const updated = [...prev];

                  const lastIndex =
                    updated.length - 1;

                  if (
                    lastIndex >= 0 &&
                    updated[lastIndex].sender === "bot"
                  ) {
                    updated[lastIndex] = {
                      ...updated[lastIndex],
                      text: assistantText,
                    };
                  }

                  return updated;
                });
              }

              /* ----------------------------- done ---------------------------- */

              if (parsed.type === "done") {
                console.log(
                  "Ayira AI response completed:",
                  parsed.meta
                );
              }

              /* ---------------------------- error ---------------------------- */

              if (parsed.type === "error") {
                throw new Error(
                  parsed.message ||
                    "The AI response was interrupted."
                );
              }
            } catch (parseError) {
              /*
               * Only throw actual server errors.
               *
               * Invalid/incomplete SSE data should not
               * break the entire chat.
               */
              if (
                parseError instanceof Error &&
                parseError.message ===
                  "The AI response was interrupted."
              ) {
                throw parseError;
              }

              console.warn(
                "Could not parse SSE data:",
                data
              );
            }
          }
        }
      }

      /*
       * Flush any remaining decoder data.
       */
      buffer += decoder.decode();

      /*
       * If somehow no response was received, show an error.
       */
      if (!assistantText.trim()) {
        setMessages((prev) => {
          const updated = [...prev];

          const lastIndex =
            updated.length - 1;

          if (
            lastIndex >= 0 &&
            updated[lastIndex].sender === "bot"
          ) {
            updated[lastIndex] = {
              ...updated[lastIndex],
              text:
                "⚠️ I didn't receive a response. Please try again.",
            };
          }

          return updated;
        });
      }
    } catch (error) {
      /*
       * Ignore AbortController cancellation.
       */
      if (error?.name === "AbortError") {
        return;
      }

      console.error(
        "Error sending message:",
        error
      );

      const errorText =
        error?.message ||
        "⚠️ Sorry, I encountered an error. Please try again.";

      /*
       * Replace the empty/partial bot response
       * with the error message.
       */
      setMessages((prev) => {
        const updated = [...prev];

        const lastIndex =
          updated.length - 1;

        if (
          lastIndex >= 0 &&
          updated[lastIndex].sender === "bot"
        ) {
          updated[lastIndex] = {
            ...updated[lastIndex],
            text: `⚠️ ${errorText}`,
          };
        }

        return updated;
      });
    } finally {
      setIsLoading(false);

      if (
        abortControllerRef.current === controller
      ) {
        abortControllerRef.current = null;
      }
    }
  };

  /* ----------------------------- keyboard -------------------------------- */

  const handleKeyDown = (e) => {
    if (
      e.key === "Enter" &&
      !e.shiftKey
    ) {
      e.preventDefault();
      sendMessage();
    }
  };

  /* ------------------------------- render -------------------------------- */

  if (!openModal) {
    return null;
  }

  return (
    <div className="fixed inset-0 sm:inset-auto sm:bottom-24 sm:right-6 z-[100] flex flex-col bg-background sm:w-[400px] sm:h-[600px] h-full w-full sm:rounded-2xl sm:border border-gray-200 dark:border-gray-800 shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-10 duration-300">

      {/* ============================== HEADER ============================== */}

      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-800 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">

        <div className="flex items-center gap-3">

          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-500/20 text-yellow-600">
            🤖
          </div>

          <div>
            <h2 className="text-sm font-semibold tracking-tight text-foreground">
              AI Assistant
            </h2>

            <p className="text-xs text-gray-500 dark:text-gray-400">
              Always here to help
            </p>
          </div>

        </div>

        <button
          type="button"
          onClick={handleClose}
          aria-label="Close AI Assistant"
          className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition-colors"
        >
          <FaTimes className="text-sm" />
        </button>

      </div>

      {/* ============================ CHAT AREA ============================= */}

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-gray-50/50 dark:bg-black/10">

        {/* Empty state */}

        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-3">

            <div className="w-12 h-12 rounded-full bg-yellow-500/10 flex items-center justify-center text-2xl">
              👋
            </div>

            <p className="text-sm text-gray-500 dark:text-gray-400">
              Hello! How can I assist you today?
            </p>

          </div>
        )}

        {/* Messages */}

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex w-full ${
              msg.sender === "user"
                ? "justify-end"
                : "justify-start"
            }`}
          >

            <div
              className={`px-4 py-2.5 rounded-2xl max-w-[85%] text-sm ${
                msg.sender === "user"
                  ? "bg-yellow-500 text-black rounded-br-sm"
                  : "bg-gray-100 dark:bg-gray-800/80 text-foreground rounded-bl-sm border border-gray-200/50 dark:border-gray-700/50"
              }`}
            >

              <div className="prose prose-sm dark:prose-invert max-w-none prose-p:leading-relaxed prose-pre:bg-black/10 prose-pre:text-foreground">

                {msg.text ? (
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                  >
                    {msg.text}
                  </ReactMarkdown>
                ) : (
                  /*
                   * Empty bot message while waiting
                   * for the first stream chunk.
                   */
                  msg.sender === "bot" &&
                  isLoading && (
                    <div className="flex gap-1.5 items-center py-1">

                      <span className="w-1.5 h-1.5 bg-foreground/50 rounded-full animate-bounce" />

                      <span className="w-1.5 h-1.5 bg-foreground/50 rounded-full animate-bounce [animation-delay:0.2s]" />

                      <span className="w-1.5 h-1.5 bg-foreground/50 rounded-full animate-bounce [animation-delay:0.4s]" />

                    </div>
                  )
                )}

              </div>

            </div>

          </div>
        ))}

        <div
          ref={chatEndRef}
          className="h-1"
        />

      </div>

      {/* ============================ INPUT AREA ============================ */}

      <div className="border-t border-gray-200 dark:border-gray-800 p-3 bg-background">

        <div className="relative flex items-center">

          <textarea
            value={input}
            onChange={(e) =>
              setInput(e.target.value)
            }
            onKeyDown={handleKeyDown}
            placeholder={
              isLoading
                ? "Ayira is thinking..."
                : "Type your message..."
            }
            rows={1}
            disabled={isLoading}
            className="flex-1 bg-gray-100 dark:bg-gray-900 border border-transparent rounded-full text-sm text-foreground pl-4 pr-12 py-3 focus:outline-none focus:ring-1 focus:ring-yellow-500 transition-colors resize-none overflow-hidden h-[44px] disabled:opacity-60"
          />

          <button
            type="button"
            onClick={sendMessage}
            disabled={
              isLoading ||
              !input.trim()
            }
            aria-label="Send message"
            className="absolute right-1.5 bg-yellow-500 hover:bg-yellow-600 text-black disabled:opacity-50 disabled:hover:bg-yellow-500 p-2 rounded-full transition-colors h-[32px] w-[32px] flex items-center justify-center"
          >
            <FaPaperPlane className="text-xs" />
          </button>

        </div>

      </div>

    </div>
  );
}
