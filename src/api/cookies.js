import axios from "axios";

const getJWTokens = async (setAccessToken, setRefreshToken, setLoading) => {
  const response = await axios.get(
    "http://localhost:3000"
    // "https://testing-xhvv.onrender.com"
  );
  if (response.data.success) {
    setLoading(true);
    setAccessToken(response.data.tokens.accessToken);
    setRefreshToken(response.data.tokens.refreshToken);
  }
};

const getData = async (accessToken, refreshToken) => {
  const response = await axios.post(
    "http://localhost:3000",
    // "https://testing-xhvv.onrender.com",
    { accessToken, refreshToken }
  );
  console.log(response);
};

const setCookies = async (email) => {
  console.log(email);

  const response = await axios.get(
    `http://localhost:3000?email=${email}`
    // `https://testing-xhvv.onrender.com?email=${email}`
  );

  console.log(response);
  if (response.data.success) {
    document.cookie = `accessToken=${response.data.tokens.accessToken}`;
    document.cookie = `refreshToken=${response.data.tokens.refreshToken}`;
  }
};

export { getJWTokens, getData, setCookies };
