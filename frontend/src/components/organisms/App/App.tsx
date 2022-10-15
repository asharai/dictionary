import { Header } from '../../molecules/';
import './App.css';

import { MainPage, DictionaryPage } from '../../pages/';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/dictionary" element={<DictionaryPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
