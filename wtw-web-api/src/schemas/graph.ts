import { Temperature } from "./temperature";

export interface TemperatureCityless {
    date: string;
    temp: number;
    total: number;
    numberReadings: number;
}

export interface Graph {
    max: Temperature[];
    average: TemperatureCityless[];
    min: Temperature[];
}