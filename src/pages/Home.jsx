import { useEffect, useState } from "react";
import { getJWTokens, getData } from "../api/cookies";
import { useNavigate } from "react-router-dom";

function Home() {
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  console.log(accessToken, refreshToken);

  useEffect(() => {
    navigate("/login");
    getJWTokens(setAccessToken, setRefreshToken, setLoading);
  }, [navigate]);
  return (
    <div className="bg-[#242424] h-[100svh] text-white">
      {loading && (
        <div
          className="h-full flex justify-center items-center"
          onClick={() => getData(accessToken, refreshToken)}
        >
          Home
        </div>
      )}
    </div>
  );
}

export default Home;
