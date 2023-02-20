import * as path from 'path';
import * as fs from 'fs';
import { Temperature } from '../schemas/temperature';
import { parse } from 'csv-parse';

const temperaturesPath = path.resolve(__dirname, 'temperatures.csv');
const temperatureHeaders = ['city_id', 'date', 'temp'];

const getTemperatureData = async () => {
    const fileContent = fs.readFileSync(temperaturesPath, { encoding: 'utf-8' });

    return new Promise<Temperature[]>((resolve, reject) => {
        parse(fileContent, {
            delimiter: ',',
            columns: temperatureHeaders,
            fromLine: 2,
            cast: (columnValue, context) => {
                if (context.column === 'temp') {
                    return parseFloat(columnValue);
                }
                return columnValue;
            }
        }, (error, result: Temperature[]) => {
            if (error) {
                reject(error);
            }
            resolve(result);
        });
    });
}

export default getTemperatureData;


