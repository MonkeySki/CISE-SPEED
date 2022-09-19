import logo from "./logo.svg";
import "./App.css";
import ViewAll from "./components/ViewAll";
//Storing values
import { useState } from "react";
//testing axios request and response
import axios from 'axios';

function App() {
  const [test,setTest]= useState("");


 
  axios.get('http://localhost:8080/testArticle')
  .then((res) => {
    console.log("__")
    console.log(res.data)
    console.log("__")
    setTest(res.data)
  }
  )

  return (
    <div className="App">
      <header className="App-header">
        <ViewAll/>
        <img src={logo} className="App-logo" alt="logo" />
        <p>Brecon is testing things</p>
        <h1>Testing a route</h1>
        <h3>/test route produces:
        <p>{test}</p>
        </h3>
  
      </header>
    </div>
  );
}

export default App;
