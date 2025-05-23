export default function App() {
  return (
    <div className="flex flex-col h-screen bg-[#333]">
      {/* Navbar */}
      <nav className="bg-gray-800 text-white p-4">
        <h1 className="text-xl font-bold">My App</h1>
      </nav>

      {/* Scrollable Main Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {Array.from({ length: 50 }, (_, i) => (
          <p key={i} className="text-white">
            This is the middle portion of the app.
          </p>
        ))}
      </div>

      {/* Footer with Input */}
      <footer className="bg-gray-200 p-4">
        <input
          type="text"
          placeholder="Type a message..."
          className="w-full p-2 rounded border border-gray-300"
        />
      </footer>
    </div>
  );
}
