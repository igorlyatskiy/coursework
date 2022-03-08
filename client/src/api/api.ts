import axios from "axios";

class Api {
  baseUrl: string = 'http://localhost:8080'
  axiosInstance = axios.create({ baseURL: this.baseUrl, withCredentials: true })

  static instance() {
    return apiInstance
  }

  async getSession() {
    const { data } = await this.axiosInstance.get('/auth/session');
    return data;
  }

  async clearSession() {
    await this.axiosInstance.get('/auth/google/logout')
  }

  async getRooms() {
    const { data } = await this.axiosInstance.get('/rooms');
    return data;
  }

  async createRoom(roomName: string) {
    return await this.axiosInstance.post('/rooms', { name: roomName });
  }

  async updateUser(username: string) {
    return this.axiosInstance.put('/user', { username })
  }

  async deleteRoom(roomId: string) {
    return await this.axiosInstance.delete(`/rooms/${roomId}`);
  }

  async getTopUsers() {
    const { data } = await this.axiosInstance.get('/top');
    return data;
  }
}

const apiInstance = new Api();

export default apiInstance;