import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios"
import { Input } from "@mui/material"
import "./create.css"
var bibtextParse = require('bibtex-parse-js');


export default function Create() {

  const [form, setForm] = useState({
    title: '',
    author: '',
    journal: '',
    year: '',
    volume: '',
    number: '',
    pages: '',
    doi: '',
    claim: ''
  });

  const navigate = useNavigate();

  const uploadBibtexFile = (event) => {
    console.log(event.target.files[0]);

    const reader = new FileReader();

    reader.readAsText(event.target.files[0]);

    reader.onload = function () {
      let a = reader.result
      console.log(reader.result);
      const test = bibtextParse.toJSON(a);

      const { title, author, journal, number, pages, volume, year } = test[0].entryTags

      const newBibTexForm = {
        title, author, journal, number, pages, volume, year
      }

      setForm(newBibTexForm);
    };

    reader.onerror = function () {
      console.log(reader.error);
    };
  };


  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();

    // When a post request is sent to the create url, we'll add a new record to the database.
    const newArticle = { ...form };

    await axios.post('http://localhost:5000/article/add', newArticle).then(res => {
      if (res.data.success === 1) {
        console.log("evidence added");
      }
    })
      .catch(error => {
        window.alert(error);
        return;
      });

    setForm({
      title: "",
      author: "",
      journal: "",
      year: "",
      volume: "",
      number: "",
      pages: "",
      doi: "",
      claim: ""
    });
    navigate("/");
  }

  // This following section will display the form that takes the input from the user.
  return (
    <div id="createForm">

      <h3>Submit an Article</h3>

      <Input type="file" name="file" sx={{ my: 2 }} onChange={uploadBibtexFile} />

      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={form.title}
            onChange={(e) => updateForm({ title: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="author">Author</label>
          <input
            type="text"
            className="form-control"
            id="author"
            value={form.author}
            onChange={(e) => updateForm({ author: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="journal">Journal Name</label>
          <input
            type="text"
            className="form-control"
            id="journal"
            value={form.journal}
            onChange={(e) => updateForm({ journal: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="year">Year</label>
          <input
            type="text"
            className="form-control"
            id="year"
            value={form.year}
            onChange={(e) => updateForm({ year: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="volume">Volume Number</label>
          <input
            type="text"
            className="form-control"
            id="volume"
            value={form.volume}
            onChange={(e) => updateForm({ volume: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="number">Number</label>
          <input
            type="text"
            className="form-control"
            id="number"
            value={form.number}
            onChange={(e) => updateForm({ number: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="pages">Pages</label>
          <input
            type="text"
            className="form-control"
            id="pages"
            value={form.pages}
            onChange={(e) => updateForm({ pages: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="doi">DOI</label>
          <input
            type="text"
            className="form-control"
            id="doi"
            value={form.doi}
            onChange={(e) => updateForm({ doi: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="claim">Claim Type</label>
          <select id="claim" name="claim" onChange={(e) => updateForm({ claim: e.target.value })}>
            <option value="Software Development">Software Development</option>
            <option value="Test Driven Development">Test Driven Development</option>
            <option value="Component Driven Development">Component Driven Development</option>
            <option value="Integration Driven Development">Integration Driven Development</option>
            <option value="Systems Development">Systems Development</option>

          </select>

        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Submit Article"
            className="btn btn-primary"
          />
        </div>
      </form>
      <div>



      </div>
    </div>
  );
}