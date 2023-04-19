import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Typography,
} from "@mui/material";
import { EditIconButton, DeleteIconButton, CheckCircleIconButton } from ".";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface AdminTableProps {
  rows: Array<{
    id: number;
    name: string;
    description: string;
    employees: string;
    deadline: string;
    done: boolean;
  }>;
  cols: Array<string>;
}

const AdminTableTasks: React.FC<AdminTableProps> = ({ rows, cols }) => {
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [openAdd, setOpenAdd] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");

  const filteredRows = rows.filter((row) =>
    Object.values({
      name: row.name,
      employees: row.employees,
      deadline: row.deadline,
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
    const [employeesValue, setEmployeesValue] = React.useState("");
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setEmployeesValue(event.target.value as string);
    };
    const [text, setText] = React.useState("");
    return (
      <div>
        <Dialog open={openEdit} onClose={handleCloseEdit} fullScreen>
          <DialogTitle>Edytuj Zadanie</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              label="Nazwa"
              fullWidth
              variant="outlined"
              sx={{ mb: 1 }}
            />
            <LocalizationProvider
              dateAdapter={AdapterDayjs}
              adapterLocale="en-gb"
            >
              <DemoContainer components={["DatePicker"]} sx={{ mb: 1 }}>
                <DatePicker label="Termin wykonania" />
              </DemoContainer>
            </LocalizationProvider>
            <TextField
              sx={{ mt: 1, mb: 2 }}
              select
              label="Pracownik"
              value={employeesValue}
              onChange={handleChange}
              fullWidth
            >
              <MenuItem value={1}>Administrator</MenuItem>
              <MenuItem value={2}>Użytkownik</MenuItem>
            </TextField>
            <Typography>Opis zadania:</Typography>
            <ReactQuill value={text} onChange={setText} />
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
    const [text, setText] = React.useState("");
    return (
      <div>
        <Dialog open={openAdd} onClose={handleCloseAdd} fullScreen>
          <DialogTitle>Nowe Zadanie</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              label="Nazwa"
              fullWidth
              variant="outlined"
              sx={{ mb: 1 }}
            />
            <LocalizationProvider
              dateAdapter={AdapterDayjs}
              adapterLocale="en-gb"
            >
              <DemoContainer components={["DatePicker"]} sx={{ mb: 1 }}>
                <DatePicker label="Termin wykonania" />
              </DemoContainer>
            </LocalizationProvider>
            <TextField
              sx={{ mt: 1, mb: 2 }}
              select
              label="Pracownik"
              value={employeesValue}
              onChange={handleChange}
              fullWidth
            >
              <MenuItem value={1}>Administrator</MenuItem>
              <MenuItem value={2}>Użytkownik</MenuItem>
            </TextField>
            <Typography>Opis zadania:</Typography>
            <ReactQuill value={text} onChange={setText} />
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
        Nowe Zadanie
      </Button>
      <TextField
        label="Wyszukaj zadanie"
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
                <TableCell align="left">{row.employees}</TableCell>
                <TableCell align="left">{row.deadline}</TableCell>
                <TableCell align="left">{row.done ? "Tak" : "Nie"}</TableCell>
                <TableCell align="right">
                  <CheckCircleIconButton
                    value={row.done}
                    onClick={handleClickDeleteOpen}
                  />
                  <EditIconButton onClick={handleClickEditOpen} />
                  <DeleteIconButton onClick={handleClickDeleteOpen} />
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

export default AdminTableTasks;
