"use client";

import Modal from "@mui/material/Modal";
import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function AiModal({ openModal, setOpenModal }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);

  // Auto-scroll to the bottom whenever messages change
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleClose = () => {
    setOpenModal(false); // Simplified: explicitly close the modal
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    
    // 1. Instantly show user's message & clear input (Real-time feel)
    setInput("");
    setMessages((prev) => [...prev, { sender: "user", text: userMessage }]);
    setIsLoading(true);

    try {
      // 2. Make API Call
      const res = await axios.post("https://ai.vhbuyio.in/api/chat", {
        message: userMessage,
      });
      
      // 3. Append Bot Response
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

  return (
    <Modal open={openModal} onClose={handleClose}>
      <div className="flex items-center justify-center min-h-screen p-4">
        {/* Modal Box */}
        <div className="bg-background text-foreground w-full max-w-2xl h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200 dark:border-gray-800">
          
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 dark:border-gray-800 bg-background">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🤖</span>
              <p className="text-xl font-semibold">AI Assistant</p>
            </div>
            <button 
              onClick={handleClose}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <FaTimes className="text-foreground text-lg" />
            </button>
          </div>

          {/* Chat Area */}
          <div className="flex-1 overflow-y-auto px-5 py-6 space-y-6 bg-gray-50/50 dark:bg-background">
            {messages.length === 0 && (
              <div className="text-center text-gray-400 dark:text-gray-500 mt-10">
                How can I help you today?
              </div>
            )}

            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`px-4 py-3 rounded-2xl max-w-[85%] md:max-w-[75%] whitespace-pre-wrap ${
                    msg.sender === "user"
                      ? "bg-blue-600 text-white rounded-br-sm shadow-md"
                      : "bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-bl-sm"
                  }`}
                >
                  <div className="prose dark:prose-invert max-w-none">
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
                <div className="bg-gray-200 dark:bg-gray-800 px-4 py-4 rounded-2xl rounded-bl-sm flex gap-1.5 items-center">
                  <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
            )}
            
            {/* Invisible div to scroll to */}
            <div ref={chatEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-200 dark:border-gray-800 p-4 bg-background flex gap-2 items-end">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything..."
              rows={1}
              className="flex-1 bg-transparent border border-gray-300 dark:border-gray-700 rounded-xl text-foreground px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none overflow-hidden min-h-[48px] max-h-32"
            />
            <button
              onClick={sendMessage}
              disabled={isLoading || !input.trim()}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl transition-colors font-medium h-[48px] flex items-center justify-center shadow-sm"
            >
              {isLoading ? "Sending..." : "Send"}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}