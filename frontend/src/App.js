import logo from "./logo.svg";
import "./App.css";

//Storing values
import { useEffect, useState } from "react";
//testing axios request and response
import axios from "axios";
import View from "./components/View";
import ViewAll from "./components/ViewAll";


function App() {
  const [test, setTest] = useState("");

  useEffect(()=>{
    setTest("Test")
  },[])

  axios.get("http://localhost:8080/article/test").then((res) => {
    console.log("seting test")
    setTest(res.data);
  });

   return (

    <div className="App">
      <header className="App-header">
        <ViewAll></ViewAll>
        <View></View>
        <img src={logo} className="App-logo" alt="logo" />
        <p>Brecon is testing things</p>
        <h1>Testing a route</h1>
        <h3>
          /test route produces:
          <p>{test}</p>
        </h3>
        <button >Send a post</button>
      </header>
    </div>
  );
}

export default App;
