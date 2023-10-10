import axios from "axios";

class ApiServicePlace {
  constructor() {
    this.api = axios.create({
      baseURL: "http://localhost:6700/v1", // Replace with your API base URL
      timeout: 5000, // Adjust timeout value as needed
    });
  }

  // Get place method
  getPlace() {
    return this.api.get(`/place/`);
  }

  // Rate place method
  ratePlace(placeId, userId, rating) {
    return this.api.post(`/place/${placeId}/rate`, { userId, rating });
  }
}

export default new ApiServicePlace();
