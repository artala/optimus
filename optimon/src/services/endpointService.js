import axios from "../axios";

class EndpointService {
  getTrustData(id) {
    return axios.get(`/trust/${id}`);
  }
}

export default new EndpointService();