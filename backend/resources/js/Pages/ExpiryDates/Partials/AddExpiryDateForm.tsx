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

const AddExpiryDateForm: any = () => {
    const { errors }: any | null = usePage().props;
    const [products, setProducts] = React.useState<productsProps[]>([]);
    const today = dayjs();
    const [dateValue, setDateValue] = React.useState<any>(today);
    const [amounValue, setAmounValue] = React.useState<any>(1);
    const [selectedProduct, setSelectedProduct] = React.useState<any>({});
    const [status, setStatus] = React.useState<any>(0);
    const [statusMessage, setStatusMessage] = React.useState<any>("");
    React.useEffect(() => {
        searchProductsByName("");
        if (products && !selectedProduct) {
            setSelectedProduct(products[0]);
        }
    }, []);
    const searchProductsByName = async (name: string) => {
        const searchParams = new URLSearchParams({ name });
        const response = await http.get(`/products?${searchParams}`);
        setProducts(response.data.products);
    };
    const handleSubmit = async (e: React.FormEvent) => {
        setStatus(0);
        setStatusMessage("");
        try {
            e.preventDefault();
            const data = {
                product: selectedProduct,
                date: dateValue,
                amount: amounValue,
            };
            router.post("/eds/create", data, {
                onSuccess: (page) => {
                    setStatusMessage("Termin został dodany!");
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
            <Autocomplete
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
                        required={selectedProduct.length === 0}
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
                value={amounValue}
                onChange={(e) => setAmounValue(e.target.value)}
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

export default AddExpiryDateForm;
