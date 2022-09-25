import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { DataGrid } from "@mui/x-data-grid";

const Article = (props) => (
  <tr>
    <td>{props.article.title}</td>
    <td>{props.article.author}</td>
    <td>{props.article.year}</td>
    <td>{props.article.volume}</td>
    <td>{props.article.number}</td>
    <td>{props.article.pages}</td>
    <td>{props.article.doi}</td>
    <td>
      <Link className="btn btn-link" to={`/edit/${props.article._id}`}>
        Edit
      </Link>{" "}
      |
      <button
        className="btn btn-link"
        onClick={() => {
          props.deleteArticle(props.article._id);
        }}
      >
        Delete
      </button>
    </td>
  </tr>
);

export default function ArticleList() {
  const [articles, setArticles] = useState([]);
  const rows = [
    {
      id: 1,
      title: 1,
      author: "Snow",
      year: "Jon",
      volume: 35,
      number: 5,
      pages: 4,
      doi: 5,
    },
  ];

  const columns = [
    { field: "id", headerName: "ID", width: 50 },
    { field: "title", headerName: "Title", width: 50 },
    { field: "author", headerName: "Author", width: 50 },
    { field: "year", headerName: "Year", width: 50 },
    { field: "volume", headerName: "Volume", width: 50 },
    { field: "number", headerName: "Number", width: 50 },
    { field: "pages", headerName: "Pages", width: 50 },
    { field: "doi", headerName: "Doi", width: 50 },
  ];
  // This method fetches the records from the database.
  useEffect(() => {
    async function getArticles() {
      await axios.get("http://localhost:5000/article").then((res) => {
        console.log(res);
        if (!res.statusText === "OK") {
          console.log("checking for articles");
          const message = `An error occurred: /article `;
          window.alert(message);
          return;
        }
        const articles = res.data;
        console.log(articles);
        setArticles(articles);
      });
    }

    getArticles();
    return;
  }, [articles.length]);

  // This method will delete a record
  async function deleteArticle(id) {
    await fetch(`/${id}`, {
      method: "DELETE",
    });

    const newArticles = articles.filter((el) => el._id !== id);
    setArticles(newArticles);
  }

  // This method will map out the records on the table
  function articleList() {
    return articles.map((article) => {
      console.log(rows);
      return (
        <Article
          article={article}
          deleteArticle={() => deleteArticle(article._id)}
          key={article._id}
        />
      );
    });
  }

  // This following section will display the table with the records of individuals.
  return (
    <div>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
        />
      </div>
      <h3>Article List</h3>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Journal</th>
            <th>Year</th>
            <th>volume</th>
            <th>Number</th>
            <th>Pages</th>
            <th>DOI</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{articleList()}</tbody>
      </table>
    </div>
  );
}
