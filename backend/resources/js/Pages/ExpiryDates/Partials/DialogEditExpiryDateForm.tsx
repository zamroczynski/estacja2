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
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import "dayjs/locale/en-gb";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import productProps from "@/types/productProps";

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

interface DialogEditExpiryDateFormProps {
    open: boolean;
    setOpenDialog: (value: boolean) => void;
    editExpiryDateId: number;
    dateValue: any;
    setDateValue: (value: string | null) => void;
    amountValue: number;
    setAmountValue: (value: number) => void;
    selectedProduct: productProps | undefined | null;
    setSelectedProduct: (value: productProps | null | undefined) => void;
    products: productProps[];
    getExpiryDates: () => void;
    setStatus: (status: string) => void;
    setStatusMessage: (status: string) => void;
    http: any;
    setLoading: (value: boolean) => void;
}

const DialogEditExpiryDateForm: React.FC<DialogEditExpiryDateFormProps> = ({
    open,
    setOpenDialog,
    editExpiryDateId,
    dateValue,
    setDateValue,
    amountValue,
    setAmountValue,
    selectedProduct,
    setSelectedProduct,
    products,
    getExpiryDates,
    setStatus,
    setStatusMessage,
    http,
    setLoading,
}) => {
    const handleSave = () => {
        setLoading(true);
        const product_id = selectedProduct?.id;
        const newExpiryDates = {
            id: editExpiryDateId,
            date: dateValue.format("YYYY-MM-DD"),
            product_id: product_id,
            amountValue: amountValue,
        };
        router.post(`/eds/update/${editExpiryDateId}`, newExpiryDates, {
            preserveState: true,
            onSuccess: () => {
                setStatus("200");
                setStatusMessage("Termin został zmieniony!");
            },
            onError: (page) => {
                setStatusMessage(page.message);
                setStatus(page.status);
            },
        });
        getExpiryDates();
        setOpenDialog(false);
        setLoading(false);
    };
    return (
        <Dialog open={open} onClose={() => setOpenDialog(false)}>
            <BootstrapDialogTitle
                id="editExpiryDateForm"
                onClose={() => setOpenDialog(false)}
            >
                Edytuj produkt
            </BootstrapDialogTitle>
            <DialogContent>
                <Box component="form">
                    <Autocomplete
                        sx={{ marginTop: "0.5rem" }}
                        value={selectedProduct}
                        onChange={(event, newValue) => {
                            setSelectedProduct(newValue);
                        }}
                        className="mb-2"
                        options={products}
                        getOptionLabel={(option) => option.name}
                        renderOption={(params, products) => (
                            <Box component="li" {...params}>
                                {products.name}
                            </Box>
                        )}
                        defaultValue={products[0]}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Wybierz produkt"
                                inputProps={{
                                    ...params.inputProps,
                                    autoComplete: "new-password",
                                }}
                                required={!selectedProduct}
                            />
                        )}
                    />
                    <LocalizationProvider
                        dateAdapter={AdapterDayjs}
                        adapterLocale={dayjs.locale("en-gb")}
                    >
                        <DemoContainer components={["DatePicker"]}>
                            <DatePicker
                                label="Wybierz datę"
                                value={dateValue}
                                slotProps={{ textField: { fullWidth: true } }}
                                onChange={(e) => setDateValue(e)}
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                    <TextField
                        type="number"
                        inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                        fullWidth
                        label="Ilość"
                        sx={{ marginTop: "0.5rem" }}
                        value={amountValue}
                        onChange={(e) => setAmountValue(Number(e.target.value))}
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

export default DialogEditExpiryDateForm;
