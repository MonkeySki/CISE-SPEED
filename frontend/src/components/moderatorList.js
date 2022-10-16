import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SyncIcon from '@mui/icons-material/Sync';
import { Button } from "@mui/material";

export default function ArticleList() {
  const [articles, setArticles] = useState([]);
  const rows = articles.map(
    ({ _id, title, author, year, volume, number, pages, doi, claim, }) => ({
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

  //So we can search a year range.
  const quantityOnlyOperators = [
    {
      label: 'Between',
      value: 'between',
      getApplyFilterFn: (filterItem) => {
        if (!Array.isArray(filterItem.value) || filterItem.value.length !== 2) {
          return null;
        }
        if (filterItem.value[0] == null || filterItem.value[1] == null) {
          return null;
        }

        return ({ value }) => {
          return (
            value !== null &&
            filterItem.value[0] <= value &&
            value <= filterItem.value[1]
          );
        };
      },
      InputComponent: InputNumberInterval,
    },
  ];
  const columns = [
    { field: "title", headerName: "Title", width: 100 },
    { field: "author", headerName: "Author", width: 100 },
    { field: "year", headerName: "Year", width: 100, filterOperators: quantityOnlyOperators },
    { field: "volume", headerName: "Volume", widtWh: 100 },
    { field: "number", headerName: "Number", width: 100 },
    { field: "pages", headerName: "Pages", width: 100 },
    { field: "doi", headerName: "Doi", width: 100 },
    { field: "claim", headerName: "Claim Type", width: 200 },
    {
      field: "approve",
      headerName: "Approve",
      width: 100,

      renderCell: (_id) => {
        return (
          <Button
            variant="contained"
            class="btn btn-success"
            onClick={(event) => {
              handleAccept(_id);
              deleteHandler(_id);
              document.location.reload(true); 
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

      renderCell: (_id) => {
        return (
          <Button
            variant="contained"
            class="btn btn-danger"
            onClick={(event) => {
              handleReject(_id);
              deleteHandler(_id);
              document.location.reload(true)
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

    getModeratorArticles();
    return;
  }, [articles.length]);


  //For Year Search
  const [setFilterModel] = React.useState({
    items: [
      {
        id: 1,
        columnField: 'year',
        value: [1950, 2100],
        operatorValue: 'between',
      },
    ],
  });
  const SUBMIT_FILTER_STROKE_TIME = 500;
  function InputNumberInterval(props) {
    const { item, applyValue, focusElementRef = null } = props;
    const filterTimeout = React.useRef();
    const [filterValueState, setFilterValueState] = React.useState(item.value ?? '');
    const [applying, setIsApplying] = React.useState(false);
    React.useEffect(() => {
      return () => {
        clearTimeout(filterTimeout.current);
      };
    }, []);
    React.useEffect(() => {
      const itemValue = item.value ?? [undefined, undefined];
      setFilterValueState(itemValue);
    }, [item.value]);
    const updateFilterValue = (lowerBound, upperBound) => {
      clearTimeout(filterTimeout.current);
      setFilterValueState([lowerBound, upperBound]);

      setIsApplying(true);
      filterTimeout.current = setTimeout(() => {
        setIsApplying(false);
        applyValue({ ...item, value: [lowerBound, upperBound] });
      }, SUBMIT_FILTER_STROKE_TIME);
    };
    const handleUpperFilterChange = (event) => {
      const newUpperBound = event.target.value;
      updateFilterValue(filterValueState[0], newUpperBound);
    };
    const handleLowerFilterChange = (event) => {
      const newLowerBound = event.target.value;
      updateFilterValue(newLowerBound, filterValueState[1]);
    };
    return (
      <Box
        sx={{
          display: 'inline-flex',
          flexDirection: 'row',
          alignItems: 'end',
          height: 48,
          pl: '20px',
        }}
      >
        <TextField
          name="lower-bound-input"
          placeholder="From"
          label="From"
          variant="standard"
          value={Number(filterValueState[0])}
          onChange={handleLowerFilterChange}
          type="number"
          inputRef={focusElementRef}
          sx={{ mr: 2 }}
        />
        <TextField
          name="upper-bound-input"
          placeholder="To"
          label="To"
          variant="standard"
          value={Number(filterValueState[1])}
          onChange={handleUpperFilterChange}
          type="number"
          InputProps={applying ? { endAdornment: <SyncIcon /> } : {}}
        />
      </Box>
    );
  }
  InputNumberInterval.propTypes = {
    applyValue: PropTypes.func.isRequired,
    focusElementRef: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.shape({
        current: PropTypes.any.isRequired,
      }),
    ]),
    item: PropTypes.shape({
      columnField: PropTypes.string.isRequired,
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      operatorValue: PropTypes.string,
      value: PropTypes.any,
    }).isRequired,
  };


  //When analyst clicks accpet, that article's data is collected adn added to the articles collection
  async function handleAccept(clickedArticle) {

    const acceptedArticle = {
      title: clickedArticle.row.title,
      author: clickedArticle.row.author,
      year: clickedArticle.row.year,
      volume: clickedArticle.row.volume,
      number: clickedArticle.row.number,
      pages: clickedArticle.row.pages,
      doi: clickedArticle.row.doi,
      claim: clickedArticle.row.claim,
    }

    await axios.post('http://localhost:5000/analyst/add', acceptedArticle).then(res => {
      if (res.data.success === 1) {
        console.log("evidence added");
      }
    })
      .catch(error => {
        window.alert(error);
        return;
      });
  }

  //function to add article to rejected collection
  async function  handleReject(clickedArticle) {

    const rejectedArticle = {
      title: clickedArticle.row.title,
      author: clickedArticle.row.author,
      year: clickedArticle.row.year,
      volume: clickedArticle.row.volume,
      number: clickedArticle.row.number,
      pages: clickedArticle.row.pages,
      doi: clickedArticle.row.doi,
      claim: clickedArticle.row.claim,
    }

    await axios.post('http://localhost:5000/rejected/add', rejectedArticle).then(res => {
      if (res.data.success === 1) {
        console.log("rejected article added");
      }
    })
      .catch(error => {
        window.alert(error);
        return;
      });

  }


  //function to delete element from datagrid    NOT WORKING
  const deleteHandler = async (clickedArticle) => {
    try {
      console.log(`http://localhost:5000/moderator/${clickedArticle.id}`)
      
      
    //   const response = await axios.delete(
    //     `http://localhost:5000/moderator/delete/${clickedArticle.id}`
    //   ).then(res => {
    //     if (res.data.success === 1) {
    //       console.log("rejected article added");
    //     }
    //   })
      
    } catch (error) {
      console.log("Something went wrong", error)
    }
  }
  


  //ON CLICK HANDLE STUFF, FOR TESTING DELETE ME FOR FINAL
  const handleOnCellClick = (param) => {
    console.log("clicked:", param)

  }

  // This following section will display the table with the records of individuals.
  return (
    <div>
      <h3 className="Articles to be moderated">Articles to be moderated</h3>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          disableColumnFilter
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          onCellClick={handleOnCellClick}
          components={{ Toolbar: GridToolbar }}
          componentsProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
          }}
          onFilterModelChange={(model) => setFilterModel(model)}
        />
      </div>
    </div>
  );
}
