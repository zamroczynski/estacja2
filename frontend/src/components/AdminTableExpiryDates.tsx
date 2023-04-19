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
} from "@mui/material";
import { EditIconButton, DeleteIconButton } from ".";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";

interface AdminTableProps {
  rows: Array<{ name: string; date: string; amount: string }>;
  cols: Array<string>;
}

const AdminTableExpiryDates: React.FC<AdminTableProps> = ({ rows, cols }) => {
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");

  const filteredRows = rows.filter((row) =>
    Object.values({ name: row.name, date: row.date }).some((value) =>
      value.toLowerCase().includes(searchValue.toLowerCase())
    )
  );

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
          <DialogTitle>Edytuj</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              id="name"
              label="ID"
              fullWidth
              variant="standard"
              value="1"
              disabled
            />
            <TextField
              margin="dense"
              id="name"
              label="Produkt"
              fullWidth
              variant="standard"
              value="Fiflok"
              disabled
            />
            <LocalizationProvider
              dateAdapter={AdapterDayjs}
              adapterLocale="en-gb"
            >
              <DemoContainer components={["DatePicker"]}>
                <DatePicker label="Wybierz datę" className="mt-4" />
              </DemoContainer>
            </LocalizationProvider>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseEdit}>Anuluj</Button>
            <Button onClick={handleCloseEdit}>Zapisz</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  };

  return (
    <div>
      <TextField
        label="Szukaj"
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
                <TableCell align="left">{row.date}</TableCell>
                <TableCell align="left">{row.amount}</TableCell>
                <TableCell align="right">
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
    </div>
  );
};

export default AdminTableExpiryDates;
