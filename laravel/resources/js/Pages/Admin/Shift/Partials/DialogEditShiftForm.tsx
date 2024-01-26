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
import { TimeField, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs, { Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import "dayjs/locale/en-gb";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import shiftProps from "@/types/shiftProps";

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

interface DialogEditShiftFormProps {
    open: boolean;
    setOpenDialog: (value: boolean) => void;
    shift: shiftProps | undefined | null;
    setLoading: (value: boolean) => void;
    setStatus: (status: string) => void;
    setStatusMessage: (status: string) => void;
    getShift: () => void;
    selectedShiftId: number;
    selectedShiftName: string | null;
    selectedShiftTimeStart: any;
    selectedShiftTimeStop: any;
    setSelectedShiftName: (value: string | null) => void;
    setSelectedShiftTimeStart: (value: string | null) => void;
    setSelectedShiftTimeStop: (value: string | null) => void;
}

const DialogEditShiftForm: React.FC<DialogEditShiftFormProps> = ({
    open,
    setOpenDialog,
    shift,
    setLoading,
    setStatus,
    setStatusMessage,
    getShift,
    selectedShiftId,
    selectedShiftName,
    selectedShiftTimeStart,
    selectedShiftTimeStop,
    setSelectedShiftName,
    setSelectedShiftTimeStart,
    setSelectedShiftTimeStop,
}) => {
    // const [shiftName, setShiftName] = React.useState<string | undefined>(
    //     selectedShiftName
    // );
    // const [shiftEditStart, setShiftEditStart] = React.useState<any>(
    //     dayjs(selectedShiftTimeStart, { format: "HH:mm:ss" })
    // );
    // const [shiftEditStop, setShiftEditStop] = React.useState<any>(
    //     dayjs(selectedShiftTimeStop, { format: "HH:mm:ss" })
    // );

    const handleSave = () => {
        setLoading(true);
        const newShift = {
            id: shift?.id,
            name: selectedShiftName,
            timeStart: selectedShiftTimeStart,
            timeStop: selectedShiftTimeStop,
        };
        router.post(`/admin/shift/update/${selectedShiftId}`, newShift, {
            preserveState: true,
            onSuccess: () => {
                setStatus("200");
                setStatusMessage("Zmiana została zmieniona!");
            },
            onError: (page) => {
                setStatusMessage(page.message);
                setStatus(page.status);
            },
        });
        getShift();
        setOpenDialog(false);
        setLoading(false);
    };

    return (
        <Dialog open={open} onClose={() => setOpenDialog(false)} fullScreen>
            <BootstrapDialogTitle
                id="editShiftForm"
                onClose={() => setOpenDialog(false)}
            >
                Edytuj zmianę
            </BootstrapDialogTitle>
            <DialogContent>
                <Box component="form" onSubmit={handleSave}>
                    <TextField
                        fullWidth
                        sx={{ marginTop: "0.5rem" }}
                        label="Nazwa"
                        value={selectedShiftName}
                        required
                        onChange={(e) => setSelectedShiftName(e.target.value)}
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={["TimePicker"]}>
                            <TimeField
                                fullWidth
                                label="Start"
                                value={selectedShiftTimeStart}
                                onChange={(value) =>
                                    setSelectedShiftTimeStart(value)
                                }
                                sx={{ marginTop: "0.5rem" }}
                                ampm={false}
                                required
                            />
                        </DemoContainer>
                        <DemoContainer components={["TimePicker"]}>
                            <TimeField
                                fullWidth
                                label="Stop"
                                value={selectedShiftTimeStop}
                                onChange={(value) =>
                                    setSelectedShiftTimeStop(value)
                                }
                                sx={{ marginTop: "0.5rem" }}
                                ampm={false}
                                required
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                    <Button
                        type="submit"
                        sx={{ marginTop: "0.5rem" }}
                        variant="outlined"
                        fullWidth
                    >
                        Zapisz
                    </Button>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default DialogEditShiftForm;
