import axios from "axios";

class ApiServiceUser {
  constructor() {
    this.api = axios.create({
      baseURL: "http://wolfie:6700/v1", // Replace with your API base URL
      timeout: 5000, // Adjust timeout value as needed
    });
  }

  // Login method
  login(values) {
    return this.api.post("/auth/login", values);
  }

  // Signup method
  signup(values) {
    console.log("values from sign up", values);
    return this.api.post("/auth/signup", values);
  }

  // Forgot password method
  forgotPassword(email) {
    return this.api.post("/auth/forgot", { email });
  }

  // Verify OTP method
  verifyOTP(email, otp) {
    return this.api.post("/auth/verify", { email, otp });
  }

  // Reset password method
  resetPassword(newPassword, confirmPassword) {
    return this.api.post("/auth/reset-password", {
      newPassword,
      confirmPassword,
    });
  }

  // Delete account method
  deleteAccount(userId, token) {
    return this.api.delete(`/user/delete`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        userId,
      },
    });
  }
  getUser(token) {
    return this.api.delete(`/user/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  loginWithPhone(phone) {
    return this.api.post("/phone/otp", { phone });
  }
}

export default new ApiServiceUser();
