import { Request, Response, NextFunction } from 'express';
import getUniqueCountries from '../functions/getUniqueCountries';
import getByCountry from '../functions/getByCountry';
import getCityData from '../data/getCityData';
import getTemperatureData from '../data/getTemperatureData';

/* 
    GET request, returns all unique countries in the countries csv and fetches the
    corresponding country name for the country code
*/
const getCountries = async (_req: Request, res: Response, _next: NextFunction) => {
    getCityData()
        .then(result => {
            return res.status(200).json({
                message: getUniqueCountries(result)
            });
        })
        .catch(error => {
            return res.status(500).json({
                message: error
            });
        })
};

/* 
    GET request, returns all cities for a given country code
*/
const getCitiesForCountry = async (req: Request, res: Response, _next: NextFunction) => {
    let code: string = req.params.code;
    getCityData()
        .then(result => {
            getTemperatureData()
                .then(temps => {
                    return res.status(200).json({
                        message: getByCountry(result, code, temps)
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

export default { getCountries, getCitiesForCountry };