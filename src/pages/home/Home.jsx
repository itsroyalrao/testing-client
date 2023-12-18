import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { isAuthorized } from "../../helper/home/home";

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    isAuthorized(navigate);
  }, [navigate]);
  return (
    <div className="bg-[#242424] h-[100svh] min-h-[100svh] text-white">
      <div className="h-full flex justify-center items-center">
        <Link to={"/login"} className="text-xl underline">
          Back to login page
        </Link>{" "}
      </div>
    </div>
  );
}

export default Home;
