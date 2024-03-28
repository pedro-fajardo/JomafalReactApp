// EquipmentList.js
import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import PropTypes from "prop-types";
import {
   InputGroup,
   DropdownButton,
   Dropdown,
   FormControl,
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
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import Box from "@mui/material/Box";

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

function EquipmentList({ equipments }) {
   const [searchTerm, setSearchTerm] = useState("");
   const [searchBy, setSearchBy] = useState("name");
   const [page, setPage] = React.useState(0);
   const [rowsPerPage, setRowsPerPage] = React.useState(10);

   const filteredEquipments = equipments.filter((equipment) =>
      equipment[searchBy].toLowerCase().includes(searchTerm.toLowerCase())
   );

   // Avoid a layout jump when reaching the last page with empty rows.
   const emptyRows =
      page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredEquipments.length) : 0;

   const handleChangePage = (event, newPage) => {
      setPage(newPage);
   };

   const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
   };
   const convertSearchText = (searchBy) => {
      switch (searchBy) {
         case "name":
            return "Nome";
         case "productNumber":
            return "PNC";
         case "serialNumber":
            return "SN";
         case "status":
            return "Estado";
         case "clientName":
            return "Nome do Cliente";
         default:
            return "";
      }
   };

   const convertStatus = (status) => {
      switch (status) {
         case "new":
            return "Novo";
         case "repairing":
            return "Em reparação";
         case "waiting parts":
            return "À espera de peças";
         case "repaired":
            return "Reparado";
         default:
            return "Selecione o estado";
      }
   };

   const StyledTableCell = styled(TableCell)(({ theme }) => ({
      [`&.${tableCellClasses.head}`]: {
         backgroundColor: "#7393B3",
         color: theme.palette.common.white,
      },
      [`&.${tableCellClasses.body}`]: {
         fontSize: 14,
      },
   }));

   const StyledTableRow = styled(TableRow)(({ theme }) => ({
      "&:nth-of-type(odd)": {
         backgroundColor: theme.palette.action.hover,
      },
   }));

   return (
      <div>
         <InputGroup className="mb-3">
            <DropdownButton
               as={InputGroup.Prepend}
               variant="outline-secondary"
               title={`Pesquisar por ${convertSearchText(searchBy)}`}
               id="input-group-dropdown-1"
            >
               <Dropdown.Item onClick={() => setSearchBy("name")}>
                  Nome
               </Dropdown.Item>
               <Dropdown.Item onClick={() => setSearchBy("productNumber")}>
                  PNC
               </Dropdown.Item>
               <Dropdown.Item onClick={() => setSearchBy("serialNumber")}>
                  SN
               </Dropdown.Item>
               <Dropdown.Item onClick={() => setSearchBy("clientName")}>
                  Nome do Cliente
               </Dropdown.Item>
               <Dropdown.Item
                  onClick={() => {
                     setSearchBy("status");
                     setSearchTerm("");
                  }}
               >
                  Estado
               </Dropdown.Item>
            </DropdownButton>
            {searchBy === "status" ? (
               <DropdownButton
                  style={{ marginLeft: "0.25%" }}
                  variant="outline-secondary"
                  title={`${convertStatus(searchTerm)}`}
                  id="input-group-dropdown-1"
               >
                  <Dropdown.Item onClick={() => setSearchTerm("new")}>
                     Novo
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setSearchTerm("repairing")}>
                     Em Reparação
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setSearchTerm("waiting parts")}>
                     À Espera de Peças
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setSearchTerm("repaired")}>
                     Reparado
                  </Dropdown.Item>
               </DropdownButton>
            ) : (
               <FormControl
                  placeholder="Pesquise..."
                  aria-label="Search"
                  aria-describedby="basic-addon1"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ marginLeft: "0.25%" }}
               />
            )}
         </InputGroup>
         <Paper sx={{ width: '100%', mb: 2 }}>
            <TableContainer component={Paper}>
               <Table>
                  <TableHead>
                     <TableRow>
                        <StyledTableCell>Nome</StyledTableCell>
                        <StyledTableCell>PNC</StyledTableCell>
                        <StyledTableCell>SN</StyledTableCell>
                        <StyledTableCell>Avaria</StyledTableCell>
                        <StyledTableCell>Cliente</StyledTableCell>
                        <StyledTableCell>Estado</StyledTableCell>
                     </TableRow>
                  </TableHead>
                  <TableBody>
                     {(rowsPerPage > 0
                        ? filteredEquipments.slice(
                           page * rowsPerPage,
                           page * rowsPerPage + rowsPerPage
                        )
                        : filteredEquipments
                     ).map((equipment) => (
                        <StyledTableRow key={equipment.id}>
                           <StyledTableCell>{equipment.name}</StyledTableCell>
                           <StyledTableCell>
                              {equipment.productNumber}
                           </StyledTableCell>
                           <StyledTableCell>
                              {equipment.serialNumber}
                           </StyledTableCell>
                           <StyledTableCell>{equipment.breakdown}</StyledTableCell>
                           <StyledTableCell>{equipment.client}</StyledTableCell>
                           <StyledTableCell>
                              {convertStatus(equipment.status)}
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
                              { label: "All", value: -1 },
                           ]}
                           component="div"
                           count={filteredEquipments.length}
                           rowsPerPage={rowsPerPage}
                           page={page}
                           slotProps={{
                              select: {
                                 inputProps: {
                                    "aria-label": "rows per page",
                                 },
                                 native: true,
                              },
                           }}
                           onPageChange={handleChangePage}
                           onRowsPerPageChange={handleChangeRowsPerPage}
                           ActionsComponent={TablePaginationActions}
                        />
                        </Paper>
      </div>
   );
}

export default EquipmentList;
