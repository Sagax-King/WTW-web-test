import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
    fetchGraphAsync,
    selectGraph,
    graphLoading
} from './graphSlice';
import {
    selectedCountry
} from '../CountriesSelector/selectorSlice';
import './TemperatureGraph.css';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Temperature in °C',
        },
    },
};

const TemperatureGraph = () => {
    const graph = useAppSelector(selectGraph);
    const country = useAppSelector(selectedCountry);
    const loading = useAppSelector(graphLoading);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchGraphAsync(country))
    }, [dispatch, country]);

    return (
        <div className="graph-container">
            <h2>Summary Timeline</h2>
            {loading ? <div>Loading Graph...</div> : <>
                {
                    graph !== null ?
                        <Line
                            options={options}
                            data={{
                                labels: graph.min.map(min => min.date),
                                datasets: [
                                    {
                                        label: 'Max',
                                        data: graph.max.map(max => max.temp),
                                        borderColor: 'rgb(255, 99, 132)',
                                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                                    },
                                    {
                                        label: 'Average',
                                        data: graph.average.map(average => average.temp),
                                        borderColor: 'rgb(124,252,0)',
                                        backgroundColor: 'rgba(124, 252, 0, 0.5)',
                                    },
                                    {
                                        label: 'Min',
                                        data: graph.min.map(min => min.temp),
                                        borderColor: 'rgb(53, 162, 235)',
                                        backgroundColor: 'rgba(53, 162, 235, 0.5)',
                                    },
                                ],
                            }}
                        /> :
                        <div>No data to display</div>
                }
            </>}
        </div>
    );
}

export default TemperatureGraph;