import axios from "axios";
import { useState } from "react";
export default function View() {
  const [post, SetPost] = useState("");

  function Send() {
    var name ="John Doe"
    axios.post("http://localhost:8080/testPost", name);
    console.log("we end up in here");
  }
  function hell0()
  {
    console.log("HELLOO")
  }

  return (
    <div>
     <button onClick={hell0}>Console Greeting</button>
      <button onClick={Send}>Send Post to database</button>
    </div>
  );
}
