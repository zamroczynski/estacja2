import React from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  FormControl,
  Input,
} from "@mui/material";

type DialogAddShiftProps = {
  open: boolean;
  handleClose: () => void;
  title?: string;
  shift: {
    id: string;
    name: string;
    timeFrom: string;
    timeTo: string;
    duration: string;
    numbersOfEmployees: string;
  };
};

const DialogShift: React.FC<DialogAddShiftProps> = ({
  open,
  handleClose,
  title = "Nowa Zmiana",
  shift = {
    id: "",
    name: "",
    timeFrom: "",
    timeTo: "",
    duration: "0 godzin i 0 minut",
    numbersOfEmployees: "",
  },
}) => {
  const [id, setId] = React.useState(shift.id);
  const [name, setName] = React.useState(shift.name);
  const [timeFrom, setTimeFrom] = React.useState(shift.timeFrom);
  const [timeTo, setTimeTo] = React.useState(shift.timeTo);
  const [duration, setDuration] = React.useState(shift.duration);
  const [numbersOfEmployees, setNumbersOfEmployees] = React.useState(
    shift.numbersOfEmployees
  );

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleTimeFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTimeFrom(e.target.value);
  };

  const handleTimeToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTimeTo(e.target.value);
  };

  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDuration(e.target.value);
  };

  const handleNumbersOfEmployeesChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNumbersOfEmployees(e.target.value);
  };

  return (
    <Dialog open={open} onClose={handleClose} fullScreen>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Box>
          <FormControl fullWidth>
            <TextField
              margin="normal"
              label="Nazwa"
              value={name}
              variant="standard"
              onChange={handleNameChange}
            />
            <TextField
              type="time"
              margin="normal"
              helperText="Od"
              variant="standard"
              value={timeFrom}
              onChange={handleTimeFromChange}
            />
            <TextField
              type="time"
              margin="normal"
              helperText="Do"
              variant="standard"
              value={timeTo}
              onChange={handleTimeToChange}
            />
            <TextField
              margin="normal"
              helperText="Czas trwania"
              value={duration}
              fullWidth
              variant="standard"
              disabled
            />
            <TextField
              margin="normal"
              label="Liczba pracowników"
              value={numbersOfEmployees}
              variant="standard"
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              onChange={handleNumbersOfEmployeesChange}
            />
            <Input type="hidden" value={id} sx={{ display: "none" }} />
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button size="large" onClick={handleClose}>
          Zamknij
        </Button>
        <Button size="large" onClick={handleClose}>
          Zapisz
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogShift;
