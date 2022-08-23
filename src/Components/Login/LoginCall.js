import axios from "axios";

export const LoginCall = async (userDetails, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await axios.post("http://localhost/fgm/signin.php", userDetails);
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    const error = true
    res.data.status &&  dispatch({ type: "LOGIN_FAILURE", payload: error });
    
    res.data.user_name && window.location.replace("http://localhost:3000/dashboard");
  } catch (error) {

  }

  
};