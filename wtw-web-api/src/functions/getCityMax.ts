import { City } from '../schemas/city';
import { Temperature } from '../schemas/temperature';

const getCityMax = (temperatures: Temperature[], city: City) => {
    return temperatures
        .reduce((acc, temp) => {
            if (temp.city_id == city.id && temp.temp > acc) {
                return temp.temp;
            }
            return acc;
        }, 0)
};

export default getCityMax;