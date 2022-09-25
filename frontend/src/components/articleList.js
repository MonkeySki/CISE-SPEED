import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";


export default function ArticleList() {
  const [articles, setArticles] = useState([]);
  const rows =articles.map(({_id,title,author,year,volume,number,pages,doi})=>({id:_id,title,author,year,volume,number,pages,doi}))
  console.log("Rows:",rows)

  const columns = [
    { field: "title", headerName: "Title", width: 100 },
    { field: "author", headerName: "Author", width: 100 },
    { field: "year", headerName: "Year", width: 100 },
    { field: "volume", headerName: "Volume", width: 100 },
    { field: "number", headerName: "Number", width: 100 },
    { field: "pages", headerName: "Pages", width: 100 },
    { field: "doi", headerName: "Doi", width: 100 },
  ];
  // This method fetches the records from the database.
  useEffect(() => {
    async function getArticles() {
      await axios.get("/article").then((res) => {
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
  
  //ON CLICK HANDLE STUFF
  const handleOnCellClick =(param)=>{
    console.log("clicked:",param)

  }

  // This following section will display the table with the records of individuals.
  return (
    <div>
      <h3>Article List</h3>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          onCellClick={handleOnCellClick}
        />
      </div>
    </div>
  );
}
