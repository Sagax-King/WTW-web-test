import { City } from '../schemas/city';
import { Temperature } from '../schemas/temperature';
import getCityMax from './getCityMax';

const getByCountry = (cities: City[], code: string, temperatures: Temperature[]) => {
    return cities
        .filter(city => {
            return city.country === code;
        })
        .sort((a, b) => b.population - a.population)
        .slice(0, 5)
        .map(city => ({ ...city, max: getCityMax(temperatures, city) }))
};

export default getByCountry;