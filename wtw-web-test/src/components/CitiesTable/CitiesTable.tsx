import { useEffect } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
    fetchCitiesAsync,
    selectCities,
    citiesLoading
} from './citiesSlice';
import {
    selectedCountry
} from '../CountriesSelector/selectorSlice';
import './CitiesTable.css';

const CitiesTable = () => {
    const cities = useAppSelector(selectCities);
    const country = useAppSelector(selectedCountry);
    const loading = useAppSelector(citiesLoading);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchCitiesAsync(country))
    }, [dispatch, country]);

    return (
        <div className="cities-container">
            <h2>City Overview</h2>
            {
                loading ? <div>Loading Cities...</div> : <>
                    {
                        cities.length === 0 ? <div>No data to display</div> : <table className="cities-table">
                            <thead>
                                <tr className="heading-row">
                                    <th className="table-heading">City</th>
                                    <th className="table-heading">Population (Millions)</th>
                                    <th className="table-heading">Max</th>
                                </tr>
                            </thead>

                            <tbody>
                                {cities.map(city => <tr key={city.id}>
                                    <td className="table-cell">
                                        {city.name}
                                    </td>
                                    <td className="table-cell">
                                        {city.population}
                                    </td>
                                    <td className="table-cell">
                                        {city.max.toFixed(1)}°C
                                    </td>
                                </tr>)}
                            </tbody>
                        </table>
                    }
                </>
            }

        </div>
    );
}

export default CitiesTable;