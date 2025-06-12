import { useEffect, useState } from 'react';
import axios from 'axios';
import AmountInput from './components/AmountInput';
import CurrencySelector from './components/CurrencySelector';
import ConvertButton from './components/ConvertButton';
import ResultDisplay from './components/ResultDisplay';
import HistoryList from './components/HistoryList';
import ExchangeGraphCanvas from './components/ExchangeGraphCanvas';

import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from './redux/store';
import { setAmount, setFromCurrency, setToCurrency, addToHistory } from './redux/slices/currencySlice';
import SwapIcon from './components/SwapIcon';

type CountryCurrency = {
  code: string;
  name: string;
}

type DataPoint = {
  x: Date;
  y: number;
}

const config = {
  headers: {
    Authorization: `Token ${import.meta.env.VITE_CURRENCY_API_KEY}`,
  }
};

const App = () => {
  const dispatch = useDispatch();
  const { fromCurrency, toCurrency, amount, history } = useSelector((state: RootState) => state.counter);

  const [currencies, setCurrencies] = useState<CountryCurrency[]>([]);
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [dataPoints, setDataPoints] = useState<DataPoint[]>([]);
  const [isGraphLoading, setIsGraphLoading] = useState(true);

  const convertCurrency = async () => {
    setIsLoading(true);
    if (!fromCurrency || !toCurrency || amount <= 0) {
      setResult('Please enter valid amount and select both currencies.');
      setIsLoading(false);
      return;
    } else if (fromCurrency === toCurrency) {
      setResult(`No conversion needed: ${amount} ${fromCurrency} is equal to ${amount} ${toCurrency}.`);
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.get(`${import.meta.env.VITE_CURRENCY_BASE_URL}/latest.json?symbols=${fromCurrency}%2C${toCurrency}`, config);

      if (response.status === 200) {
        const rates = response.data.rates;
        if (!rates[fromCurrency] || !rates[toCurrency]) {
          setResult('Currency not supported.');
          setIsLoading(false);
          return;
        }

        const someAmount = amount / rates[fromCurrency];
        const converted = (someAmount * rates[toCurrency]).toFixed(2);
        const conversionResult = `${amount} ${fromCurrency} = ${converted} ${toCurrency}`;

        setResult(conversionResult);
        dispatch(addToHistory(conversionResult));

        await fetchHistoricalData();
      } else {
        setResult('Failed');
        setIsLoading(false);
        return;
      }
    } catch (error) {
      console.error('Conversion error:', error);
      setResult('Conversion failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchHistoricalData = async () => {
    setIsGraphLoading(true);
    const days = 30;
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - days);

    const dateList: string[] = [];
    const step = Math.max(1, Math.floor(days / 30));

    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + step)) {
      dateList.push(d.toISOString().split("T")[0]);
    }

    try {
      const response = await Promise.all(
        dateList.map((date) =>
          axios.get(`${import.meta.env.VITE_CURRENCY_BASE_URL}/historical/${date}.json?symbols=${fromCurrency},${toCurrency}`, config)
        )
      );

      const points: DataPoint[] = response.map((res, i) => {
        const date = new Date(dateList[i]);
        const baseRate = res.data.rates[fromCurrency];
        const targetRate = res.data.rates[toCurrency];
        const value = targetRate / baseRate;
        return { x: date, y: parseFloat(value.toFixed(4)) };
      });

      setDataPoints(points);
    } catch (error) {
      console.error("Error fetching historical data:", error);
      setDataPoints([]);
    } finally {
      setIsGraphLoading(false);
    }
  };

  useEffect(() => {
    async function fetchCountryCurrencies() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_CURRENCY_BASE_URL}/currencies.json`, config);

        if (response.status === 200) {
          const data = response.data;

          if (!data || typeof data != 'object') {
            setCurrencies([]);
            return;
          }

          const currenciesArray = Object.entries(data)
            .filter(([code, name]) => code && name)
            .map(([code, name]) => ({
              code,
              name: String(name),
            }));

          currenciesArray.sort((a, b) => a.code.localeCompare(b.code));

          setCurrencies(currenciesArray);
        } else {
          setCurrencies([]);
          return;
        }
      } catch (error) {
        console.error('Error fetching country currencies:', error);
        setCurrencies([]);
      }
    };

    fetchCountryCurrencies();
  }, []);

  const handleSwap = () => {
    dispatch(setFromCurrency(toCurrency));
    dispatch(setToCurrency(fromCurrency));
  };

  return (
    <div className="converter">
      <h1 className="text-center mb-4">Currency Converter</h1>
      <AmountInput amount={amount} setAmount={(val) => dispatch(setAmount(val))} />

      <div className="row mb-3 align-items-center">
        <CurrencySelector
          id="From"
          onChange={(val) => dispatch(setFromCurrency(val))}
          currencies={currencies}
          value={fromCurrency} />
        <SwapIcon onSwap={handleSwap} />
        <CurrencySelector
          id="To"
          onChange={(val) => dispatch(setToCurrency(val))}
          currencies={currencies}
          value={toCurrency} />
      </div>

      <ConvertButton onClick={convertCurrency} isLoading={isLoading} />
      
      {result &&
        <ResultDisplay result={result} />}

      {history.length > 0 && (
        <HistoryList history={history} />
      )}

      {!isGraphLoading &&
        <ExchangeGraphCanvas
          dataPoints={dataPoints}
          base={fromCurrency}
          target={toCurrency}
        />}
    </div>
  )
}

export default App
