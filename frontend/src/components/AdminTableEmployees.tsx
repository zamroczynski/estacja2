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
  FormControl,
  IconButton,
  Box,
  MenuItem,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";

interface AdminTableProps {
  rows: Array<{
    name: string;
    email: string;
    permissions: string;
    login: string;
    phone: string;
  }>;
  cols: Array<string>;
}

const AdminTableEmployees: React.FC<AdminTableProps> = ({ rows, cols }) => {
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [openAdd, setOpenAdd] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");

  const filteredRows = rows.filter((row) =>
    Object.values({
      name: row.name,
      date: row.email,
      permissions: row.permissions,
      login: row.login,
      phone: row.phone,
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
    const [permissionValue, setPermissionValue] = React.useState("");
    const handleChange = (event: SelectChangeEvent) => {
      setPermissionValue(event.target.value as string);
    };
    return (
      <div>
        <Dialog open={openEdit} onClose={handleCloseEdit} fullScreen>
          <DialogTitle>Edytuj Dane Pracownika</DialogTitle>
          <DialogContent>
            <Box>
              <FormControl fullWidth>
                <TextField
                  margin="dense"
                  label="id"
                  fullWidth
                  variant="standard"
                  value="1"
                  disabled
                />
                <TextField
                  margin="dense"
                  label="Imię i nazwisko"
                  fullWidth
                  variant="standard"
                  value="Fiflok"
                />
                <TextField
                  margin="dense"
                  label="eMail"
                  fullWidth
                  variant="standard"
                  value="Fiflok@kuciapa.pl"
                />
                <InputLabel htmlFor="permissions">Uprawnienia</InputLabel>
                <Select
                  labelId="permissions"
                  label="Uprawnienia"
                  value={permissionValue}
                  onChange={handleChange}
                >
                  <MenuItem value={1}>Administrator</MenuItem>
                  <MenuItem value={2}>Użytkownik</MenuItem>
                </Select>
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
    const [permissionValue, setPermissionValue] = React.useState("");
    const handleChange = (event: SelectChangeEvent) => {
      setPermissionValue(event.target.value as string);
    };
    return (
      <div>
        <Dialog open={openAdd} onClose={handleCloseAdd} fullScreen>
          <DialogTitle>Dodaj Pracownika</DialogTitle>
          <DialogContent>
            <FormControl fullWidth>
              <TextField select label="Uprawnienia" value={permissionValue}>
                <MenuItem value={1}>Administrator</MenuItem>
                <MenuItem value={2}>Użytkownik</MenuItem>
              </TextField>
              <TextField
                margin="dense"
                label="Login"
                variant="outlined"
                value=""
              />
              <TextField
                margin="dense"
                label="Hasło"
                variant="outlined"
                value=""
              />
              <TextField
                margin="dense"
                label="Imię i nazwisko"
                variant="outlined"
                value=""
              />
              <TextField
                margin="dense"
                label="eMail"
                variant="outlined"
                value=""
              />
              <TextField
                margin="dense"
                label="Telefon"
                variant="outlined"
                value=""
              />
            </FormControl>
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
        Dodaj pracownika
      </Button>
      <TextField
        label="Wyszukaj pracownika"
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
                <TableCell align="left">{row.email}</TableCell>
                <TableCell align="left">{row.permissions}</TableCell>
                <TableCell align="left">{row.login}</TableCell>
                <TableCell align="left">{row.phone}</TableCell>
                <TableCell align="right">
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

export default AdminTableEmployees;
