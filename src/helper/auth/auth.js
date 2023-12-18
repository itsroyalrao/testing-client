import axios from "axios";

async function registerUser(
  username,
  email,
  password,
  confirmPassword,
  setMessage,
  navigate
) {
  try {
    if (!username) setMessage("Please provide Username");
    else if (!email) setMessage("Please provide Email address");
    else if (!password) setMessage("Please provide Password");
    else if (password !== confirmPassword) setMessage("Password doesn't match");
    else {
      const response = await axios.post(`http://localhost:3000/auth/register`, {
        username,
        email,
        password,
      });
      if (response.data.success) navigate("/");
      else setMessage(response.data.msg);
    }
  } catch (e) {
    console.log(e);
  }
}

async function getUser(email, password, setMessage, navigate) {
  try {
    if (!email) setMessage("Please provide Email address");
    else if (!password) setMessage("Please provide Password");
    else {
      const response = await axios.post(`http://localhost:3000/auth/login`, {
        email,
        password,
      });
      if (response.data.success) navigate("/");
      else setMessage(response.data.msg);
    }
  } catch (e) {
    console.log(e);
  }
}

async function findUser(setUser) {
  try {
    const user = localStorage.getItem("user");

    if (user) {
      const response = await axios.get(
        `http://localhost:3000/home?user=${user}`
      );
      if (response.data.success) {
        if (response.data.user.loggedIn) {
          setUser(response.data.user);
        } else {
          window.location.href = "/login";
        }
      } else {
        window.location.href = "/login";
      }
    } else {
      window.location.href = "/login";
    }
  } catch (e) {
    console.log(e);
  }
}

const resetPass = async (email, setMessage) => {
  try {
    if (email) {
      const response = await axios.post(
        "http://localhost:3000/auth/resetPassword",
        { email }
      );

      if (response.data.success) setMessage(response.data.msg);
      else setMessage(response.data.msg);

      email = "";
    } else {
      setMessage("Please provide email");
    }
  } catch (e) {
    console.log(e.message);
  }
};

const changePass = async (
  email,
  newPassword,
  confirmNewPassword,
  setMessage
) => {
  try {
    if (newPassword === confirmNewPassword && newPassword !== "") {
      const response = await axios.post(
        "http://localhost:3000/auth/changePassword",
        {
          email,
          newPassword,
        }
      );
      if (response.data.success) {
        setMessage(response.data.msg);
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      }
    } else if (newPassword === "") setMessage("Please provide password!");
    else setMessage("Password do not match!");
  } catch (e) {
    console.log(e.message);
  }
};

export { registerUser, getUser, findUser, resetPass, changePass };
