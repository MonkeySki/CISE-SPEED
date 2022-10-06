
import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";


export default function ModeratorList() {
  const [articles, setArticles] = useState([]);
  const rows = articles.map(({ _id, title, author, year, volume, number, pages, doi, claim}) => ({ id: _id, title, author, year, volume, number, pages, doi, claim }))
  console.log("Rows:", rows)

  const columns = [
    { field: "title", headerName: "Title", width: 100 },
    { field: "author", headerName: "Author", width: 100 },
    { field: "year", headerName: "Year", width: 100 },
    { field: "volume", headerName: "Volume", width: 100 },
    { field: "number", headerName: "Number", width: 100 },
    { field: "pages", headerName: "Pages", width: 100 },
    { field: "doi", headerName: "Doi", width: 100 },
    { field: "claim", headerName: "Claim Type", width: 100 },
    { field: "Approve", headerName: "Approve", width: 100 },
    { field: "Reject", headerName: "Reject", width: 100 },
  ];
  // This method fetches the records from the database.
  useEffect(() => {
    async function getModeratorArticles() {
      await axios.get("http://localhost:5000/moderator").then((res) => {
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

    function acceptFunction(article) {  //Get help: how to add checkboxes to grid, how to rermove or accept articles
      console.log("trying to remove: " + article)
      //remove(article);   //imagine if that  just worked...
      //probably want to refresh too?
    }

    getModeratorArticles();
    return;
  }, [articles.length]);

  //ON CLICK HANDLE STUFF
  const handleOnCellClick = (param) => {
    console.log("clicked:", param)

  }

  // This following section will display the table with the records of individuals.
  return (
    <div>
      <h3 className="Moderator-list">Moderator List</h3>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          onCellClick={handleOnCellClick}
          on
        />
      </div>
    </div>
  );
}
