import axios from "axios";

const setCookies = async (email, navigate) => {
  const response = await axios.get(
    // `http://localhost:3000?email=${email}`
    `https://testing-xhvv.onrender.com?email=${email}`
  );

  if (response.data.success) {
    document.cookie = `accessToken=${response.data.tokens.accessToken}`;
    document.cookie = `refreshToken=${response.data.tokens.refreshToken}`;
    navigate("/");
  }
};

const isAuthorized = async (navigate, setLoading) => {
  const cookies = {};
  document.cookie.split("; ").forEach((cookie) => {
    const temp = cookie.split("=");
    cookies[temp[0]] = temp[1];
  });

  const response = await axios.post(
    // "http://localhost:3000",
    "https://testing-xhvv.onrender.com",
    cookies
  );
  if (response.data.success) {
    setLoading(true);
  } else {
    navigate("/login");
  }
};

export { setCookies, isAuthorized };
