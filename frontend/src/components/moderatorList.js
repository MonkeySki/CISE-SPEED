import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";


export default function ModeratorList() {
  const [articles, setArticles] = useState([]);
  const rows = articles.map(({ _id, title, author, year, volume, number, pages, doi, claim, approve, reject }) => ({ id: _id, title, author, year, volume, number, pages, doi, claim, approve, reject }))
  console.log("Rows:", rows)

  const columns = [
    { field: "title", headerName: "Title", width: 100 },
    { field: "author", headerName: "Author", width: 100 },
    { field: "year", headerName: "Year", width: 100 },
    { field: "volume", headerName: "Volume", width: 100 },
    { field: "number", headerName: "Number", width: 100 },
    { field: "pages", headerName: "Pages", width: 100 },
    { field: "doi", headerName: "Doi", width: 100 },
    { field: "claim", headerName: "Claim Type", width: 150 },
    {
      field: "approve",
      headerName: "Approve",
      width: 100,

      renderCell: (params) => {
        return (
          <Button
            variant="contained"
            class="btn btn-success"
            onClick={(event) => {
              onAccept(params.id);

            }}
          >
            Approve
          </Button>
        );
      }

    },

    {
      field: "Reject",
      headerName: "Reject",
      width: 100,

      renderCell: (params) => {
        return (
          <Button
            variant="contained"
            class="btn btn-danger"
            onClick={(event) => {
              console.log("trying to remove article with ID: " + params.id);
              fetch(`/${params.id}`, {
                method: "DELETE"
              });

              const newArticles = articles.filter((el) => el._id !== params.id);
              setArticles(newArticles);
            }}
          >
            Reject
          </Button>
        );
      }
    },

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
        console.log(`Articles: ${articles}`);
        setArticles(articles);
      });
    }

    function acceptFunction(article) {  //Get help: how to add checkboxes to grid, how to rermove or accept articles
      console.log("trying to accept: " + article)
    }    

    // This method will reject and delete a record 
    async function rejectArticle(id) {
      console.log("trying to remove article with ID: " + id);
      fetch(`/${id}`, {
        method: "DELETE"
      });

      const newArticles = articles.filter((el) => el._id !== id);
      setArticles(newArticles);
      
    }

    getModeratorArticles();
    return;
  }, [articles.length]);


  async function onAccept(id) {

    // When a post request is sent to the create url, we'll add a new record to the database.
    const newArticle = new article(objet);


    await axios.post('http://localhost:5000/analyst/add', newArticle).then(res => {
      if (res.data.success === 1) {
        console.log("copy added to analystList");
      }
    })
      .catch(error => {
        window.alert(error);
        return;
      });

      delete ModeratorList['_id'];

      fetch(`/${id}`, {
        method: "DELETE"
      });
      
      const newArticles = articles.filter((el) => el._id !== id);
      setArticles(newArticles);

  }

  async function deleteItem(id) {
    let requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    }
  
    const response = await fetch(`/delete/${ id }`, requestOptions);
    if (response.status !== 204) {
      throw Error("Cannot delete your item from list");
    }
    return id;
  }

  //ON CLICK HANDLE STUFF
  const handleOnCellClick = (param) => {
    console.log("clicked:", param)

  }

  // This following section will display the table with the records of individuals.
  return (
    <div>
      <h3 className="Articles to be moderated">Articles to be moderated</h3>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          onCellClick={handleOnCellClick}
        />
      </div>
    </div>
  );
}
