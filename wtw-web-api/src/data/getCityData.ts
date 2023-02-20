import * as path from 'path';
import * as fs from 'fs';
import { City } from '../schemas/city';
import { parse } from 'csv-parse';

const citiesPath = path.resolve(__dirname, 'cities.csv');
const cityHeaders = ['id', 'name', 'country', 'population'];

const getCityData = async () => {
    const fileContent = fs.readFileSync(citiesPath, { encoding: 'utf-8' });

    return new Promise<City[]>((resolve, reject) => {
        parse(fileContent, {
            delimiter: ',',
            columns: cityHeaders,
            fromLine: 2,
            cast: (columnValue, context) => {
                if (context.column === 'population') {
                    return parseFloat(columnValue);
                }
                return columnValue;
            }
        }, (error, result: City[]) => {
            if (error) {
                reject(error);
            }
            resolve(result);
        });
    });
}

export default getCityData;


