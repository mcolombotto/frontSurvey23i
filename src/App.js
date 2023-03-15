import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';
import Navigation from './components/layout/Navigation';
import Home from './components/views/home'

function App() {
  return (
    <Router>
      <Navigation/>
      <main>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          
        </Routes>
      </main>
    </Router>
  );
}

export default App;
