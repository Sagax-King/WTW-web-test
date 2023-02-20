import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { fetchGraph } from './graphAPI';
import { Graph } from '../../schemas/Graph';

export interface SelectorState {
    graph: Graph | null;
    loading: boolean;
    error: null | string;
}

const initialState: SelectorState = {
    graph: null,
    loading: false,
    error: null
};

export const fetchGraphAsync = createAsyncThunk(
    'graph/fetchGraph',
    async (selectedCountry: string) => {
        const response = await fetchGraph(selectedCountry);
        return response;
    }
);

export const graphSlice = createSlice({
    name: 'graph',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchGraphAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchGraphAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.graph = action.payload;
            })
            .addCase(fetchGraphAsync.rejected, (state) => {
                state.loading = false;
                state.error = "Failed to get graph";
            });
    },
});

export const selectGraph = (state: RootState) => state.graph.graph;
export const graphLoading = (state: RootState) => state.graph.loading;

export default graphSlice.reducer;
