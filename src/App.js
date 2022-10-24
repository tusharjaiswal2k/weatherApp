import { useEffect, useState } from 'react';
import './App.css';
import Forecast from './components/Forecast';
import Inputs from './components/Inputs';
import TempratureAndDetails from './components/TempratureAndDetails';
import TimeAndLocation from './components/TimeAndLocation';
import TopButtons from './components/TopButtons';
import getFormattedWeatherData from './service/weatherService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {

  const [query, setQuery] = useState({ q: 'jaipur' });
  const [units, setUnits] = useState('metric');
  const [weather, setWeather] = useState(null)

  const fetchWeather = () => {
    const message = query.q ? query.q : 'current location.';

    toast.info('Fetching weather for ' + message)
    getFormattedWeatherData({ ...query, units }).then(
      (data) => {
        toast.success(`Successfully fetched weather for ${data?.name},${data.country}.`)
        setWeather(data)
      });

  }

  useEffect(() => {
    fetchWeather();
  }, [query, units])

  const formatBackground = () => {
    if (!weather) {
      return 'from-cyan-700 to to-blue-700'
    }
    const threshold = units === 'metric' ? 20 : 60

    if (weather?.temp <= threshold) {
      return "from-cyan-700 to to-blue-700"
    }

    return 'from-yellow-700 to-orange-700'
  }

  return (
    <div className={`mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br h-fit shadow-xl shadow-gray-400 ${formatBackground()}`}>
      <TopButtons setQuery={setQuery} />
      <Inputs setQuery={setQuery} setUnits={setUnits} units={units} />

      {weather && (
        <div>
          <TimeAndLocation weather={weather} />
          <TempratureAndDetails weather={weather} />

          <Forecast title="hourly forecast" items={weather?.hourly} />
          <Forecast title="daily forecast" items={weather?.daily} />
        </div>
      )}

      <ToastContainer autoClose={5000} theme='colored' newestOnTop={true} />

    </div>
  );
}

export default App;
