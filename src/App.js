import './App.css';
import Gallery from './Components/Gallery';
import ScrollUp from './Components/Scrollup';

function App() {
  return (
    <div className="App">
      <header>
        <div className="header-container">
          <h1>Ma Galerie Photo</h1>
          <h2>THOMAS TENOT</h2>
        </div>
      </header>
      <main>
        <Gallery/>
        <ScrollUp/>
      </main>
    </div>
  );
}

export default App;
