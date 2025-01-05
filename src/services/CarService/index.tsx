import axios from 'axios';
import { Car } from '../../models/car';

class CarService {

  baseUrl :string = process.env.REACT_APP_BASE_URL;

  resource :string = "/carros";

  save(car :Car){
    return axios.post(`${this.baseUrl}${this.resource}`, car)
  }

  getAllPaginated(page :number, size :number){
    return axios.get(`${this.baseUrl}${this.resource}?page=${page}&size=${size}`)
  }

  delete(id: number){
    return axios.delete(`${this.baseUrl}${this.resource}/${id}`)
  }

  getById(id :number){
    return axios.get<Car>(`${this.baseUrl}${this.resource}/${id}`)
  }

  update(id :number, car :Car){
    return axios.put(`${this.baseUrl}${this.resource}/${id}`, car)
  }

  csvDownload() {
    return axios.get(`${this.baseUrl}${this.resource}/export-cars`, {
      responseType: "blob"
    });
  }

  search(formData: { pais :string; modelo :string; fabricante :string }) {
    return axios.get<Car[]>(`${this.baseUrl}${this.resource}/search`,{
      params: {
        pais: formData.pais,
        modelo: formData.modelo,
        fabricante: formData.fabricante
      }
    })
  }
}
export default CarService;