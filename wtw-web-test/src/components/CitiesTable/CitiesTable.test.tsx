import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../utils/test-utils';
import CitiesTable from './CitiesTable';

export const handlers = [
    rest.get('http://localhost:6060/city/cities/', (req, res, ctx) => {
        return res(ctx.json({ message: [] }), ctx.delay(150))
    }),
    rest.get('http://localhost:6060/city/cities/TEST', (req, res, ctx) => {
        return res(ctx.json({ message: [{ id: "1", name: "Test city", country: "test country", population: 1000, max: 123 }] }), ctx.delay(150))
    })
]

const server = setupServer(...handlers)

beforeAll(() => server.listen())

afterEach(() => server.resetHandlers())

afterAll(() => server.close())

test('No city data', async () => {
    renderWithProviders(<CitiesTable />)

    // Should initially try get cities
    expect(screen.queryByText("Loading Cities...")).toBeInTheDocument();

    // Then should return no data for the blank query
    expect(await screen.findByText("No data to display")).toBeInTheDocument();
})

test('City data', async () => {
    const initialSelector = {
        countries: [],
        loading: false,
        error: null,
        selectedCountry: "TEST"
    };

    renderWithProviders(<CitiesTable />, {
        preloadedState: {
            selector: initialSelector
        }
    })

    // Should initially try get cities
    expect(screen.queryByText("Loading Cities...")).toBeInTheDocument();

    // Then should return data for query
    expect(await screen.findByText("Test city")).toBeInTheDocument();
    expect(await screen.findByText("1000")).toBeInTheDocument();
    expect(await screen.findByText("123.0°C")).toBeInTheDocument();
})