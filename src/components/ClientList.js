// EquipmentList.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";
import { styled } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import PropTypes from "prop-types";
import {
   InputGroup,
   FormControl,
   Button
} from "react-bootstrap";
import {
   Table,
   TableBody,
   TableCell,
   TableContainer,
   TableHead,
   TableRow,
   Paper,
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import TablePagination from "@mui/material/TablePagination";
import Box from "@mui/material/Box";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import ClientDetail from "./ClientDetail";

function TablePaginationActions(props) {
   const theme = useTheme();
   const { count, page, rowsPerPage, onPageChange } = props;

   const handleFirstPageButtonClick = (event) => {
      onPageChange(event, 0);
   };

   const handleBackButtonClick = (event) => {
      onPageChange(event, page - 1);
   };

   const handleNextButtonClick = (event) => {
      onPageChange(event, page + 1);
   };

   const handleLastPageButtonClick = (event) => {
      onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
   };

   return (
      <Box sx={{ flexShrink: 0, ml: 2.5 }}>
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
      </Box>
   );
}

TablePaginationActions.propTypes = {
   count: PropTypes.number.isRequired,
   onPageChange: PropTypes.func.isRequired,
   page: PropTypes.number.isRequired,
   rowsPerPage: PropTypes.number.isRequired,
};

function ClientList({isToRefreshData, setIsToRefreshData}) {
   const [searchTerm, setSearchTerm] = useState("");
   const [page, setPage] = React.useState(0);
   const [rowsPerPage, setRowsPerPage] = React.useState(10);
   const [loading, setLoading] = useState(true);
   const [clients, setClients] = useState([]);
   const [showDeleteModal, setShowDeleteModal] = useState(false);
   const [isModalVisible, setIsModalVisible] = useState(false);
   const [selectedClientId, setSelectedClientId]  = useState("");

   const getClientList = async () => {
      const { data } = await axios.get('/api/clients');
      data.filter((client) =>
         client["name"].toLowerCase().includes(searchTerm.toLowerCase())
      );
      data.sort((a, b) => (b.id - a.id));
      setClients(data);
      setLoading(false);
      setIsToRefreshData(false);
   }

   useEffect(() => {
      if ( isToRefreshData ) {
         getClientList();
      }
   }, [isToRefreshData]);

   var filteredClients = clients.filter((client) => client["name"].toLowerCase().includes(searchTerm.toLowerCase()));

   const viewClientOnClick = (clientId) => {
      setSelectedClientId(clientId);
      setIsModalVisible(true);
   };

   // Avoid a layout jump when reaching the last page with empty rows.
   const emptyRows =
      page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredClients.length) : 0;

   const handleChangePage = (event, newPage) => {
      setPage(newPage);
   };

   const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
   };

   const onChangeSearchTerm = (searchTerm) => {
      setSearchTerm(searchTerm);
   };

   const StyledTableCell = styled(TableCell)(({ theme }) => ({
      [`&.${tableCellClasses.head}`]: {
         fontSize: 18,
         backgroundColor: "#7393B3",
         color: theme.palette.common.white,
         width: 100,
         maxWidth: 100,
         overflow: "hidden",
         textOverflow: "ellipsis",
         borderStyle: "border-box",
      },
      [`&.${tableCellClasses.body}`]: {
         fontSize: 18,
         width: 100,
         maxWidth: 100,
         overflow: "hidden",
         textOverflow: "ellipsis",
         borderStyle: "border-box",
         whiteSpace: "nowrap"
      },
   }));

   const StyledTableRow = styled(TableRow)(({ theme }) => ({
      "&:nth-of-type(odd)": {
         backgroundColor: theme.palette.action.hover,
      },
   }));

   if (loading)
      return <TailSpin wrapperStyle={{
         position: "absolute",
         height: "100vh",
         width: "100vw",
         display: "flex",
         alignItems: "center",
         justifyContent: "center"
      }} color="red" radius={"8px"} />;
   else
      return (

         <div>
            <InputGroup style={{ marginBottom: '2%' }}>
               <FormControl
                  placeholder="Pesquise pelo nome do cliente..."
                  aria-label="Search"
                  aria-describedby="basic-addon1"
                  value={searchTerm}
                  onChange={(e) => onChangeSearchTerm(e.target.value)}
                  style={{ marginLeft: "0.25%" }}
               />
            </InputGroup>


            <Paper sx={{ width: '100%', mb: 2 }}>
               <TableContainer component={Paper}>
                  <Table>
                     <TableHead>
                        <TableRow>
                           <StyledTableCell><strong>Nome</strong></StyledTableCell>
                           <StyledTableCell><strong>Número de Telemóvel</strong></StyledTableCell>
                           <StyledTableCell><strong>Morada</strong></StyledTableCell>
                           <StyledTableCell><strong>Código Postal</strong></StyledTableCell>
                           <StyledTableCell><strong>NIF</strong></StyledTableCell>
                           <StyledTableCell><strong>Nº Cliente Jomafal</strong></StyledTableCell>
                           <StyledTableCell><strong>Ações</strong></StyledTableCell>
                        </TableRow>
                     </TableHead>
                     <TableBody>
                        {(rowsPerPage > 0
                           ? filteredClients.slice(
                              page * rowsPerPage,
                              page * rowsPerPage + rowsPerPage
                           )
                           : filteredClients
                        ).map((client) => (
                           <StyledTableRow key={client.id}>
                              <StyledTableCell title={client.name}>{client.name}</StyledTableCell>
                              <StyledTableCell>
                                 {client.phoneNumber}
                              </StyledTableCell>
                              <StyledTableCell>
                                 {client.address}
                              </StyledTableCell>
                              <StyledTableCell title={client.postalCode}>{client.postalCode}</StyledTableCell>
                              <StyledTableCell title={client.postalCode}>{client.nif}</StyledTableCell>
                              <StyledTableCell title={client.postalCode}>{client.clientNumber}</StyledTableCell>
                              <StyledTableCell>
                                 <div className="actionTableCell">
                                    <div className="viewEquipmentButton">
                                       <Button onClick={() => { viewClientOnClick(client.id) } }><VisibilityIcon></VisibilityIcon></Button>
                                    </div>
                                 </div>
                              </StyledTableCell>
                           </StyledTableRow>
                        ))}
                        {emptyRows > 0 && (
                           <TableRow style={{ height: 53 * emptyRows }}>
                              <TableCell colSpan={6} />
                           </TableRow>
                        )}
                     </TableBody>
                  </Table>
               </TableContainer>
               <TablePagination
                  rowsPerPageOptions={[
                     10,
                     25,
                     { label: "Todos", value: -1 },
                  ]}
                  component="div"
                  count={filteredClients.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  slotProps={{
                     select: {
                        inputProps: {
                           "aria-label": "Clientes por página",
                           'aria-labelledby': 'rowsPage',
                        },
                        native: true,
                     },
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                  sx={{
                     ".MuiTablePagination-displayedRows": {
                        "marginTop": "1em",
                        "marginBottom": "1em"
                     },
                     ".MuiTablePagination-selectLabel": {
                        "marginTop": "1em",
                        "marginBottom": "1em",
                        display: "none"
                     }
                  }}
               />
            </Paper>
            { selectedClientId && <ClientDetail setIsToRefreshData={setIsToRefreshData} isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} clientId={selectedClientId}></ClientDetail>}
         </div>
      );
}

export default ClientList;
