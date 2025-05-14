import { useEffect } from 'react';

function App() {
  useEffect(() => {
    const handleResize = () => {
      // Could use this if needed for logic in future
      if (window.visualViewport) {
        const isKeyboardLikelyOpen = window.innerHeight - window.visualViewport.height > 100;
        // Do something if needed
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
    <div className="bg-[#111] text-[#f5f5f5] h-[100svh] overflow-hidden relative">
      <div className="fixed top-0 left-0 w-full h-12 bg-gray-400 z-10 flex items-center justify-center">
        Navbar
      </div>

      <div className="absolute top-12 bottom-24 left-0 right-0 overflow-auto p-4 space-y-2 bg-gray-700">
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

      <div className="fixed bottom-0 left-0 w-full h-24 bg-gray-200 p-4 z-10">
        <textarea
          className="bg-[#444] w-full h-full px-4 py-2 rounded-2xl focus:outline-none"
        />
      </div>
    </div>
  );
}

export default App;
