import { Request, Response, NextFunction } from 'express';
import getCitiesInCountry from '../functions/getCitiesInCountry';
import getCountryGraph from '../functions/getCountryGraph';
import getCityData from '../data/getCityData';
import getTemperatureData from '../data/getTemperatureData';

/* 
    GET request returns max temperatures for a country
*/
const getGraph = async (req: Request, res: Response, next: NextFunction) => {
    let code: string = req.params.code;

    getCityData()
        .then(result => {
            getTemperatureData()
                .then(temperatures => {
                    const cities = getCitiesInCountry(result, code);

                    return res.status(200).json({
                        message: getCountryGraph(temperatures, cities)
                    });
                })
                .catch(error => {
                    return res.status(500).json({
                        message: error
                    });
                })
        })
        .catch(error => {
            return res.status(500).json({
                message: error
            });
        })
};

export default { getGraph };