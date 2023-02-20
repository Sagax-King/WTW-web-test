import { City } from '../schemas/city';
import { Temperature } from '../schemas/temperature';
import { Graph } from '../schemas/graph';

const getCountryGraph = (temperatures: Temperature[], cities: City[]) => {
    return temperatures
        .filter(temp => cities.find(city => city.id === temp.city_id))
        .sort((a, b) => {
            return new Date(a.date).getTime() - new Date(b.date).getTime();
        })
        .reduce((acc, temp) => {
            return {
                max: getNewMax(acc, temp),
                average: getNewAverage(acc, temp),
                min: getNewMin(acc, temp)
            }
        }, {
            max: [],
            average: [],
            min: []
        } as Graph)
};

const getNewMax = (acc: Graph, temp: Temperature) => {
    if (acc.max.length === 0) {
        return [temp];
    } else {
        const lastMax = acc.max[acc.max.length - 1];
        if (lastMax.date === temp.date) {
            if (lastMax.temp < temp.temp) {
                acc.max[acc.max.length - 1] = temp;
            }
        } else {
            return acc.max.concat([temp]);
        }
    }
    return acc.max;
};

const getNewAverage = (acc: Graph, temp: Temperature) => {
    if (acc.average.length === 0) {
        return [{
            date: temp.date,
            temp: temp.temp,
            total: temp.temp,
            numberReadings: 1
        }];
    } else {
        const lastAverage = acc.average[acc.average.length - 1];
        if (lastAverage.date === temp.date) {
            acc.average[acc.average.length - 1] = {
                date: temp.date,
                temp: (lastAverage.total + temp.temp) / (lastAverage.numberReadings + 1),
                total: lastAverage.total + temp.temp,
                numberReadings: lastAverage.numberReadings + 1
            }
        } else {
            return acc.average.concat([{
                date: temp.date,
                temp: temp.temp,
                total: temp.temp,
                numberReadings: 1
            }]);
        }
    }
    return acc.average;
}
const getNewMin = (acc: Graph, temp: Temperature) => {
    if (acc.min.length === 0) {
        return [temp];
    } else {
        const lastMin = acc.min[acc.min.length - 1];
        if (lastMin.date === temp.date) {
            if (lastMin.temp > temp.temp) {
                acc.min[acc.min.length - 1] = temp;
            }
        } else {
            return acc.min.concat([temp]);
        }
    }
    return acc.min;
}

export default getCountryGraph;