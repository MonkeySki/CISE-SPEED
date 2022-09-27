import React from "react";
import { render, screen, fireEvent } from "@testing-library/react"; // (or /dom, /vue, ...)
import ReactDOM from "react-dom/client";
import { act } from "react-dom/test-utils";
import Create from "./components/create";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import ArticleList from "./components/articleList";
// setup file

// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<App />, div);
//   ReactDOM.unmountComponentAtNode(div);
// });

describe("Addition", () => {
  it("knows that 2 and 2 make 4", () => {
    expect(2 + 2).toBe(4);
  });
});

describe("Testing Create.js", () => {
  it("form labels exsist", () => {
    render(
      <Router>
        <Create />
      </Router>
    );

    expect(screen.getByLabelText(/Title/)).toBeTruthy();
    expect(screen.getByLabelText(/Author/)).toBeTruthy();
    expect(screen.getByLabelText(/Journal Name/)).toBeTruthy();
    expect(screen.getByLabelText(/Volume Number/)).toBeTruthy();
    expect(screen.getByLabelText(/Pages/)).toBeTruthy();
    expect(screen.getByLabelText(/DOI/)).toBeTruthy();
  });

  it("Form submisiton", () => {
    render(
      <Router>
        <Create />
      </Router>
    );

    expect(screen.getByLabelText(/Title/)).toBeTruthy();
    expect(screen.getByLabelText(/Author/)).toBeTruthy();
    expect(screen.getByLabelText(/Journal Name/)).toBeTruthy();
    expect(screen.getByLabelText(/Volume Number/)).toBeTruthy();
    expect(screen.getByLabelText(/Pages/)).toBeTruthy();
    expect(screen.getByLabelText(/DOI/)).toBeTruthy();
  });
});

let container;

//Set up div then append it as a child?
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

//remove the div
afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

it("can render and update form", () => {
  act(() => {
    ReactDOM.createRoot(container).render(
      <Router>
        <ArticleList />
      </Router>
    );
  });

  const form = container.querySelector("h3");
  // console.log(form)
  // fireEvent.change(container.getByText('Submit an Article'),{target: {value:'new text'}})
  // console.log(form)

  //Type in a form
  act(() => {
    form.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
});

it("create alternative", () => {
  const utils = render(
    <Router>
      <Create />
    </Router>
  );

  const input = utils.getByLabelText('Title')
  console.log("input:",input.value)
  fireEvent.change(input, {target: {value: '23'}})
  console.log("input:",input.value)
  
});
