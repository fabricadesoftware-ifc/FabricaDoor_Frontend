import api from "@/plugin/axios";

class AuthService {
  async login(data) {
    try {
      const response = await api.post("auth/login/", data);
      return response.data;
    } catch (error) {
      return error
    }
  }

  async register(data) {
    try {
      const response = await api.post("auth/register/", data);
      return response.data;
    } catch (error) {
      return error
    }
  }
}

export default new AuthService();