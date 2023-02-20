import axios from 'axios';
import { Graph } from '../../schemas/Graph';

export function fetchGraph(selectedCountry: string) {
    return new Promise<Graph>((resolve, reject) =>
        axios
            .get('http://localhost:6060/temperature/graph/' + selectedCountry)
            .then((response) => {
                resolve(response.data.message);
            })
            .catch((err) => {
                reject(err)
            })
    )
}
