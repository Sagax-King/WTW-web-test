import { City } from '../schemas/city';

const getCitiesInCountry = (cities: City[], code: string) => {
    return cities
        .filter(city => {
            return city.country === code;
        })
};

export default getCitiesInCountry;