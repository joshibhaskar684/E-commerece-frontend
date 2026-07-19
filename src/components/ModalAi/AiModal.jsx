"use client";

import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { FaTimes, FaPaperPlane } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function AiModal({ openModal, setOpenModal }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleClose = () => {
    setOpenModal(false);
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { sender: "user", text: userMessage }]);
    setIsLoading(true);

    try {
      const res = await axios.post("https://ai.vhbuyio.in/api/chat", {
        message: userMessage,
      });
      setMessages((prev) => [...prev, { sender: "bot", text: res.data.reply }]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ Sorry, I encountered an error. Please try again." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!openModal) return null;

  return (
    <div className="fixed inset-0 sm:inset-auto sm:bottom-24 sm:right-6 z-[100] flex flex-col bg-background sm:w-[400px] sm:h-[600px] h-full w-full sm:rounded-2xl sm:border border-gray-200 dark:border-gray-800 shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-10 duration-300">
      
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-800 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-500/20 text-yellow-600">
            🤖
          </div>
          <div>
            <h2 className="text-sm font-semibold tracking-tight text-foreground">AI Assistant</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">Always here to help</p>
          </div>
        </div>
        <button 
          onClick={handleClose}
          className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition-colors"
        >
          <FaTimes className="text-sm" />
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-gray-50/50 dark:bg-black/10">
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

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex w-full ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`px-4 py-2.5 rounded-2xl max-w-[85%] text-sm ${
                msg.sender === "user"
                  ? "bg-yellow-500 text-black rounded-br-sm"
                  : "bg-gray-100 dark:bg-gray-800/80 text-foreground rounded-bl-sm border border-gray-200/50 dark:border-gray-700/50"
              }`}
            >
              <div className="prose prose-sm dark:prose-invert max-w-none prose-p:leading-relaxed prose-pre:bg-black/10 prose-pre:text-foreground">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {msg.text}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        ))}

        {/* Real-time Typing Indicator */}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 dark:bg-gray-800/80 border border-gray-200/50 dark:border-gray-700/50 px-4 py-3.5 rounded-2xl rounded-bl-sm flex gap-1.5 items-center">
              <span className="w-1.5 h-1.5 bg-foreground/50 rounded-full animate-bounce"></span>
              <span className="w-1.5 h-1.5 bg-foreground/50 rounded-full animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-1.5 h-1.5 bg-foreground/50 rounded-full animate-bounce [animation-delay:0.4s]"></span>
            </div>
          </div>
        )}
        
        <div ref={chatEndRef} className="h-1" />
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 dark:border-gray-800 p-3 bg-background">
        <div className="relative flex items-center">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            rows={1}
            className="flex-1 bg-gray-100 dark:bg-gray-900 border border-transparent rounded-full text-sm text-foreground pl-4 pr-12 py-3 focus:outline-none focus:ring-1 focus:ring-yellow-500 transition-colors resize-none overflow-hidden h-[44px]"
          />
          <button
            onClick={sendMessage}
            disabled={isLoading || !input.trim()}
            className="absolute right-1.5 bg-yellow-500 hover:bg-yellow-600 text-black disabled:opacity-50 disabled:hover:bg-yellow-500 p-2 rounded-full transition-colors h-[32px] w-[32px] flex items-center justify-center"
          >
            <FaPaperPlane className="text-xs" />
          </button>
        </div>
      </div>
    </div>
  );
}