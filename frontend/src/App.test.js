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

  it("Create text fields work", () => {
    const utils = render(
      <Router>
        <Create />
      </Router>
    );
  
    const title = utils.getByLabelText('Title')
    fireEvent.change(title, {target: {value: 'Rose'}})
    expect(title.value).toBe('Rose')

    const author = utils.getByLabelText('Author')
    fireEvent.change(author, {target: {value: 'Rose'}})
    expect(author.value).toBe('Rose')

    const journal = utils.getByLabelText('Journal Name')
    fireEvent.change(journal, {target: {value: 'Rose'}})
    expect(journal.value).toBe('Rose')

    const year = utils.getByLabelText('Year')
    fireEvent.change(year, {target: {value: '1999'}})
    expect(year.value).toBe('1999')

    const volume = utils.getByLabelText('Volume Number')
    fireEvent.change(volume, {target: {value: '22'}})
    expect(volume.value).toBe('22')

    const number = utils.getByLabelText('Number')
    fireEvent.change(number, {target: {value: '2'}})
    expect(number.value).toBe('2')

    const pages = utils.getByLabelText('Pages')
    fireEvent.change(pages, {target: {value: '31'}})
    expect(pages.value).toBe('31')

    const doi = utils.getByLabelText('DOI')
    fireEvent.change(doi, {target: {value: 'Rose'}})
    expect(doi.value).toBe('Rose')
  
    
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


