import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import Snackbar from "@mui/material/Snackbar";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";

// Checks to see if there are any changes
function computeMutation(newRow, oldRow) {
  if (newRow.title !== oldRow.title) {
    return `Title from '${oldRow.title}' to '${newRow.title}'`;
  }
  if (newRow.author !== oldRow.author) {
    return `Author from '${oldRow.author}' to '${newRow.author}'`;
  }
  if (newRow.year !== oldRow.year) {
    return `Year from '${oldRow.year}' to '${newRow.year}'`;
  }
  if (newRow.volume !== oldRow.volume) {
    return `Volume from '${oldRow.volume}' to '${newRow.volume}'`;
  }
  if (newRow.number !== oldRow.number) {
    return `Number from '${oldRow.number}' to '${newRow.number}'`;
  }
  if (newRow.pages !== oldRow.pages) {
    return `Pages from '${oldRow.pages}' to '${newRow.pages}'`;
  }
  if (newRow.doi !== oldRow.doi) {
    return `Doi from '${oldRow.doi}' to '${newRow.doi}'`;
  }
  if (newRow.claim !== oldRow.claim) {
    return `Claim from '${oldRow.claim}' to '${newRow.claim}'`;
  }

  return null;
}

// The Administrator's Page
export default function Edit() {
  const [articles, setArticles] = useState([]);
  const rows = articles.map(
    ({ _id, title, author, year, volume, number, pages, doi, claim }) => ({
      id: _id,
      title,
      author,
      year,
      volume,
      number,
      pages,
      doi,
      claim,
    })
  );
  const columns = [
    { field: "title", headerName: "Title", width: 100, editable: true },
    { field: "author", headerName: "Author", width: 100, editable: true },
    { field: "year", headerName: "Year", width: 100, editable: true },
    { field: "volume", headerName: "Volume", width: 100, editable: true },
    { field: "number", headerName: "Number", width: 100, editable: true },
    { field: "pages", headerName: "Pages", width: 100, editable: true },
    { field: "doi", headerName: "Doi", width: 100, editable: true },
    { field: "claim", headerName: "Claim Type", width: 100, editable: true },
  ];

  // This method fetches the articles from the database.
  useEffect(() => {
    async function getArticles() {
      await axios.get("http://localhost:5000/article").then((res) => {
        if (!res.statusText === "OK") {
          const message = `An error occurred: /article `;
          window.alert(message);
          return;
        }
        const articles = res.data;
        setArticles(articles);
      });
    }
    getArticles();
    return;
  }, [articles.length]);

  //ON CLICK HANDLE STUFF
  const handleOnCellClick = (param) => {
    console.log("clicked:", param);
  };

  //We shouldn't do it like this, but this reloads the page when we need to refresh the database with unique id's
  function refreshPage() {
    window.location.reload(true);
  }

  // These are so we can edit the grid
  const noButtonRef = React.useRef(null);
  const [promiseArguments, setPromiseArguments] = React.useState(null);
  const [snackbar, setSnackbar] = React.useState(null);
  const handleCloseSnackbar = () => setSnackbar(null);

  const processRowUpdate = React.useCallback(
    (newRow, oldRow) =>
      new Promise((resolve, reject) => {
        const mutation = computeMutation(newRow, oldRow);
        if (mutation) {
          // Save the arguments to resolve or reject the promise later
          setPromiseArguments({ resolve, reject, newRow, oldRow });
        } else {
          resolve(oldRow); // Nothing was changed
        }
      }),
    []
  );

  const handleProcessRowUpdateError = React.useCallback(() => {
    refreshPage();
  }, []);

  const handleNo = () => {
    const { oldRow, resolve } = promiseArguments;
    resolve(oldRow); // Resolve with the old row to not update the internal state
    setPromiseArguments(null);
  };

  const handleYes = async () => {
    const { newRow, oldRow, reject, resolve } = promiseArguments;
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:5000/update/" + newRow.id,
        data: {
          title: newRow.title,
          author: newRow.author,
          journal: newRow.journal,
          year: newRow.year,
          volume: newRow.volume,
          number: newRow.number,
          pages: newRow.pages,
          doi: newRow.doi,
          claim: newRow.claim,
        },
      });
      setSnackbar({
        children: "Article successfully saved",
        severity: "success",
      });
      resolve(response);
      setPromiseArguments(null);
    } catch (error) {
      setSnackbar({ children: newRow.id, severity: "error" });
      reject(oldRow);
      setPromiseArguments(null);
    }
  };

  const handleEntered = () => {
    //Nothing happens
  };

  const renderConfirmDialog = () => {
    if (!promiseArguments) {
      return null;
    }

    const { newRow, oldRow } = promiseArguments;
    const mutation = computeMutation(newRow, oldRow);

    return (
      <Dialog
        maxWidth="xs"
        TransitionProps={{ onEntered: handleEntered }}
        open={!!promiseArguments}
      >
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent dividers>
          {`Pressing 'Yes' will change ${mutation}.`}
        </DialogContent>
        <DialogActions>
          <Button ref={noButtonRef} onClick={handleNo}>
            No
          </Button>
          <Button onClick={handleYes}>Yes</Button>
        </DialogActions>
      </Dialog>
    );
  };
  // This following section will display the table with our articles
  return (
    <div>
      <h3 className="Article-list">Edit Articles</h3>
      <p>To edit articles, double click into a cell, edit the cell, press enter, then yes on the pop up.</p>
      <div style={{ height: 400, width: "100%" }}>
        {renderConfirmDialog()}
        <DataGrid
          rows={rows}
          columns={columns}
          processRowUpdate={processRowUpdate}
          onProcessRowUpdateError={handleProcessRowUpdateError}
          experimentalFeatures={{ newEditingApi: true }}
          pageSize={5}
          rowsPerPageOptions={[5]}
          onCellClick={handleOnCellClick}
        />
        {!!snackbar && (
          <Snackbar open onClose={handleCloseSnackbar} autoHideDuration={6000}>
            <Alert {...snackbar} onClose={handleCloseSnackbar} />
          </Snackbar>
        )}
      </div>
    </div>
  );
}
