import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import store from './redux/store.ts';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>
)
