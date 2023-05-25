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
  Box,
  MenuItem,
  Select,
  InputLabel,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import { useFormik } from "formik";
import axios, { AxiosError } from "axios";
import { EditIconButton, DeleteIconButton, DeleteDialog } from ".";
import { useAuthHeader, useSignOut } from "react-auth-kit";
import { redirect } from "react-router-dom";

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
  const signOut = useSignOut();
  const authHeader = useAuthHeader();
  const axiosConfig = {
    headers: { Authorization: authHeader() },
  };
  const API_URL: string = import.meta.env.VITE_API_URL;
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
    const [error, setError] = React.useState("");

    const onSubmit = async (values: any) => {
      setError("");
      try {
        const respone = await axios.post(
          API_URL + "register",
          values,
          axiosConfig
        );
      } catch (err) {
        if (err && err instanceof AxiosError) {
          setError(err.response?.data.message);
          if (err.response?.status === 401) {
            signOut();
            return redirect("/");
          }
        } else if (err instanceof Error) setError(err.message);
        console.error("Error: ", err);
      }
      handleCloseAdd();
    };

    const formik = useFormik({
      initialValues: {
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        role: [],
        email: "",
        phone: "",
      },
      onSubmit,
    });

    return (
      <div>
        <Dialog open={openAdd} onClose={handleCloseAdd} fullScreen>
          <DialogTitle>Dodaj Pracownika</DialogTitle>
          <Box component="form" onSubmit={formik.handleSubmit}>
            <DialogContent>
              <FormControl fullWidth>
                <TextField
                  margin="dense"
                  label="Login"
                  variant="outlined"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  id="username"
                  name="username"
                  required
                />
                <TextField
                  margin="dense"
                  label="Hasło"
                  variant="outlined"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  id="password"
                  name="password"
                  required
                />
                <TextField
                  margin="dense"
                  label="Imię"
                  variant="outlined"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  id="firstName"
                  name="firstName"
                  required
                />
                <TextField
                  margin="dense"
                  label="Nazwisko"
                  variant="outlined"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  id="lastName"
                  name="lastName"
                  required
                />
                <TextField
                  margin="dense"
                  label="eMail"
                  variant="outlined"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  id="email"
                  name="email"
                />
                <TextField
                  margin="dense"
                  label="Telefon"
                  variant="outlined"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  id="phone"
                  name="phone"
                />
              </FormControl>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseAdd}>Anuluj</Button>
              <Button type="submit">Zapisz</Button>
            </DialogActions>
          </Box>
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
                  <EditIconButton onClick={handleClickEditOpen} />
                  <DeleteIconButton onClick={handleClickDeleteOpen} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <EditDialog />
      <DeleteDialog
        openDelete={openDelete}
        handleCloseDelete={handleCloseDelete}
      />
      <AddDialog />
    </div>
  );
};

export default AdminTableEmployees;
