import logo from "./logo.svg";
import "./App.css";
import ViewAll from "./components/ViewAll";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ViewAll/>
        <img src={logo} className="App-logo" alt="logo" />
        <p>Brecon is testing things!</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React a
        </a>
      </header>
    </div>
  );
}

export default App;
