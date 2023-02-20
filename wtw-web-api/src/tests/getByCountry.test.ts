import getByCountry from '../functions/getByCountry';

const cities = [
    {
        id: "1",
        name: "Test City",
        country: "TC",
        population: 0
    },
    {
        id: "2",
        name: "Test City",
        country: "TC",
        population: 1
    },
    {
        id: "3",
        name: "Test City",
        country: "TC",
        population: 2
    },
    {
        id: "4",
        name: "Test City",
        country: "TC",
        population: 3
    },
    {
        id: "5",
        name: "Test City",
        country: "TC",
        population: 4
    },
    {
        id: "6",
        name: "Test City",
        country: "TC",
        population: 5
    }
]

const temperatures = [
    {
        city_id: "1",
        date: "2022-03-12",
        temp: 10
    },
    {
        city_id: "2",
        date: "2022-03-12",
        temp: 10
    },
    {
        city_id: "3",
        date: "2022-03-12",
        temp: 10
    },
    {
        city_id: "4",
        date: "2022-03-12",
        temp: 10
    },
    {
        city_id: "5",
        date: "2022-03-12",
        temp: 10
    },
    {
        city_id: "6",
        date: "2022-03-12",
        temp: 0
    },
    {
        city_id: "6",
        date: "2022-03-12",
        temp: 10
    },
    {
        city_id: "6",
        date: "2022-03-12",
        temp: 20
    }
]

test('Correctly maps the data', () => {
    const citiesRes = getByCountry(cities, "TC", temperatures)

    // Needs to only bring back 5
    expect(citiesRes.length).toEqual(5)

    // Needs to be top 5 populations
    expect(citiesRes.find(city => city.id === "0")).toBe(undefined)
    expect(citiesRes.find(city => city.id === "1")).toBe(undefined)

    // Needs to grab the maximum temperature for a city
    expect(citiesRes.find(city => city.id === "6")).toHaveProperty("max", 20)
});

test('Returns no data for a country code not in the data', () => {
    const citiesRes = getByCountry(cities, "NONEXISTENT", temperatures)

    expect(citiesRes.length).toEqual(0)
});