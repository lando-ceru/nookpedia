import './App.css';
import Critterpedia from './components/Critterpedia.js';

function App() {
  return (
    <div className="App">
      <header className="App-header mx-auto">
        <img src="https://www.animal-crossing.com/new-horizons/assets/img/global/logos/logo-acnh-en.png" alt="logo" width="15%" className="mb-5" />
        <Critterpedia />
      </header>
    </div>
  );
}

export default App;
