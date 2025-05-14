function App() {
  return (
    <div className="bg-[#111] h-[100svh] text-[#f5f5f5] flex flex-col overflow-hidden">
      <div className="w-full bg-gray-400">Navbar</div>
      <div className="w-full grow bg-gray-700 space-y-2 p-4 overflow-auto">
        {Array(100)
          .fill(null)
          .map((_, i) => (
            <div
              key={i}
              className="w-full h-20 bg-gray-500 rounded-2xl flex items-center justify-center"
            >
              <div className="text-2xl text-gray-100">Hello world {i}</div>
            </div>
          ))}
      </div>
      <div className="w-full p-4 bg-gray-200 pb-[env(safe-area-inset-bottom)]">
        <textarea 
          className="bg-[#444] w-full h-20 px-4 py-2 rounded-2xl focus:outline-none"
          style={{ WebkitOverflowScrolling: 'touch' }} // For smooth scrolling on iOS
        />
      </div>
    </div>
  );
}

export default App;