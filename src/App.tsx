"use client"

import { useEffect, useState, useRef } from "react"

export default function ChatApp() {
  const [keyboardHeight, setKeyboardHeight] = useState(0)
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false)
  const chatAreaRef = useRef<HTMLDivElement>(null)
  const lastTouchY = useRef<number | null>(null) // Track the last touch position for direction

  useEffect(() => {
    const handleResize = () => {
      if (window.visualViewport) {
        const viewportHeight = window.visualViewport.height
        const windowHeight = window.innerHeight
        const heightDiff = windowHeight - viewportHeight

        const keyboardIsOpen = heightDiff > 100
        setIsKeyboardOpen(keyboardIsOpen)
        setKeyboardHeight(keyboardIsOpen ? heightDiff : 0)

        if (keyboardIsOpen && chatAreaRef.current) {
          setTimeout(() => {
            chatAreaRef.current?.scrollTo({
              top: chatAreaRef.current.scrollHeight,
              behavior: "smooth",
            })
          }, 100)
        }
      }
    }

    window.addEventListener("resize", handleResize)
    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", handleResize)
    }

    const handleTouchStart = (e: TouchEvent) => {
      lastTouchY.current = e.touches[0].clientY
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (chatAreaRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = chatAreaRef.current
        const isAtTop = scrollTop <= 1 // Small buffer to account for rounding
        const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1
        const currentTouchY = e.touches[0].clientY

        // Determine scroll direction
        const isScrollingDown = lastTouchY.current !== null && currentTouchY < lastTouchY.current
        const isScrollingUp = lastTouchY.current !== null && currentTouchY > lastTouchY.current

        // Prevent default only if:
        // - At the top and trying to scroll further up
        // - At the bottom and trying to scroll further down
        if ((isAtTop && isScrollingUp) || (isAtBottom && isScrollingDown)) {
          e.preventDefault()
        }

        lastTouchY.current = currentTouchY
      }
    }

    document.addEventListener("touchstart", handleTouchStart, { passive: true })
    document.addEventListener("touchmove", handleTouchMove, { passive: false })

    return () => {
      window.removeEventListener("resize", handleResize)
      if (window.visualViewport) {
        window.visualViewport.removeEventListener("resize", handleResize)
      }
      document.removeEventListener("touchstart", handleTouchStart)
      document.removeEventListener("touchmove", handleTouchMove)
    }
  }, [])

  return (
    <div className="bg-[#111] text-[#f5f5f5] h-[100svh] w-[100vw] overflow-hidden fixed inset-0">
      {/* Navbar */}
      <div className="fixed top-0 left-0 w-full h-12 bg-gray-800 z-10 flex items-center justify-center border-b border-gray-700">
        <span className="text-white font-medium">Chat App</span>
      </div>

      {/* Chat area */}
      <div
        ref={chatAreaRef}
        className="absolute top-12 overflow-auto bg-gray-900 space-y-2 p-4"
        style={{
          bottom: `${24 + keyboardHeight + 10}px`, // Small buffer to ensure scrollability
          left: 0,
          right: 0,
          WebkitOverflowScrolling: "touch",
        }}
      >
        {Array(20)
          .fill(null)
          .map((_, i) => (
            <div
              key={i}
              className={`p-3 rounded-2xl max-w-[80%] ${
                i % 2 === 0 ? "bg-blue-600 ml-auto rounded-tr-none" : "bg-gray-700 rounded-tl-none"
              }`}
            >
              <div className="text-gray-100">
                {i % 2 === 0 ? "You: " : "Friend: "}
                This is message #{i + 1}
              </div>
            </div>
          ))}
      </div>

      {/* Textarea */}
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
  )
}