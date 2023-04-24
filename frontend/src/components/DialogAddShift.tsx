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
} from "@mui/material";

type DialogAddShiftProps = {
  open: boolean;
  handleClose: () => void;
};

const DialogAddShift: React.FC<DialogAddShiftProps> = ({
  open,
  handleClose,
}) => {
  return (
    <Dialog open={open} onClose={handleClose} fullScreen>
      <DialogTitle>Nowa zmiana</DialogTitle>
      <DialogContent>
        <Box>
          <FormControl fullWidth>
            <TextField margin="normal" label="Nazwa" variant="standard" />
            <TextField
              type="time"
              margin="normal"
              helperText="Od"
              variant="standard"
            />
            <TextField
              type="time"
              margin="normal"
              helperText="Do"
              variant="standard"
            />
            <TextField
              margin="normal"
              helperText="Czas trwania"
              value="0 godzin i 0 minut"
              fullWidth
              variant="standard"
              disabled
            />
            <TextField
              margin="normal"
              label="Liczba pracowników"
              variant="standard"
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            />
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

export default DialogAddShift;
