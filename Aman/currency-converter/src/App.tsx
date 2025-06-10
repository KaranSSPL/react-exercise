import { useEffect, useState } from 'react';
import axios from 'axios';
import AmountInput from './components/AmountInput';
import CurrencySelector from './components/CurrencySelector';
import ConvertButton from './components/ConvertButton';
import ResultDisplay from './components/ResultDisplay';
import HistoryList from './components/HistoryList';

import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from './redux/store';
import { setAmount, setFromCurrency, setToCurrency, addToHistory } from './redux/slices/currencySlice';

type CountryCurrency = {
  code: string;
  name: string;
}

const App = () => {
  const dispatch = useDispatch();
  const { fromCurrency, toCurrency, amount, history } = useSelector((state: RootState) => state.counter);

  const [currencies, setCurrencies] = useState<CountryCurrency[]>([]);
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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
      const response = await axios.get("https://api.frankfurter.app/latest", {
        params: {
          from: fromCurrency,
          to: toCurrency
        }
      });

      const rate = response.data.rates[toCurrency];
      const converted = (amount * rate).toFixed(2);
      const conversionResult = `${amount} ${fromCurrency} = ${converted} ${toCurrency}`;

      setResult(conversionResult);
      dispatch(addToHistory(conversionResult));
    } catch (error) {
      console.error('Conversion error:', error);
      setResult('Conversion failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    async function fetchCountryCurrencies() {
      try {
        const response = await axios.get('https://api.frankfurter.app/currencies');
        const data = response.data;

        const currenciesArray = Object.entries(data).map(([code, name]) => ({
          code,
          name: String(name),
        }));

        currenciesArray.sort((a, b) => a.code.localeCompare(b.code));

        setCurrencies(currenciesArray);
      } catch (error) {
        console.error('Error fetching country currencies:', error);
      }
    };

    fetchCountryCurrencies();
  }, []);

  return (
    <div className="converter">
      <h3 className="text-center mb-4">Currency Converter</h3>
      <AmountInput amount={amount} setAmount={(val) => dispatch(setAmount(val))} />

      <div className="row mb-3">
        <CurrencySelector id="From" onChange={(val) => dispatch(setFromCurrency(val))} value="INR" currencies={currencies} />
        <CurrencySelector id="To" onChange={(val) => dispatch(setToCurrency(val))} value="USD" currencies={currencies} />
      </div>

      <ConvertButton onClick={convertCurrency} isLoading={isLoading} />
      <ResultDisplay result={result} />

      {history.length > 0 && (
        <HistoryList history={history} />
      )}
    </div>
  )
}

export default App
