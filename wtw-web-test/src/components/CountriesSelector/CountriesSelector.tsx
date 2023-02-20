import { useEffect } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
    fetchCountriesAsync,
    selectCountries,
    countriesLoading,
    selectedCountry,
    selectCountry
} from './selectorSlice';
import './CountriesSelector.css';

const CountriesSelector = () => {
    const countries = useAppSelector(selectCountries);
    const loading = useAppSelector(countriesLoading);
    const selected = useAppSelector(selectedCountry);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchCountriesAsync())
    }, [dispatch]);

    return (
        <div className="countries-selector">
            {
                loading ? <div>Loading...</div> : <>
                    <label className="countries-label">Countries</label>
                    <select
                        name="countries"
                        id="countries"
                        data-testid="countries-select"
                        value={selected}
                        onChange={e => dispatch(selectCountry(e.target.value))}
                    >
                        <option value="" disabled>Select a country</option>
                        {countries.map(country => <option data-testid="countries-option" value={country.iso2} key={country.fips}>{country.country}</option>)}
                    </select>
                </>
            }
        </div>
    );
}

export default CountriesSelector;