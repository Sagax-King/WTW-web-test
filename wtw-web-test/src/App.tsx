import './App.css';
import CountriesSelector from './components/CountriesSelector/CountriesSelector';
import CitiesTable from './components/CitiesTable/CitiesTable';
import TemperatureGraph from './components/TemperatureGraph/TemperatureGraph';

function App() {
  return (
    <div className="App">
      <CountriesSelector />
      <div className="app-grid">
        <TemperatureGraph />
        <CitiesTable />
      </div>
    </div>
  );
}

export default App;
