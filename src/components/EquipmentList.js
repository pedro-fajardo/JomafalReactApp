// EquipmentList.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { TailSpin } from "react-loader-spinner";
import { styled } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import PropTypes from "prop-types";
import {
   InputGroup,
   DropdownButton,
   Dropdown,
   FormControl,
   Button,
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
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import DeleteModal from "./DeleteModal";

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

function EquipmentList({isToRefreshData, setIsToRefreshData, setIsEditModalVisible, setEditEquipmentId}) {
   const [searchTerm, setSearchTerm] = useState("");
   const [searchBy, setSearchBy] = useState("name");
   const [page, setPage] = React.useState(0);
   const [rowsPerPage, setRowsPerPage] = React.useState(10);
   const [loading, setLoading] = useState(true);
   const [equipments, setEquipments] = useState([]);
   const [showDeleteModal, setShowDeleteModal] = useState(false);
   const [equipmentToDeleteId, setEquipmentToDeleteId] = useState("");

   const getEquipmentList = async () => {
      const { data } = await axios.get('/api/equipments');
      data.filter((equipment) =>
         equipment[searchBy].toLowerCase().includes(searchTerm.toLowerCase())
      );
      setEquipments(data);
      setLoading(false);
      setIsToRefreshData(false);
   }

   useEffect(() => {
      if ( isToRefreshData ) {
         getEquipmentList();
      }
   }, [isToRefreshData]);

   var filteredEquipments = ( searchBy === "clientName" 
      ? equipments.filter((equipment) => equipment.client.name.toLowerCase().includes(searchTerm.toLowerCase()))
      : equipments.filter((equipment) => equipment[searchBy].toLowerCase().includes(searchTerm.toLowerCase()))
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

   const changeSearchBy = (searchBy) => {
      setSearchTerm("");
      setSearchBy(searchBy);
      
   };

   const onChangeSearchTerm = (searchTerm) => {
      setSearchTerm(searchTerm);
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

   const convertStatus = (status, isFromDropdown) => {
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
            return (isFromDropdown ? "Selecione o estado" : '');
      }
   };

   const viewEquipmentOnClick = (equipmentId) => {
      setEditEquipmentId(equipmentId);
      setIsEditModalVisible(true);
   };

   const deleteEquipmentOnClick = (equipmentId) => {
      setEquipmentToDeleteId(equipmentId);
      setShowDeleteModal(true);
   };

   const handleDelete = async() => {
      const response = await axios.delete('/api/equipment/' + equipmentToDeleteId + '/');

      setIsToRefreshData(true);
      setShowDeleteModal(false);
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
               <DropdownButton
                  as={InputGroup.Prepend}
                  variant="outline-secondary"
                  title={`Pesquisar por ${convertSearchText(searchBy)}`}
                  id="input-group-dropdown-1"
               >
                  <Dropdown.Item onClick={() => changeSearchBy("name")}>
                     Nome
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => changeSearchBy("productNumber")}>
                     PNC
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => changeSearchBy("serialNumber")}>
                     SN
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => changeSearchBy("clientName")}>
                     Nome do Cliente
                  </Dropdown.Item>
                  <Dropdown.Item
                     onClick={() => {
                        changeSearchBy("status");
                     }}
                  >
                     Estado
                  </Dropdown.Item>
               </DropdownButton>
               {searchBy === "status" ? (
                  <DropdownButton
                     style={{ marginLeft: "0.25%" }}
                     variant="outline-secondary"
                     title={`${convertStatus(searchTerm, true)}`}
                     id="input-group-dropdown-1"
                  >
                     <Dropdown.Item onClick={() => onChangeSearchTerm("new")}>
                        Novo
                     </Dropdown.Item>
                     <Dropdown.Item onClick={() => onChangeSearchTerm("repairing")}>
                        Em Reparação
                     </Dropdown.Item>
                     <Dropdown.Item onClick={() => onChangeSearchTerm("waiting parts")}>
                        À Espera de Peças
                     </Dropdown.Item>
                     <Dropdown.Item onClick={() => onChangeSearchTerm("repaired")}>
                        Reparado
                     </Dropdown.Item>
                  </DropdownButton>
               ) : (
                  <FormControl
                     placeholder="Pesquise..."
                     aria-label="Search"
                     aria-describedby="basic-addon1"
                     value={searchTerm}
                     onChange={(e) => onChangeSearchTerm(e.target.value)}
                     style={{ marginLeft: "0.25%" }}
                  />
               )}
            </InputGroup>


            <Paper sx={{ width: '100%', mb: 2 }}>
               <TableContainer component={Paper}>
                  <Table>
                     <TableHead>
                        <TableRow>
                           <StyledTableCell><strong>Nome</strong></StyledTableCell>
                           <StyledTableCell><strong>PNC</strong></StyledTableCell>
                           <StyledTableCell><strong>SN</strong></StyledTableCell>
                           <StyledTableCell><strong>Avaria</strong></StyledTableCell>
                           <StyledTableCell><strong>Cliente</strong></StyledTableCell>
                           <StyledTableCell><strong>Estado do Equipamento</strong></StyledTableCell>
                           <StyledTableCell><strong>Ações</strong></StyledTableCell>
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
                              <StyledTableCell title={equipment.name}>{equipment.name}</StyledTableCell>
                              <StyledTableCell>
                                 {equipment.productNumber}
                              </StyledTableCell>
                              <StyledTableCell>
                                 {equipment.serialNumber}
                              </StyledTableCell>
                              <StyledTableCell title={equipment.breakdown}>{equipment.breakdown}</StyledTableCell>
                              <StyledTableCell>{equipment.client.name}</StyledTableCell>
                              <StyledTableCell>
                                 {convertStatus(equipment.status)}
                              </StyledTableCell>
                              <StyledTableCell>
                                 <div className="actionTableCell">
                                    <div className="viewEquipmentButton">
                                       <Button onClick={() => { viewEquipmentOnClick(equipment.id) } }><VisibilityIcon></VisibilityIcon></Button>
                                    </div>
                                    <div className="deleteEquipmentButton">
                                       <Button variant="danger" onClick={() => { deleteEquipmentOnClick(equipment.id) } }><DeleteIcon></DeleteIcon></Button>
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
                  count={filteredEquipments.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  slotProps={{
                     select: {
                        inputProps: {
                           "aria-label": "Equipamentos por página",
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
            <DeleteModal showDeleteModal={showDeleteModal} handleCloseDeleteModal={() => {setShowDeleteModal(false)}} handleDelete={handleDelete}></DeleteModal>
         </div>
      );
}

export default EquipmentList;
