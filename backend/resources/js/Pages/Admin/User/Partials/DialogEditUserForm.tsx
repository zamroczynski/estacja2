import * as React from "react";
import { router } from "@inertiajs/react";
import {
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Box,
    Autocomplete,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

interface DialogTitleProps {
    id: string;
    children?: React.ReactNode;
    onClose: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
}

interface DialogEditUserFormProps {
    open: boolean;
    setOpenDialog: (value: boolean) => void;
    userId: number;
    userName: string;
    setUserName: (value: string) => void;
    userEmail: string;
    setUserEmail: (value: string) => void;
    userRole: string | null;
    setUserRole: (value: string | null) => void;
    userPassword: string;
    setUserPassword: (value: string) => void;
    roles: string[];
    getUsers: () => void;
    setStatus: (status: string) => void;
    setStatusMessage: (status: string) => void;
}

const DialogEditUserForm: React.FC<DialogEditUserFormProps> = ({
    setOpenDialog,
    open,
    userId,
    userName,
    setUserName,
    userEmail,
    setUserEmail,
    userRole,
    setUserRole,
    userPassword,
    setUserPassword,
    roles,
    getUsers,
    setStatus,
    setStatusMessage,
}) => {
    const handleSave = () => {
        const newUser = {
            id: userId,
            userName: userName,
            userEmail: userEmail,
            userRole: userRole,
            userPassword: userPassword,
        };
        router.post(`/admin/user/update/${userId}`, newUser, {
            preserveState: true,
            onSuccess: () => {
                setStatus("200");
                setStatusMessage("Konto zostało zaktualizowane!");
            },
            onError: (page) => {
                setStatusMessage(page.message);
                setStatus(page.status);
            },
        });
        getUsers();
        setOpenDialog(false);
    };
    return (
        <Dialog open={open} onClose={() => setOpenDialog(false)}>
            <BootstrapDialogTitle
                id="editProductForm"
                onClose={() => setOpenDialog(false)}
            >
                Edytuj produkt
            </BootstrapDialogTitle>
            <DialogContent>
                <Box component="form">
                    <TextField
                        required
                        sx={{ marginTop: "0.5rem" }}
                        value={userName}
                        label="Imię i nazwisko"
                        fullWidth
                        onChange={(e) => setUserName(e.target.value)}
                    />
                    <TextField
                        required
                        sx={{ marginTop: "0.5rem" }}
                        value={userEmail}
                        label="Email"
                        fullWidth
                        onChange={(e) => setUserEmail(e.target.value)}
                    />
                    <TextField
                        sx={{ marginTop: "0.5rem" }}
                        value={userPassword}
                        label="hasło"
                        fullWidth
                        onChange={(e) => setUserPassword(e.target.value)}
                    />
                    <Autocomplete
                        sx={{ marginTop: "0.5rem" }}
                        value={userRole}
                        onChange={(event, newValue) => {
                            setUserRole(newValue);
                        }}
                        className="mb-2"
                        options={roles}
                        getOptionLabel={(option) => option}
                        renderOption={(params, role) => (
                            <Box component="li" {...params}>
                                {role}
                            </Box>
                        )}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Wybierz role"
                                inputProps={{
                                    ...params.inputProps,
                                    autoComplete: "new-password",
                                }}
                                required={!userRole}
                            />
                        )}
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button size="large" onClick={() => setOpenDialog(false)}>
                    Anuluj
                </Button>
                <Button size="large" onClick={() => handleSave()}>
                    Zapisz
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DialogEditUserForm;
