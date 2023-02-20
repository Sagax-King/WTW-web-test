import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { screen, fireEvent } from '@testing-library/react';
import { renderWithProviders } from '../../utils/test-utils';
import CountriesSelector from './CountriesSelector';

export const handlers = [
    rest.get('http://localhost:6060/city/countries', (req, res, ctx) => {
        return res(ctx.json({
            message: [{
                "continent": "Test",
                "region": "Test",
                "country": "Test country",
                "capital": "Test",
                "fips": "TST",
                "iso2": "TST",
                "iso3": "TST",
                "isoNo": "TST",
                "internet": "TST"
            },
            {
                "continent": "NA",
                "region": "NA",
                "country": "NA",
                "capital": "NA",
                "fips": "NA",
                "iso2": "NA",
                "iso3": "NA",
                "isoNo": "NA",
                "internet": "NA"
            }]
        }), ctx.delay(150))
    })
]

const server = setupServer(...handlers)

beforeAll(() => server.listen())

afterEach(() => server.resetHandlers())

afterAll(() => server.close())

test('Selecting a country', async () => {
    const { getByTestId, getAllByTestId } = renderWithProviders(<CountriesSelector />)

    // Then should initially be fetching the data
    expect(screen.queryByText("Loading...")).toBeInTheDocument();

    // Then should get the data but no country should be selected
    expect(await screen.findByText("Select a country")).toBeInTheDocument();

    // Selecting an option should select a country
    fireEvent.change(getByTestId("countries-select"), { target: { value: 'TST' } })
    let options = getAllByTestId("countries-option") as HTMLOptionElement[]
    expect(options[0].value).toBe("TST")
    expect(options[0].selected).toBeTruthy();
    expect(options[1].selected).toBeFalsy();

    // Country should be displayed
    expect(screen.queryByText("Test country")).toBeInTheDocument();
})

test('Selected country should be displayed', async () => {
    const initialSelector = {
        countries: [],
        loading: false,
        error: null,
        selectedCountry: "TST"
    };

    const { getAllByTestId } = renderWithProviders(<CountriesSelector />, {
        preloadedState: {
            selector: initialSelector
        }
    })

    // Country should be displayed and value selected
    expect(await screen.findByText("Test country")).toBeInTheDocument();

    let options = getAllByTestId("countries-option") as HTMLOptionElement[]
    expect(options[0].value).toBe("TST")
    expect(options[0].selected).toBeTruthy();
    expect(options[1].selected).toBeFalsy();
})
