import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";

type DeleteDialogProps = {
  handleCloseDelete: () => void;
  openDelete: boolean;
};

const DeleteDialog: React.FC<DeleteDialogProps> = ({
  openDelete,
  handleCloseDelete,
}) => {
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

export default DeleteDialog;
