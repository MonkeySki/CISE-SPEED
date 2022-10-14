import React from "react";
import { render, screen } from "@testing-library/react"; // (or /dom, /vue, ...)

import App from "./App"

describe("Testing App.js", () => {

  it("Main screen is rendered",()=>{
  
  
  render(<App/>);
  const submission = screen.getByRole("heading",{name:"Article List"});
  expect(submission).toBeInTheDocument();
  });
})