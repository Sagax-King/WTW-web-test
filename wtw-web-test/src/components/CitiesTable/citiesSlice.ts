import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { fetchCities } from './citiesAPI';
import { City } from '../../schemas/City';

export interface SelectorState {
    cities: City[];
    loading: boolean;
    error: null | string;
}

const initialState: SelectorState = {
    cities: [],
    loading: false,
    error: null
};

export const fetchCitiesAsync = createAsyncThunk(
    'cities/fetchCities',
    async (selectedCountry: string) => {
        const response = await fetchCities(selectedCountry);
        return response;
    }
);

export const citiesSlice = createSlice({
    name: 'cities',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCitiesAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCitiesAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.cities = action.payload;
            })
            .addCase(fetchCitiesAsync.rejected, (state) => {
                state.loading = false;
                state.error = "Failed to get cities";
            });
    },
});

export const selectCities = (state: RootState) => state.cities.cities;
export const citiesLoading = (state: RootState) => state.cities.loading;

export default citiesSlice.reducer;
