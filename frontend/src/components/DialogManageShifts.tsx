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
import { EditIconButton, DialogShift } from ".";

type shiftProps = {
  id: string;
  name: string;
  timeFrom: string;
  timeTo: string;
  duration: string;
  numbersOfEmployees: string;
};

type DialogManageShiftsProps = {
  open: boolean;
  handleClose: () => void;
  rows: shiftProps[];
};

const DialogManageShifts: React.FC<DialogManageShiftsProps> = ({
  open,
  handleClose,
  rows,
}) => {
  const [shift, setShift] = React.useState<shiftProps>();
  const [addDialog, setAddDialog] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");
  const [dialogTitle, setDialogTitle] = React.useState("");
  const filteredRows = rows.filter((row) =>
    Object.values({
      name: row.name,
      duration: row.duration,
      numbersOfEmployees: row.numbersOfEmployees,
    }).some((value) => value.toLowerCase().includes(searchValue.toLowerCase()))
  );

  const handleClickEditOpen = (value: shiftProps) => {
    handleClickAddOpen();
    setShift(value);

    setDialogTitle("Edycja zmiany");
    console.log("value:", value);
    console.log("shift:", shift);
  };
  //  const handleClickEditClose = () => {
  //     setEditDialog(false);
  //   };
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
                    <EditIconButton onClick={() => handleClickEditOpen(row)} />
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
      <DialogShift
        shift={shift}
        open={addDialog}
        handleClose={handleClickAddClose}
        title={dialogTitle}
      />
    </Dialog>
  );
};

export default DialogManageShifts;