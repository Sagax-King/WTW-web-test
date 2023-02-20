import axios from 'axios';
import { Country } from 'country-code-lookup';

export function fetchCountries() {
    return new Promise<Country[]>((resolve, reject) =>
        axios
            .get('http://localhost:6060/city/countries')
            .then((response) => {
                resolve(response.data.message);
            })
            .catch((err) => {
                reject(err)
            })
    )
}
