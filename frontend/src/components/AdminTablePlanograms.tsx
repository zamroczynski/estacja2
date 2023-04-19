import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import MenuItem from "@mui/material/MenuItem";
import FileInput from "./FileInput";


interface AdminTableProps {
  rows: Array<{
    name: string;
    current: boolean;
    effectiveFrom: string;
    employees: string;
  }>;
  cols: Array<string>;
}

const AdminTablePlanograms: React.FC<AdminTableProps> = ({ rows, cols }) => {
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [openAdd, setOpenAdd] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");

  const filteredRows = rows.filter((row) =>
    Object.values({
      name: row.name,
      effectiveFrom: row.effectiveFrom,
      employees: row.employees,
    }).some((value) => value.toLowerCase().includes(searchValue.toLowerCase()))
  );

  const handleClickAddOpen = () => {
    setOpenAdd(true);
  };
  const handleClickEditOpen = () => {
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleClickDeleteOpen = () => {
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
  };

  const DeleteDialog: React.FC = () => {
    return (
      <div>
        <Dialog open={openDelete} onClose={handleCloseDelete}>
          <DialogTitle>Czy napewno usunąć?</DialogTitle>
          <DialogActions>
            <Button onClick={handleCloseDelete}>Anuluj</Button>
            <Button onClick={handleCloseDelete}>Usuń</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  };

  const EditDialog: React.FC = () => {
    return (
      <div>
        <Dialog open={openEdit} onClose={handleCloseEdit} fullScreen>
          <DialogTitle>Edytuj Planogram</DialogTitle>
          <DialogContent>
            <Box>
              <FormControl fullWidth>
                <TextField
                  margin="dense"
                  label="Nazwa"
                  fullWidth
                  variant="standard"
                  value="test"
                />
              </FormControl>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseEdit}>Anuluj</Button>
            <Button onClick={handleCloseEdit}>Zapisz</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  };

  const AddDialog: React.FC = () => {
    const [employeesValue, setEmployeesValue] = React.useState("");
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setEmployeesValue(event.target.value as string);
    };
    return (
      <div>
        <Dialog open={openAdd} onClose={handleCloseAdd} fullScreen>
          <DialogTitle>Dodaj planogram</DialogTitle>
          <DialogContent>
                <TextField
                  margin="dense"
                  label="Nazwa"
                  fullWidth
                  variant="outlined"
                  sx={{mb: 1}}
                />
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  adapterLocale="en-gb"
                >
                  <DemoContainer components={["DatePicker"]} sx={{mb: 1}}>
                    <DatePicker label="Obowiązuje od"/>
                  </DemoContainer>
                </LocalizationProvider>
                <TextField
                  sx={{mt: 1}}
                  select
                  label="Pracownik"
                  value={employeesValue}
                  onChange={handleChange}
                  fullWidth
                >
                  <MenuItem value={1}>Administrator</MenuItem>
                  <MenuItem value={2}>Użytkownik</MenuItem>
                </TextField>
                <FileInput />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAdd}>Anuluj</Button>
            <Button onClick={handleCloseAdd}>Zapisz</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  };

  return (
    <div>
      <Button
        className="bg-lime-700 w-full mb-3"
        onClick={handleClickAddOpen}
        variant="contained"
        fullWidth
      >
        Dodaj planogram
      </Button>
      <TextField
        label="Wyszukaj planogram"
        variant="outlined"
        fullWidth
        className="mb-4"
        onChange={(event) => setSearchValue(event.target.value)}
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {cols.map((col) => (
                <TableCell key={col} align="left">
                  {col}
                </TableCell>
              ))}
              <TableCell align="right">Opcje</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left">{row.name}</TableCell>
                <TableCell align="left">
                  {row.current ? "Tak" : "Nie"}
                </TableCell>
                <TableCell align="left">{row.effectiveFrom}</TableCell>
                <TableCell align="left">{row.employees}</TableCell>
                <TableCell align="right">
                  {row.current ? (
                    <IconButton>
                      <CheckCircleIcon color="primary" />
                    </IconButton>
                  ) : (
                    <IconButton>
                      <CheckCircleIcon />
                    </IconButton>
                  )}

                  <IconButton onClick={handleClickEditOpen}>
                    <EditIcon color="warning" />
                  </IconButton>
                  <IconButton onClick={handleClickDeleteOpen}>
                    <DeleteIcon color="error" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <EditDialog />
      <DeleteDialog />
      <AddDialog />
    </div>
  );
};

export default AdminTablePlanograms;
