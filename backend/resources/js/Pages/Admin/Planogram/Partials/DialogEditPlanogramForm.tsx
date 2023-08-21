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
} from "@mui/material";
import { UploadFile, Close } from "@mui/icons-material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import "dayjs/locale/en-gb";
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

interface DialogEditPlanogramFormProps {
    open: boolean;
    setOpenDialog: (value: boolean) => void;
    editPlanogramId: number;
    setName: (value: string) => void;
    name: string;
    setDateValue: (value: string | null) => void;
    dateValue: any;
    setComments: (value: string) => void;
    comments: string;
    setStatus: (status: string) => void;
    setStatusMessage: (status: string) => void;
    http: any;
    getPlanogram: () => void;
    setLoading: (value: boolean) => void;
}

const DialogEditPlanogramForm: React.FC<DialogEditPlanogramFormProps> = ({
    open,
    setOpenDialog,
    editPlanogramId,
    setName,
    name,
    setDateValue,
    dateValue,
    setComments,
    comments,
    setStatus,
    setStatusMessage,
    http,
    getPlanogram,
    setLoading,
}) => {
    const [file, setFile] = React.useState<File>();
    const handleClearFile = () => {
        setFile(undefined);
    };
    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };
    const handleSave = () => {
        setLoading(true);
        const newPlanogram = {
            id: editPlanogramId,
            name: name,
            comments: comments,
            valid_from: dateValue.format("YYYY-MM-DD"),
            file: file,
        };
        router.post(
            `/admin/planogram/update/${editPlanogramId}`,
            newPlanogram,
            {
                preserveState: true,
                onSuccess: () => {
                    setStatus("200");
                    setStatusMessage("Planogram został zmieniony!");
                },
                onError: (page) => {
                    setStatusMessage(page.message);
                    setStatus(page.status);
                },
            }
        );
        getPlanogram();
        setOpenDialog(false);
        setLoading(false);
    };
    return (
        <Dialog open={open} onClose={() => setOpenDialog(false)} fullScreen>
            <BootstrapDialogTitle
                id="editExpiryDateForm"
                onClose={() => setOpenDialog(false)}
            >
                Edytuj Planogram
            </BootstrapDialogTitle>
            <DialogContent>
                <Box component="form">
                    <TextField
                        fullWidth
                        sx={{ marginTop: "0.5rem" }}
                        label="Nazwa"
                        value={name}
                        required
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        sx={{ marginTop: "0.5rem", marginBottom: "0.5rem" }}
                        label="Komentarz"
                        value={comments}
                        required
                        onChange={(e) => setComments(e.target.value)}
                    />
                    <Button
                        component="label"
                        startIcon={<UploadFile />}
                        sx={{ marginRight: "1rem", marginBottom: "1rem" }}
                    >
                        Dodaj plik
                        <input type="file" hidden onChange={handleFileUpload} />
                    </Button>
                    {file && (
                        <div className="mb-2">
                            <Button disabled variant="outlined">
                                {file.name}
                            </Button>
                            <Button
                                startIcon={<Close />}
                                onClick={handleClearFile}
                            />
                        </div>
                    )}
                    <LocalizationProvider
                        dateAdapter={AdapterDayjs}
                        adapterLocale={dayjs.locale("en-gb")}
                    >
                        <DemoContainer components={["DatePicker"]}>
                            <DatePicker
                                label="Planogram ważny od"
                                value={dateValue}
                                slotProps={{ textField: { fullWidth: true } }}
                                onChange={(e) => setDateValue(e)}
                            />
                        </DemoContainer>
                    </LocalizationProvider>
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

export default DialogEditPlanogramForm;
