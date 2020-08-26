import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  Box,
  Button,
  Chip,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Avatar,
  Typography,
  Link,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Paper,
  TableContainer,
  TableFooter,
  TablePagination,
  IconButton
} from "@material-ui/core";

import {
  KeyboardArrowLeft,
  KeyboardArrowRight,
  Person as PersonIcon,
  LinkedIn as LinkedInIcon
} from "@material-ui/icons";

import FirstPageIcon from "@material-ui/icons/FirstPage";
import LastPageIcon from "@material-ui/icons/LastPage";
import PropTypes from "prop-types";

const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 500,
    //marginTop: 16,
    // marginLeft: theme.spacing(-2),
    // marginRight: theme.spacing(-2),
    "& tr": {
      backgroundColor: "#FFF",
      marginLeft: 0,
      marginRight: 0,
      borderRadius: 0
    }
  },
  card: {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(2),
    border: "1px solid rgba(224, 224, 224, 1)",
    borderRadius: "5px"
  },
  general: {
    position: "relative",
    paddingLeft: theme.spacing(9),
    flexBasis: "350px"
  },
  skills: {
    flex: "1 0 0px",
    display: "flex",
    flexDirection: "column"
  },
  other: {
    border: "none",
    flexBasis: "260px",
    paddingBottom: theme.spacing(6.5)
  },
  avatar: {
    position: "absolute",
    top: theme.spacing(2),
    left: theme.spacing(2),
    backgroundColor: theme.palette.primary.main
  },
  skillsHeader: {
    flex: "1"
  },
  skillsList: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5)
    }
  },
  chipsStyle: {
    backgroundColor: "#83cff6",
    borderRadius: 5
  },
  scoreIcon: {
    color: "#000",
    fontSize: 21,
    marginBottom: theme.spacing(0.25),
    width: 44,
    height: 44,
    borderRadius: 5,
    border: "solid 2px #417505",
    backgroundColor: "#bffd7a",
    '& [class*="MuiChip-label-"]': {
      padding: 0
    }
  },
  expansionPanel: {
    width: "100%",
    position: "relative",
    padding: "0",
    border: "none"
  },
  expansionPanelSummary: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    padding: "0",
    "& > div": {
      margin: "0"
    },
    '& span[class*="MuiButton-label"]::before': {
      content: "'View More'"
    },
    '& .Mui-expanded span[class*="MuiButton-label"]::before': {
      content: "'View Less'"
    },
    "& .Mui-expanded": {
      margin: 0
    },
    minHeight: "initial"
  },
  expansionPanelDetails: {
    display: "flex",
    flexDirection: "row"
  },
  firstTab: {
    flexBasis: "350px",
    paddingLeft: theme.spacing(7)
  },
  secondTab: {
    flex: "1 0 0px"
  },
  thirdTab: {
    flexBasis: "260px",
    textAlign: "right",
    paddingBottom: theme.spacing(6.5)
  }
}));
const useStyles1 = makeStyles(theme => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5)
  }
}));
function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = event => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = event => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = event => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = event => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired
};

export default function ListJobListing(props) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  let rows = []; // props.candidates.candidateList;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const renderRow = () => (
    <TableRow
      key={props.name}
      className={`${
        classes.card
      } MuiPaper-root MuiPaper-rounded MuiPaper-outlined MuiPaper-elevation3`}
    >
      <TableCell style={{ border: "none" }} className={classes.general}>
        1
      </TableCell>
      <TableCell style={{ border: "none" }} className={classes.skills}>
        2
      </TableCell>
      <TableCell align="right" className={classes.other}>
        3
      </TableCell>
      <TableCell className={classes.expansionPanel}>
        <ExpansionPanel style={{ boxShadow: "none" }}>
          <ExpansionPanelSummary
            className={classes.expansionPanelSummary}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Button color="primary" variant="contained" />
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.expansionPanelDetails}>
            <div className={classes.firstTab}>firstTab</div>
            <div className={classes.secondTab}>secondTab</div>
            <div className={classes.thirdTab}>thirdTab</div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </TableCell>
    </TableRow>
  );

  return (
    <TableContainer>
      <Table className={classes.table} aria-label="custom pagination table">
        <TableBody>{renderRow()}</TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              colSpan={3}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { "aria-label": "rows per page" },
                native: true
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}

ListJobListing.propTypes = {};
