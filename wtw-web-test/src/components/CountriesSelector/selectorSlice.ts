import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { fetchCountries } from './selectorAPI';
import { Country } from 'country-code-lookup';

export interface SelectorState {
    countries: Country[];
    loading: boolean;
    error: null | string;
    selectedCountry: string;
}

const initialState: SelectorState = {
    countries: [],
    loading: false,
    error: null,
    selectedCountry: ""
};

export const fetchCountriesAsync = createAsyncThunk(
    'selector/fetchCountries',
    async () => {
        const response = await fetchCountries();
        return response;
    }
);

export const selectorSlice = createSlice({
    name: 'selector',
    initialState,
    reducers: {
        selectCountry: (state, action: PayloadAction<string>) => {
            state.selectedCountry = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCountriesAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCountriesAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.countries = action.payload;
            })
            .addCase(fetchCountriesAsync.rejected, (state) => {
                state.loading = false;
                state.error = "Failed to get countries";
            });
    },
});

export const { selectCountry } = selectorSlice.actions;

export const selectCountries = (state: RootState) => state.selector.countries;
export const countriesLoading = (state: RootState) => state.selector.loading;
export const selectedCountry = (state: RootState) => state.selector.selectedCountry;

export default selectorSlice.reducer;
