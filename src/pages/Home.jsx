import { useEffect, useState } from "react";
import { isAuthorized } from "../api/cookies";
import { useNavigate } from "react-router-dom";

function Home() {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    isAuthorized(navigate, setLoading);
  }, [navigate]);
  return (
    <div className="bg-[#242424] h-[100svh] text-white">
      {loading && (
        <div className="h-full flex justify-center items-center">Home</div>
      )}
    </div>
  );
}

export default Home;
