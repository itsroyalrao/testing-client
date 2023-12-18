import axios from "axios";

const isAuthorized = async (navigate) => {
  try {
    console.log("sdgjkdsgfdsjbgvdsbkjv");
    const response = await axios.get(
      // `http://localhost:3000/auth`
      `https://auth-mjoz.onrender.com/auth`
    );
    console.log(response);
    if (response.data.success) {
      console.log("Mahadev");
    } else {
      navigate("/login");
    }
  } catch (e) {
    console.log(e);
  }
};

export { isAuthorized };
