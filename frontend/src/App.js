import React from "react";
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";

// We import all the components we need in our app
import Navbar from "./components/navbar";
import RecordList from "./components/articleList";
import Edit from "./components/edit";
import Create from "./components/create";
import ModeratorList from "./components/moderatorList";
import AnalystList from "./components/analystList";
import { BrowserRouter } from "react-router-dom";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<RecordList />} />
          <Route path="/create" element={<Create />} />
          <Route path="/moderator" element={<ModeratorList />} />
          <Route path="/analyst" element={<AnalystList />} />
          <Route path="/edit" element={<Edit />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;