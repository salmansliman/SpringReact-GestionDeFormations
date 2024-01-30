import axios from "../api/axios";

const AuthService = {
  login: async (user, pwd) => {
    try {
      const response = await axios.post("/users/authenticate", {
        email: user,
        password: pwd,
      });

      const accessToken = response?.data?.token;
      const role = response?.data?.role;

      return { success: true, accessToken, role };
    } catch (error) {
      console.error("Login failed:", error);

      let errMsg = "";

      if (!error?.response) {
        errMsg = "No Server Response";
      } else if (error.response?.status === 400) {
        errMsg = "Missing username or password";
      } else if (error.response?.status === 403) {
        errMsg = "Unauthorized";
      } else {
        errMsg = "Login failed";
      }

      return { success: false, errMsg };
    }
  },
};

export default AuthService;
