import { useEffect, useState } from "react";

function Loader() {
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("Initializing server...");

  useEffect(() => {
    const messages = [
      "Initializing server...",
      "Connecting to backend...",
      "Waking up services...",
      "Almost ready...",
    ];

    let msgIndex = 0;

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1; // 2 min feel → slow increment
      });
    }, 1200); // 100 * 1200ms ≈ 2 minutes

    const messageInterval = setInterval(() => {
      msgIndex = (msgIndex + 1) % messages.length;
      setMessage(messages[msgIndex]);
    }, 5000);

    return () => {
      clearInterval(progressInterval);
      clearInterval(messageInterval);
    };
  }, []);

  return (
    <div className="h-screen flex items-center justify-center bg-[#F9FAFB]">
      <div className="bg-white border border-gray-300 rounded-lg p-6 w-[300px] text-center shadow-sm space-y-4">
        
        {/* Spinner */}
        <div className="flex justify-center">
          <div className="w-10 h-10 border-4 border-gray-300 border-t-gray-800 rounded-full animate-spin"></div>
        </div>

        {/* Message */}
        <p className="text-gray-800 text-base font-medium">
          {message}
        </p>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div
            className="bg-gray-800 h-2 transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Percentage */}
        <p className="text-sm text-gray-600">
          {progress}%
        </p>

        {/* Extra Hint */}
        <p className="text-xs text-gray-400">
          Free servers may take up to 2 minutes to wake up
        </p>
      </div>
    </div>
  );
}

export default Loader;