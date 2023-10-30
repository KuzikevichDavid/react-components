import { Component, ReactNode } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './routes/Home';
import NotFound from './routes/NotFound';

class App extends Component {
  render(): ReactNode {
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    );
  }
}

export default App;
