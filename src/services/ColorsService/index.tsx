import DefaultService from '../DefaultService';
import axios from 'axios';

class ColorsService implements DefaultService{

  baseUrl :string = process.env.REACT_APP_BASE_URL;

  resource :string = "/carros";

  getAll() {
    return axios.get(`${this.baseUrl}${this.resource}/cores`)
  }
}
export default ColorsService