import DefaultService from '../DefaultService';
import axios from 'axios';

class CountriesService implements DefaultService{

    baseUrl :string = process.env.REACT_APP_BASE_URL;

    resource :string = "/carros";

    getAll() {
        return axios.get(`${this.baseUrl}${this.resource}/paises`)
    }
}
export default CountriesService