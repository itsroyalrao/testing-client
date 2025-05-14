import { useEffect, useState } from 'react';

function App() {
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.visualViewport) {
        const isKeyboardLikelyOpen = window.innerHeight > window.visualViewport.height;
        setIsKeyboardOpen(isKeyboardLikelyOpen);
      }
    };

    window.addEventListener('resize', handleResize);
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleResize);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', handleResize);
      }
    };
  }, []);

  return (
    <div className="bg-[#111] text-[#f5f5f5] flex flex-col h-[100svh] overflow-hidden">
      <div className="w-full bg-gray-400">Navbar</div>
      <div className={`w-full ${isKeyboardOpen ? 'h-[calc(100svh-180px)]' : 'flex-grow'} bg-gray-700 space-y-2 p-4 overflow-auto`}>
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
      <div className="w-full p-4 bg-gray-200">
        <textarea
          className="bg-[#444] w-full h-20 px-4 py-2 rounded-2xl focus:outline-none"
          onFocus={() => setIsKeyboardOpen(true)}
          onBlur={() => setIsKeyboardOpen(false)}
        />
      </div>
    </div>
  );
}

export default App;