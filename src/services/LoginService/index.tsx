import axios from 'axios';
import axiosInstance from '../../infra/axiosInstance';

class LoginService {
  baseUrl :string = process.env.REACT_APP_BASE_URL;

  resource :string = "/usuarios";

  login(username:string, password:string){
    return axios.post(
      `${this.baseUrl}${this.resource}/login`,
      {email: username, password: password}
    )
  }

  getMyProfile() {
    return axiosInstance.get(`${this.baseUrl}${this.resource}/my-profile`)
  }
}
export default LoginService;