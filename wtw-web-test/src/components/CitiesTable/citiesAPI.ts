import axios from 'axios';
import { City } from '../../schemas/City';

export function fetchCities(selectedCountry: string) {
    return new Promise<City[]>((resolve, reject) =>
        axios
            .get('http://localhost:6060/city/cities/' + selectedCountry)
            .then((response) => {
                resolve(response.data.message);
            })
            .catch((err) => {
                reject(err)
            })
    )
}
