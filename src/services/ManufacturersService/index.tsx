import DefaultService from '../DefaultService';
import axios from 'axios';

class ManufacturersService implements DefaultService{

  baseUrl :string = process.env.REACT_APP_BASE_URL;

  resource :string = "/carros";

  getAll() {
    return axios.get(`${this.baseUrl}${this.resource}/fabricantes`)
  }

}
export default ManufacturersService