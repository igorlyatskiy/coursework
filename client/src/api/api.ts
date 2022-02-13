import axios from "axios";

class Api {
  baseUrl: string = 'http://localhost:8080'

  static instance() {
    return apiInstance
  }

  async getRooms() {
    const { data } = await axios.get(this.baseUrl + '/rooms');
    return data;
  }

  createRoom(roomName: string) {
    return axios.post(this.baseUrl + '/rooms', { name: roomName })
  }
}

const apiInstance = new Api();

export default apiInstance;