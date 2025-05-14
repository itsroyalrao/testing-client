function App() {
  return (
    <div className="bg-[#111] h-[100svh] text-[#f5f5f5] flex flex-col">
      <div className="w-full bg-gray-400">Navbar</div>
      <div className="w-full grow bg-gray-700">ChatArea</div>
      <div className="w-full p-4 bg-gray-200">
        <textarea className="bg-[#444] w-full h-20 px-4 py-2 rounded-2xl focus:outline-none" />
      </div>
    </div>
  );
}

export default App;
