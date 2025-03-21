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
   Alert,
   Card,
} from "react-bootstrap";
import {
   Table,
   TableBody,
   TableCell,
   TableContainer,
   TableHead,
   TableRow,
   Paper,
   Tooltip,
   Fade,
   Snackbar,
   Chip,
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
import RefreshIcon from "@mui/icons-material/Refresh";
import SearchIcon from "@mui/icons-material/Search";
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
            size="small"
            sx={{ color: '#5B85AA' }}
         >
            {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
         </IconButton>
         <IconButton
            onClick={handleBackButtonClick}
            disabled={page === 0}
            aria-label="previous page"
            size="small"
            sx={{ color: '#5B85AA' }}
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
            size="small"
            sx={{ color: '#5B85AA' }}
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
            size="small"
            sx={{ color: '#5B85AA' }}
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

function EquipmentList({ isToRefreshData, setIsToRefreshData, setIsEditModalVisible, setEditEquipmentId }) {
   const [searchTerm, setSearchTerm] = useState("");
   const [searchBy, setSearchBy] = useState("name");
   const [page, setPage] = React.useState(0);
   const [rowsPerPage, setRowsPerPage] = React.useState(10);
   const [loading, setLoading] = useState(true);
   const [actionLoading, setActionLoading] = useState(false);
   const [equipments, setEquipments] = useState([]);
   const [showDeleteModal, setShowDeleteModal] = useState(false);
   const [equipmentToDeleteId, setEquipmentToDeleteId] = useState("");
   const [error, setError] = useState(null);
   const [snackbar, setSnackbar] = useState({
      open: false,
      message: "",
      severity: "success"
   });

   const getEquipmentList = async () => {
      setLoading(true);
      setError(null);
      try {
         const { data } = await axios.get('/api/equipments');
         data.filter((equipment) =>
            equipment[searchBy]?.toLowerCase().includes(searchTerm.toLowerCase())
         );
         data.sort((a, b) => (b.id - a.id));
         setEquipments(data);
      } catch (err) {
         console.error("Error fetching equipment list:", err);
         setError("Não foi possível carregar a lista de equipamentos. Por favor, tente novamente.");
         setEquipments([]);
      } finally {
         setLoading(false);
         setIsToRefreshData(false);
      }
   }

   useEffect(() => {
      if (isToRefreshData) {
         getEquipmentList();
      }
   }, [isToRefreshData, getEquipmentList]);

   useEffect(() => {
      getEquipmentList();
   }, []);

   const refreshList = () => {
      setIsToRefreshData(true);
   };

   var filteredEquipments = searchBy === "clientName"
      ? equipments.filter((equipment) => equipment.client?.name?.toLowerCase().includes(searchTerm.toLowerCase()))
      : equipments.filter((equipment) => equipment[searchBy]?.toLowerCase().includes(searchTerm.toLowerCase()));

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
         case "recycle":
            return "Reciclagem";
         case "scrap":
            return "Sucata";
         default:
            return (isFromDropdown ? "Selecione o estado" : '');
      }
   };

   const getStatusColor = (status) => {
      switch (status) {
         case "new":
            return "#3A86FF";
         case "repairing":
            return "#FFB703";
         case "waiting parts":
            return "#FB8500";
         case "repaired":
            return "#52B788";
         case "recycle":
            return "#8338EC";
         case "scrap":
            return "#E63946";
         default:
            return "#6C757D";
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

   const handleDelete = async () => {
      setActionLoading(true);
      try {
         await axios.delete('/api/equipment/' + equipmentToDeleteId + '/');
         setSnackbar({
            open: true,
            message: "Equipamento excluído com sucesso!",
            severity: "success"
         });
         setIsToRefreshData(true);
      } catch (err) {
         console.error("Error deleting equipment:", err);
         setSnackbar({
            open: true,
            message: "Erro ao excluir equipamento. Por favor, tente novamente.",
            severity: "error"
         });
      } finally {
         setActionLoading(false);
         setShowDeleteModal(false);
      }
   };

   const handleCloseSnackbar = () => {
      setSnackbar({ ...snackbar, open: false });
   };

   const StyledTableCell = styled(TableCell)(({ theme }) => ({
      [`&.${tableCellClasses.head}`]: {
         fontSize: 15,
         fontWeight: 600,
         backgroundColor: "#2E5077",
         color: theme.palette.common.white,
         padding: "16px",
         borderBottom: "none",
         position: "relative",
         "&:after": {
            content: '""',
            position: "absolute",
            bottom: 0,
            right: 0,
            width: "1px",
            height: "60%",
            backgroundColor: "rgba(255, 255, 255, 0.12)",
         },
         "&:last-of-type:after": {
            display: "none",
         }
      },
      [`&.${tableCellClasses.body}`]: {
         fontSize: 14,
         color: "#495057",
         padding: "14px 16px",
         borderBottom: "1px solid #E9ECEF",
         maxWidth: 180,
         overflow: "hidden",
         textOverflow: "ellipsis",
         whiteSpace: "nowrap",
         position: "relative",
         transition: "all 0.2s ease",
      },
   }));

   const StyledTableRow = styled(TableRow)(({ theme }) => ({
      "&:nth-of-type(odd)": {
         backgroundColor: "rgba(248, 249, 250, 0.8)",
      },
      "&:nth-of-type(even)": {
         backgroundColor: "#ffffff",
      },
      "&:hover": {
         backgroundColor: "rgba(91, 133, 170, 0.08)",
         boxShadow: "inset 0 0 0 1px rgba(91, 133, 170, 0.2)",
         "& .MuiTableCell-body": {
            color: "#2E5077",
         },
         cursor: "pointer",
         transition: "all 0.2s ease",
      },
      "&:last-child td, &:last-child th": {
         border: 0,
      },
   }));

   if (loading)
      return (
         <div style={{
            position: "absolute",
            height: "100vh",
            width: "100vw",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#f8f9fa"
         }}>
            <TailSpin color="#5B85AA" radius={"8px"} />
            <p style={{ marginTop: "20px", fontWeight: 500, color: "#495057" }}>Carregando equipamentos...</p>
         </div>
      );

   return (
      <div style={{ padding: "0px 20px 20px 20px", backgroundColor: "white", minHeight: "100vh" }}>
         <Card className="shadow-sm" style={{ borderRadius: "8px", border: "none", marginBottom: "24px" }}>
            <Card.Body>
               <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                  <h2 style={{ fontSize: "24px", fontWeight: "600", color: "#2E5077", margin: 0 }}>Lista de Equipamentos</h2>
                  <Button
                     variant="outline-primary"
                     onClick={refreshList}
                     disabled={isToRefreshData}
                     style={{
                        borderRadius: "6px",
                        borderColor: "#5B85AA",
                        color: "#5B85AA",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        padding: "8px 16px",
                        fontWeight: 500,
                        boxShadow: "none"
                     }}
                  >
                     <RefreshIcon fontSize="small" /> Atualizar Lista
                  </Button>
               </div>

               {error && (
                  <Alert
                     variant="danger"
                     className="mb-4"
                     onClose={() => setError(null)}
                     dismissible
                     style={{ borderRadius: "6px" }}
                  >
                     {error}
                  </Alert>
               )}

               <div style={{
                  backgroundColor: "white",
                  padding: "16px",
                  borderRadius: "8px",
                  marginBottom: "16px",
                  border: "1px solid #E9ECEF"
               }}>
                  <InputGroup>
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
                           <Dropdown.Item onClick={() => onChangeSearchTerm("scrap")}>
                              Sucata
                           </Dropdown.Item>
                           <Dropdown.Item onClick={() => onChangeSearchTerm("recycle")}>
                              Reciclagem
                           </Dropdown.Item>
                        </DropdownButton>
                     ) : (
                        <>
                           <FormControl
                              placeholder="Pesquise..."
                              aria-label="Search"
                              aria-describedby="basic-addon1"
                              value={searchTerm}
                              onChange={(e) => onChangeSearchTerm(e.target.value)}
                              style={{
                                 marginLeft: "0.25%",
                                 borderTopRightRadius: 0,
                                 borderBottomRightRadius: 0
                              }}
                           />
                           <Button
                              variant="outline-secondary"
                              style={{
                                 borderTopLeftRadius: 0,
                                 borderBottomLeftRadius: 0,
                                 borderLeft: 0
                              }}
                           >
                              <SearchIcon fontSize="small" />
                           </Button>
                        </>
                     )}
                  </InputGroup>
               </div>
            </Card.Body>
         </Card>

         <Paper sx={{
            width: '100%',
            mb: 4,
            overflow: 'hidden',
            borderRadius: '12px',
            boxShadow: '0 3px 12px rgba(0, 0, 0, 0.08)',
            border: '1px solid #E9ECEF',
         }}>
            <TableContainer sx={{ maxHeight: 'calc(100vh - 280px)' }}>
               <Table stickyHeader>
                  <TableHead>
                     <TableRow>
                        <StyledTableCell sx={{ minWidth: 180 }}>Nome</StyledTableCell>
                        <StyledTableCell sx={{ minWidth: 120 }}>PNC</StyledTableCell>
                        <StyledTableCell sx={{ minWidth: 140 }}>SN</StyledTableCell>
                        <StyledTableCell sx={{ minWidth: 220 }}>Avaria</StyledTableCell>
                        <StyledTableCell sx={{ minWidth: 160 }}>Cliente</StyledTableCell>
                        <StyledTableCell sx={{ minWidth: 140 }}>Estado</StyledTableCell>
                        <StyledTableCell align="center" sx={{ minWidth: 100 }}>Ações</StyledTableCell>
                     </TableRow>
                  </TableHead>
                  <TableBody>
                     {filteredEquipments.length === 0 ? (
                        <TableRow>
                           <TableCell colSpan={7} style={{ textAlign: "center", padding: "60px 40px" }}>
                              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                                 <img
                                    src="https://cdn-icons-png.flaticon.com/512/7486/7486754.png"
                                    alt="No data"
                                    style={{ width: "80px", opacity: 0.6, marginBottom: "16px" }}
                                 />
                                 <p style={{ fontSize: "16px", color: "#6c757d", marginBottom: "8px" }}>
                                    Nenhum equipamento encontrado com os critérios de pesquisa atuais.
                                 </p>
                                 {searchTerm && (
                                    <Button
                                       variant="outline-secondary"
                                       onClick={() => setSearchTerm("")}
                                       style={{ borderRadius: "6px" }}
                                    >
                                       Limpar Pesquisa
                                    </Button>
                                 )}
                              </Box>
                           </TableCell>
                        </TableRow>
                     ) : (
                        (rowsPerPage > 0
                           ? filteredEquipments.slice(
                              page * rowsPerPage,
                              page * rowsPerPage + rowsPerPage
                           )
                           : filteredEquipments
                        ).map((equipment) => (
                           <StyledTableRow
                              key={equipment.id}
                              onClick={() => viewEquipmentOnClick(equipment.id)}
                           >
                              <Tooltip title={equipment.name || ""} TransitionComponent={Fade} arrow placement="top-start" followCursor>
                                 <StyledTableCell>
                                    <span style={{ fontWeight: 500, color: "#2E5077" }}>{equipment.name || "-"}</span>
                                 </StyledTableCell>
                              </Tooltip>
                              <Tooltip title={equipment.productNumber || ""} TransitionComponent={Fade} arrow placement="top-start" followCursor>
                                 <StyledTableCell>
                                    {equipment.productNumber || "-"}
                                 </StyledTableCell>
                              </Tooltip>
                              <Tooltip title={equipment.serialNumber || ""} TransitionComponent={Fade} arrow placement="top-start" followCursor>
                                 <StyledTableCell>
                                    {equipment.serialNumber || "-"}
                                 </StyledTableCell>
                              </Tooltip>
                              <Tooltip title={equipment.breakdown || ""} TransitionComponent={Fade} arrow placement="top-start" followCursor>
                                 <StyledTableCell>{equipment.breakdown || "-"}</StyledTableCell>
                              </Tooltip>
                              <Tooltip title={equipment.client?.name || ""} TransitionComponent={Fade} arrow placement="top-start" followCursor>
                                 <StyledTableCell>{equipment.client?.name || "-"}</StyledTableCell>
                              </Tooltip>
                              <StyledTableCell>
                                 <Chip
                                    label={convertStatus(equipment.status) || "-"}
                                    size="small"
                                    sx={{
                                       bgcolor: getStatusColor(equipment.status),
                                       color: 'white',
                                       fontWeight: 500,
                                       fontSize: '0.75rem',
                                       height: '24px',
                                       borderRadius: '4px',
                                       boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                                       '&:hover': {
                                          opacity: 0.9
                                       }
                                    }}
                                 />
                              </StyledTableCell>
                              <StyledTableCell align="center" onClick={(e) => e.stopPropagation()}>
                                 <Box sx={{
                                    display: "flex",
                                    gap: "8px",
                                    justifyContent: "center",
                                    '& .MuiButtonBase-root': {
                                       transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                                       '&:hover': {
                                          transform: 'translateY(-2px)',
                                          boxShadow: '0 4px 8px rgba(0,0,0,0.1) !important'
                                       }
                                    }
                                 }}>
                                    <Tooltip title="Ver detalhes" arrow placement="top">
                                       <Button
                                          variant="primary"
                                          onClick={(e) => {
                                             e.stopPropagation();
                                             viewEquipmentOnClick(equipment.id);
                                          }}
                                          style={{
                                             padding: "6px 8px",
                                             backgroundColor: "#5B85AA",
                                             borderColor: "#5B85AA",
                                             borderRadius: "6px",
                                             boxShadow: '0 2px 4px rgba(91,133,170,0.2)'
                                          }}
                                       >
                                          <VisibilityIcon fontSize="small" />
                                       </Button>
                                    </Tooltip>
                                    <Tooltip title="Eliminar equipamento" arrow placement="top">
                                       <Button
                                          variant="danger"
                                          onClick={(e) => {
                                             e.stopPropagation();
                                             deleteEquipmentOnClick(equipment.id);
                                          }}
                                          style={{
                                             padding: "6px 8px",
                                             backgroundColor: "#E63946",
                                             borderColor: "#E63946",
                                             borderRadius: "6px",
                                             boxShadow: '0 2px 4px rgba(230,57,70,0.2)'
                                          }}
                                       >
                                          <DeleteIcon fontSize="small" />
                                       </Button>
                                    </Tooltip>
                                 </Box>
                              </StyledTableCell>
                           </StyledTableRow>
                        ))
                     )}
                     {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                           <TableCell colSpan={7} />
                        </TableRow>
                     )}
                  </TableBody>
               </Table>
            </TableContainer>
            <TablePagination
               rowsPerPageOptions={[
                  10,
                  25,
                  50,
                  { label: "Todos", value: -1 },
               ]}
               component="div"
               count={filteredEquipments.length}
               rowsPerPage={rowsPerPage}
               page={page}
               labelRowsPerPage="Equipamentos por página:"
               labelDisplayedRows={({ from, to, count }) =>
                  `${from}-${to} de ${count !== -1 ? count : `mais de ${to}`}`
               }
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
                  borderTop: '1px solid #E9ECEF',
                  backgroundColor: '#fafafa',
                  ".MuiTablePagination-displayedRows": {
                     marginTop: "1em",
                     marginBottom: "1em",
                     fontWeight: 500,
                     color: "#495057"
                  },
                  ".MuiTablePagination-selectLabel": {
                     marginTop: "1em",
                     marginBottom: "1em",
                     fontWeight: 500,
                     color: "#495057"
                  },
                  ".MuiTablePagination-select": {
                     fontWeight: 500,
                     color: "#495057"
                  },
                  padding: "12px 16px"
               }}
            />
         </Paper>

         <DeleteModal
            showDeleteModal={showDeleteModal}
            handleCloseDeleteModal={() => { setShowDeleteModal(false) }}
            handleDelete={handleDelete}
            isLoading={actionLoading}
         />

         <Snackbar
            open={snackbar.open}
            autoHideDuration={5000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
         >
            <Alert
               onClose={handleCloseSnackbar}
               severity={snackbar.severity}
               variant="filled"
               sx={{
                  width: '100%',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                  borderRadius: '6px'
               }}
            >
               {snackbar.message}
            </Alert>
         </Snackbar>
      </div>
   );
}

export default EquipmentList;
