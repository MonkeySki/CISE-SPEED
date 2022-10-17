import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SyncIcon from '@mui/icons-material/Sync';

export default function ArticleList() {
  const [articles, setArticles] = useState([]);
  const rows = articles.map(
    ({ _id, title, author, year, volume, number, pages, doi, claim, claimStrength }) => ({
      id: _id,
      title,
      author,
      year,
      volume,
      number,
      pages,
      doi,
      claim,
      claimStrength
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
    { field: "volume", headerName: "Volume", width: 100 },
    { field: "number", headerName: "Number", width: 100 },
    { field: "pages", headerName: "Pages", width: 100 },
    { field: "doi", headerName: "Doi", width: 100 },
    { field: "claim", headerName: "Claim Type", width: 100 },
    { field: "claimStrength", headerName: "Claim Strength", width: 150 },
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

  //For Year Search
  const [filterModel, setFilterModel] = React.useState({
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

  //ON CLICK HANDLE STUFF
  const handleOnCellClick = (param) => {
    console.log("clicked:", param);
  };

  // This following section will display the table with the records of individuals.
  return (
    <div>
      <h3 className="Article-list">Article List</h3>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          onCellClick={handleOnCellClick}
          components={{ Toolbar: GridToolbar }}
          componentsProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
          }}
          filterModel={filterModel}
          onFilterModelChange={(model) => setFilterModel(model)}
        />
      </div>
    </div>
  );
}