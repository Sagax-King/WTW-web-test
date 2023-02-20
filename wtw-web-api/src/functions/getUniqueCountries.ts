import { City } from '../schemas/city';
import { Country, byIso } from 'country-code-lookup';

const getUniqueCountries = (cities: City[]) => {
    return cities.reduce((acc, curr) => {
        const found = acc.find(el => el.internet === curr.country);
        if (!found) {
            const res = byIso(curr.country);
            if (res !== null) {
                return acc.concat([res]);
            } else {
                console.log('cant find code ' + curr.country);
            }
        }
        return acc
    }, [] as Country[])
};

export default getUniqueCountries;