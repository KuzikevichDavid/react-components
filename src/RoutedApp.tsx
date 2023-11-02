import { HashRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './routes/Home';
import NotFound from './routes/NotFound';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function RoutedApp() {
  return (
    <HashRouter>
      <App />
    </HashRouter>
  );
}

export default RoutedApp;
