import * as React from "react";
import { usePage, router } from "@inertiajs/react";
import { TextField, Autocomplete, Box, Button, Alert } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import "dayjs/locale/en-gb";

import http from "@/http";

interface productsProps {
    id: number;
    name: string;
    created_at: string;
    created_by: number;
    updated_at: string;
    updated_by: number;
    deleted_at: any;
}

const AddProductForm: any = () => {
    const { errors }: any | null = usePage().props;
    const [productName, setProductName] = React.useState<string>("");
    const [status, setStatus] = React.useState<any>(0);
    const [statusMessage, setStatusMessage] = React.useState<any>("");
    const handleSubmit = async (e: React.FormEvent) => {
        setStatus(0);
        setStatusMessage("");
        try {
            e.preventDefault();
            const data = {
                productName: productName,
            };
            router.post("/product/store", data, {
                onSuccess: (page) => {
                    setStatusMessage("Produkt został dodany!");
                    setStatus(200);
                },
                onError: (page) => {
                    setStatusMessage(page.message);
                    setStatus(page.status);
                },
            });
        } catch (error) {
            setStatusMessage("Błąd serwera!");
            setStatus(500);
        }
    };
    return (
        <Box component="form" onSubmit={handleSubmit}>
            {status === 200 && (
                <Alert severity="success" className="mb-4">
                    {statusMessage}
                </Alert>
            )}
            {errors?.status === "500" && (
                <Alert severity="error" className="mb-4">
                    {errors?.message}
                </Alert>
            )}
            <TextField
                fullWidth
                label="Nazwa"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
            />
            <Button
                type="submit"
                sx={{ marginTop: "0.5rem" }}
                variant="outlined"
                fullWidth
            >
                Zapisz
            </Button>
        </Box>
    );
};

export default AddProductForm;
