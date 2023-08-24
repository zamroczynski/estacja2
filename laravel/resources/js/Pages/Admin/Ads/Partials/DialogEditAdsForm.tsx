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
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    SelectChangeEvent,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import "dayjs/locale/en-gb";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import productProps from "@/types/productProps";
import prorityProps from "@/types/prorityProps";

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

interface DialogEditAdsFormProps {
    open: boolean;
    setOpenDialog: (value: boolean) => void;
    editAdsId: number;
    setTitle: (value: string) => void;
    title: string;
    setDateValue: (value: string | null) => void;
    dateValue: any;
    setDescription: (value: string) => void;
    description: string;
    setSelectedPrority: (value: string) => void;
    selectedPrority: string;
    priorities: prorityProps[];
    setStatus: (status: string) => void;
    setStatusMessage: (status: string) => void;
    http: any;
    getAds: () => void;
    setLoading: (value: boolean) => void;
}

const DialogEditAdsForm: React.FC<DialogEditAdsFormProps> = ({
    open,
    setOpenDialog,
    editAdsId,
    setTitle,
    title,
    setDateValue,
    dateValue,
    setDescription,
    description,
    setSelectedPrority,
    selectedPrority,
    priorities,
    setStatus,
    setStatusMessage,
    http,
    getAds,
    setLoading,
}) => {
    const handleSave = () => {
        setLoading(true);
        const prority_id = selectedPrority;
        const newAds = {
            id: editAdsId,
            title: title,
            description: description,
            prority: prority_id,
            validUntil: dateValue,
        };
        router.post(`/admin/ads/update/${editAdsId}`, newAds, {
            preserveState: true,
            onSuccess: () => {
                setStatus("200");
                setStatusMessage("Ogłoszenie zostało zmienione!");
            },
            onError: (page) => {
                setStatusMessage(page.message);
                setStatus(page.status);
            },
        });
        getAds();
        setOpenDialog(false);
        setLoading(false);
    };
    const handleSelectChange = (event: SelectChangeEvent) => {
        setSelectedPrority(event.target.value as string);
    };
    return (
        <Dialog open={open} onClose={() => setOpenDialog(false)} fullScreen>
            <BootstrapDialogTitle
                id="editExpiryDateForm"
                onClose={() => setOpenDialog(false)}
            >
                Edytuj ogłoszenie
            </BootstrapDialogTitle>
            <DialogContent>
                <Box component="form">
                    <TextField
                        fullWidth
                        sx={{ marginTop: "0.5rem", marginBottom: "1.0rem" }}
                        label="Tytuł"
                        value={title}
                        required
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <ReactQuill value={description} onChange={setDescription} />
                    <FormControl
                        fullWidth
                        sx={{ marginTop: "1.0rem", marginBottom: "1.0rem" }}
                    >
                        <InputLabel id="prority-label">Priorytet</InputLabel>
                        <Select
                            labelId="prority-label"
                            id="prority"
                            onChange={handleSelectChange}
                            required
                            value={selectedPrority}
                        >
                            {priorities.map((row) => (
                                <MenuItem value={row.id}>{row.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <LocalizationProvider
                        dateAdapter={AdapterDayjs}
                        adapterLocale={dayjs.locale("en-gb")}
                    >
                        <DemoContainer components={["DatePicker"]}>
                            <DatePicker
                                label="Ogłoszenie ważne do"
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

export default DialogEditAdsForm;
