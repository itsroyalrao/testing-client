import { useState } from "react";
import { setCookies } from "../api/cookies";

function Login() {
  const [email, setEmail] = useState("");

  return (
    <div className="bg-[#242424] h-[100svh] text-white">
      <div className="h-full flex justify-center items-center">
        <input
          type="email"
          className="bg-slate-400 p-2 rounded-s"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div
          className="bg-blue-600 p-2 rounded-e cursor-pointer"
          onClick={() => setCookies(email)}
        >
          Login
        </div>
      </div>
    </div>
  );
}

export default Login;
