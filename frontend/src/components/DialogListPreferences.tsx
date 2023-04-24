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
  FormControl,
  Box,
  MenuItem,
} from "@mui/material";

type DialogListPreferencesProps = {
  open: boolean;
  handleClose: () => void;
  rows: Array<{
    name: string;
    shift: string;
    date: string;
    availability: boolean;
    description: string;
  }>;
};

const DialogListPreferences: React.FC<DialogListPreferencesProps> = ({
  open,
  handleClose,
  rows,
}) => {
  return (
    <Dialog open={open} onClose={handleClose} fullScreen>
      <DialogTitle>Lista preferencji</DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 2 }}>
          <TextField label="Szukaj..." variant="standard" fullWidth />
        </Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Pracownik</TableCell>
                <TableCell>Zmiana</TableCell>
                <TableCell>Data</TableCell>
                <TableCell>Dostępność</TableCell>
                <TableCell>Opis</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.name}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.shift}</TableCell>
                  <TableCell>{row.date}</TableCell>
                  <TableCell>{row.availability ? "Tak" : "Nie"}</TableCell>
                  <TableCell>{row.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Zamknij</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogListPreferences;
