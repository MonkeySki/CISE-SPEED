import logo from "./logo.svg";
import "./App.css";

//Storing values
import { useState, useEffect } from "react";
//testing axios request and response
import axios from "axios";
import View from "./components/View";


function App() {
  const [test, setTest] = useState("");
  const [post, setPost] = useState("");

  const config = {
    header: {
        "Content-Type": "application/json",
    },
  };

  useEffect(() => {
    setPost({ word: "Test" });
    }, [])

  axios.get("http://localhost:8080/testArticle").then((res) => {
    //Sets up the test path data
    setTest(res.data);
  });

  // var word ={dragon:"a"}
  // axios.post("http://localhost:8080/testPost", word, config)
  return (
    <div className="App">
      <header className="App-header">
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
