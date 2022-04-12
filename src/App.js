import { Route, Routes } from 'react-router-dom';
import './App.css';
import Services from './Pages/Home/Services/Services';

function App() {
  return (
    <div>
      <h1>My Site</h1>
      <Routes>
        <Route path='/' element={<Services></Services>}></Route>
      </Routes>
    </div>
  );
}

export default App;
