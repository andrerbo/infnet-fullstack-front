import axios from "axios";

class VersionService {

    baseUrl :string = process.env.REACT_APP_BASE_URL;
  
    resource :string = "/version";
  
    getVersion() {
      return axios.get(`${this.baseUrl}${this.resource}`)
    }
    
  }
  export default VersionService