import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import type { PreloadedState } from '@reduxjs/toolkit'
import selectorReducer from '../components/CountriesSelector/selectorSlice';
import citiesReducer from '../components/CitiesTable/citiesSlice';
import graphReducer from '../components/TemperatureGraph/graphSlice';

const rootReducer = combineReducers({
  selector: selectorReducer,
  cities: citiesReducer,
  graph: graphReducer
})

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
