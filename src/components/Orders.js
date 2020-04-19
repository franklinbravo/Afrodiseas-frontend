import React, { useState } from 'react';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import TableHead from '@material-ui/core/TableHead';
import * as moment from 'moment'
import 'moment/locale/es';
import ListOfCards from '../components/ListOfCards';
import Link from '@material-ui/core/Link';



const useStyles1 = makeStyles(theme => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
    background: '#f0f0f0'
  },
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
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

const useStyles2 = makeStyles({
  table: {
    //minWidth: 500,
  },
});


const StyledTableCell = withStyles(theme => ({
  head: {
    /* background:'#f0f0f0', */
    color: 'white' /* theme.palette.common.white */,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const Orders = ({ rows = [] }) => {
  const classes = useStyles2();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [details, setDetails] = useState(null)
  const [openDeatails, setOpenDeatails] = useState(false)
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const datePurchase = (date) => {
    if (!moment(date, 'DD/MM/YYYY hh:mm a').isValid()) return "Error de fecha"
    if ((moment().diff(moment(date, 'DD/MM/YYYY hh:mm a'), 'h')) > 24) {
      return moment(date, 'DD/MM/YYYY hh:mm a').format('DD/MM/YYYY hh:mm a')
    }
    return moment.duration(-moment().diff(moment(date, 'DD/MM/YYYY hh:mm a'), 'm'), "m").locale("es").humanize(true);
  }
  const cutText = (text, maxLength) => (
    text.length > maxLength
      ?
      `${text.slice(0, maxLength)}...`
      :
      text
  )
  const showDetails = (data) => {
    setDetails(data)
    setOpenDeatails(true)
  }
  const closeDeatails = () => {
    setOpenDeatails(false)
  }

  return (
    <>
      {
        !!details ?
          <ListOfCards
            details={details}
            openDeatails={openDeatails}
            closeDeatails={closeDeatails}
          /> :
          null
      }

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="custom pagination table">
          <TableHead style={{ background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)' }}>
            <TableRow>
              <StyledTableCell><h3 style={{margin:0}} > # Orden  </h3></StyledTableCell>
              <StyledTableCell align="center"> <h3 style={{margin:0}} > Fecha </h3></StyledTableCell>
              <StyledTableCell align="center"><h3 style={{margin:0}} >Estado de pago </h3></StyledTableCell>
              <StyledTableCell align="center"><h3 style={{margin:0}} >Estado de envio</h3></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ background: '#f0f0f0' }}>
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map(row => (
              <TableRow key={row.order}>
                <TableCell component="th" scope="row">
                  <Link href="#" onClick={() => showDetails(row)}>
                  <h4 style={{margin:0}} >{cutText(row.order, 10)}</h4>
                  </Link>
                </TableCell>
                <TableCell align="center">
                <h4 style={{margin:0}} >{datePurchase(row.date)}</h4>
                </TableCell>
                <TableCell align="center">
                <h4 style={{margin:0}} > {row.status}</h4>
                </TableCell>
                <TableCell align="center">
                <h4 style={{margin:0}} >{row.shippingStatus}</h4>
                  
                </TableCell>
              </TableRow>
            ))}

            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter style={{ background: '#f0f0f0' }}>
            <TableRow >
              <TablePagination

                rowsPerPageOptions={[5, 10, { label: 'All', value: -1 }]}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                labelRowsPerPage="Filas por página"
                SelectProps={{
                  inputProps: { 'aria-label': 'Filas por página' },
                  native: true,
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
}

export default Orders;