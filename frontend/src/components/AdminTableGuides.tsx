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
} from "@mui/material";
import { EditIconButton, DeleteIconButton, CheckCircleIconButton } from ".";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface AdminTableProps {
  rows: Array<{
    name: string;
    createdAt: string;
    updatedAt: string;
    public: boolean;
    body: string;
  }>;
  cols: Array<string>;
}

const AdminTableGuides: React.FC<AdminTableProps> = ({ rows, cols }) => {
  const [openEdit, setOpenEdit] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [openAdd, setOpenAdd] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");

  const filteredRows = rows.filter((row) =>
    Object.values({
      name: row.name,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
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
    const [text, setText] = React.useState("");
    return (
      <div>
        <Dialog open={openEdit} onClose={handleCloseEdit} fullScreen>
          <DialogTitle>Edytuj Instrukcje</DialogTitle>
          <DialogContent>
            <Box>
              <FormControl fullWidth>
                <TextField
                  margin="dense"
                  label="Tytuł"
                  fullWidth
                  variant="standard"
                  value="test"
                />
                <ReactQuill value={text} onChange={setText} />
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
    const [text, setText] = React.useState("");
    return (
      <div>
        <Dialog open={openAdd} onClose={handleCloseAdd} fullScreen>
          <DialogTitle>Nowa Instrukcja</DialogTitle>
          <DialogContent>
            <Box>
              <FormControl fullWidth>
                <TextField
                  margin="dense"
                  label="Tytuł"
                  fullWidth
                  variant="standard"
                />
                <ReactQuill value={text} onChange={setText} />
              </FormControl>
            </Box>
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
        Nowa instrukcja
      </Button>
      <TextField
        label="Wyszukaj instrukcje"
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
                <TableCell align="left">{row.createdAt}</TableCell>
                <TableCell align="left">{row.updatedAt}</TableCell>
                <TableCell align="left">{row.public ? "Tak" : "Nie"}</TableCell>
                <TableCell align="right">
                  <CheckCircleIconButton
                    value={row.public}
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

export default AdminTableGuides;
