import * as React from "react";
import { usePage, router } from "@inertiajs/react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    CircularProgress,
    Box,
    Alert,
} from "@mui/material";

import dayjs from "dayjs";
import "dayjs/locale/en-gb";

import { DeleteIconButton, EditIconButton } from "@/Components";
import { DialogEditExpiryDateForm } from ".";
import http from "@/http";
import expiryDateProps from "@/types/expiryDateProps";
import productProps from "@/types/productProps";

const ManageTableExpiryDates: React.FC = () => {
    const [openDialog, setOpenDialog] = React.useState(false);
    const [editExpiryDateId, setEditExpiryDateId] = React.useState<number>(0);
    const [dateValue, setDateValue] = React.useState<any>("");
    const [amountValue, setAmountValue] = React.useState<number>(1);
    const [selectedProduct, setSelectedProduct] = React.useState<
        productProps | null | undefined
    >();
    const [products, setProducts] = React.useState<productProps[]>([]);
    const [expiryDates, setExpiryDates] = React.useState<expiryDateProps[]>([]);
    const [status, setStatus] = React.useState<string>("0");
    const [statusMessage, setStatusMessage] = React.useState<string>("");
    const [loading, setLoading] = React.useState<boolean>(true);

    React.useEffect(() => {
        setTimeout(() => {
            searchProductsByName("");
            getExpiryDates();
        }, 1);
    }, []);

    const searchProductsByName = async (name: string) => {
        const searchParams = new URLSearchParams({ name });
        const response = await http.get(`/products?${searchParams}`);
        setProducts(response.data.products);
    };
    const getExpiryDates = async () => {
        await http.get(`/eds/my`).then((response) => {
            setLoading(false);
            setExpiryDates(response.data.expiryDates);
        });
        setLoading(false);
    };

    const handleEdit = (expiryDate: expiryDateProps) => {
        setStatus("0");
        setStatusMessage("");
        setEditExpiryDateId(expiryDate.id);
        const dateConvert = dayjs(expiryDate.date);
        setDateValue(dateConvert);
        setAmountValue(expiryDate.amount);
        setSelectedProduct(expiryDate.product);
        setOpenDialog(true);
    };

    const handleDelete = (id: number) => {
        setStatus("0");
        setStatusMessage("");
        router.get(`/eds/destroy/${id}`, undefined, {
            onSuccess: () => {
                setStatus("200");
                setStatusMessage("Termin został usunięty");
            },
            onError: (page) => {
                setStatusMessage(page.message);
                setStatus(page.status);
            },
            preserveState: true,
        });
        setLoading(true);
        getExpiryDates();
    };
    return (
        <div>
            {status === "200" && (
                <Alert severity="success" className="mb-4">
                    {statusMessage}
                </Alert>
            )}
            {status === "500" && (
                <Alert severity="error" className="mb-4">
                    {statusMessage}
                </Alert>
            )}
            <TableContainer className="mt-4" component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Nazwa produktu</TableCell>
                            <TableCell align="right">
                                Termin przydatności
                            </TableCell>
                            <TableCell align="right">Ilość</TableCell>
                            <TableCell align="right">Opcje</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {expiryDates.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell align="center">
                                    {row.product.name}
                                </TableCell>
                                <TableCell align="right">{row.date}</TableCell>
                                <TableCell align="right">
                                    {row.amount}
                                </TableCell>
                                <TableCell align="right">
                                    <EditIconButton
                                        onClick={() => handleEdit(row)}
                                    />
                                    <DeleteIconButton
                                        onClick={() => handleDelete(row.id)}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {loading && (
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        marginBottom: "0.5rem",
                    }}
                >
                    <CircularProgress />
                </Box>
            )}
            <DialogEditExpiryDateForm
                open={openDialog}
                setOpenDialog={setOpenDialog}
                editExpiryDateId={editExpiryDateId}
                dateValue={dateValue}
                setDateValue={setDateValue}
                amountValue={amountValue}
                setAmountValue={setAmountValue}
                selectedProduct={selectedProduct}
                setSelectedProduct={setSelectedProduct}
                products={products}
                setStatus={setStatus}
                setStatusMessage={setStatusMessage}
                http={http}
                getExpiryDates={getExpiryDates}
                setLoading={setLoading}
            />
        </div>
    );
};

export default ManageTableExpiryDates;
