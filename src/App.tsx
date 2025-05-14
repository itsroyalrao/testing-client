"use client";

import { useEffect, useState, useRef } from "react";

export default function ChatApp() {
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const chatAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.visualViewport) {
        const viewportHeight = window.visualViewport.height;
        const windowHeight = window.innerHeight;
        const heightDiff = windowHeight - viewportHeight;

        // Consider keyboard open if the difference is significant
        const keyboardIsOpen = heightDiff > 100;

        setIsKeyboardOpen(keyboardIsOpen);
        setKeyboardHeight(keyboardIsOpen ? heightDiff : 0);

        // Scroll to bottom when keyboard opens
        if (keyboardIsOpen && chatAreaRef.current) {
          setTimeout(() => {
            chatAreaRef.current?.scrollTo({
              top: chatAreaRef.current.scrollHeight,
              behavior: "smooth",
            });
          }, 100);
        }
      }
    };

    // Listen for resize events on both window and visualViewport
    window.addEventListener("resize", handleResize);
    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", handleResize);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  return (
    <div className="bg-[#111] text-[#f5f5f5] h-[100svh] overflow-hidden relative">
      {/* Navbar - fixed height */}
      <div className="fixed top-0 left-0 w-full h-12 bg-gray-800 z-10 flex items-center justify-center border-b border-gray-700">
        <span className="text-white font-medium">Chat App</span>
      </div>

      {/* Chat area - dynamic height based on keyboard */}
      <div
        ref={chatAreaRef}
        className="absolute top-12 overflow-auto bg-gray-900 space-y-2 p-4"
        style={{
          bottom: `${24 + keyboardHeight}px`, // Adjust bottom based on input height + keyboard
          left: 0,
          right: 0,
        }}
      >
        {Array(20)
          .fill(null)
          .map((_, i) => (
            <div
              key={i}
              className={`p-3 rounded-2xl max-w-[80%] ${
                i % 2 === 0
                  ? "bg-blue-600 ml-auto rounded-tr-none"
                  : "bg-gray-700 rounded-tl-none"
              }`}
            >
              <div className="text-gray-100">
                {i % 2 === 0 ? "You: " : "Friend: "}
                This is message #{i + 1}
              </div>
            </div>
          ))}
      </div>

      {/* Textarea input - fixed at bottom but above keyboard */}
      <div
        className="fixed left-0 w-full h-24 bg-gray-800 p-4 z-10"
        style={{
          bottom: isKeyboardOpen ? `${keyboardHeight}px` : 0,
        }}
      >
        <textarea
          className="bg-gray-700 w-full h-full px-4 py-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white resize-none"
          placeholder="Type a message..."
        />
      </div>
    </div>
  );
}
