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

interface DialogEditProductFormProps {
    open: boolean;
    setOpenDialog: (value: boolean) => void;
    productId: number;
    productName: string;
    setProductName: (value: string) => void;
    getProduct: () => void;
    setStatus: (status: string) => void;
    setStatusMessage: (status: string) => void;
}

const DialogEditProductForm: React.FC<DialogEditProductFormProps> = ({
    setOpenDialog,
    open,
    productId,
    productName,
    setProductName,
    getProduct,
    setStatus,
    setStatusMessage,
}) => {
    const handleSave = () => {
        const newProduct = { id: productId, name: productName };
        router.post(`/product/update/${productId}`, newProduct, {
            preserveState: true,
            onSuccess: () => {
                setStatus("200");
                setStatusMessage("Nazwa została zmieniona!");
            },
            onError: (page) => {
                setStatusMessage(page.message);
                setStatus(page.status);
            },
        });
        getProduct();
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
                        sx={{ marginTop: "0.5rem" }}
                        value={productName}
                        label="Nazwa produktu"
                        fullWidth
                        onChange={(e) => setProductName(e.target.value)}
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

export default DialogEditProductForm;
