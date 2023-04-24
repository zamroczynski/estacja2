import React from "react";
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
  Box,
} from "@mui/material";
import { EditIconButton, DialogAddShifts } from ".";

type DialogManageShiftsProps = {
  open: boolean;
  handleClose: () => void;
  rows: Array<{
    id: number;
    name: string;
    timeFrom: string;
    timeTo: string;
    duration: string;
    numbersOfEmployees: string;
  }>;
};

const DialogManageShifts: React.FC<DialogManageShiftsProps> = ({
  open,
  handleClose,
  rows,
}) => {
  const [editDialog, setEditDialog] = React.useState(false);
  const [addDialog, setAddDialog] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");
  const filteredRows = rows.filter((row) =>
    Object.values({
      name: row.name,
      duration: row.duration,
      numbersOfEmployees: row.numbersOfEmployees,
    }).some((value) => value.toLowerCase().includes(searchValue.toLowerCase()))
  );

  const handleClickEditOpen = () => {
    setEditDialog(true);
  };
  const handleClickEditClose = () => {
    setEditDialog(false);
  };
  const handleClickAddOpen = () => {
    setAddDialog(true);
  };
  const handleClickAddClose = () => {
    setAddDialog(false);
  };

  return (
    <Dialog open={open} onClose={handleClose} fullScreen>
      <DialogTitle>Konfiguruj zmiany</DialogTitle>
      <DialogContent>
        <Button
          color="success"
          size="large"
          onClick={handleClickAddOpen}
          variant="contained"
          fullWidth
        >
          Dodaj zmianę
        </Button>
        <Box sx={{ my: 2 }}>
          <TextField
            label="Szukaj..."
            variant="standard"
            onChange={(event) => setSearchValue(event.target.value)}
            fullWidth
          />
        </Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nazwa</TableCell>
                <TableCell>Od</TableCell>
                <TableCell>Do</TableCell>
                <TableCell>Czas trwania</TableCell>
                <TableCell>Liczba pracowników</TableCell>
                <TableCell>Opcje</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.timeFrom}</TableCell>
                  <TableCell>{row.timeTo}</TableCell>
                  <TableCell>{row.duration}</TableCell>
                  <TableCell>{row.numbersOfEmployees}</TableCell>
                  <TableCell>
                    <EditIconButton onClick={handleClickEditOpen} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <DialogActions>
        <Button size="large" onClick={handleClose}>
          Zamknij
        </Button>
      </DialogActions>
      <DialogAddShifts open={addDialog} handleClose={handleClickAddClose} />
    </Dialog>
  );
};

export default DialogManageShifts;
