import api from "@/plugin/axios";

class AuthService {
  async login(data) {
    try {
      const response = await api.post("auth/login/", data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  async register(data) {
    try {
      const response = await api.post("auth/register/", data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  async logout() {
    try {
      const response = await api.post("logout/");
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  async getUser() {
    try {
      const response = await api.get("user/");
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
}

export default new AuthService();