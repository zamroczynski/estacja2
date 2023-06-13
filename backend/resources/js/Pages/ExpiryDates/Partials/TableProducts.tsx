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
    Alert,
} from "@mui/material";

import { DeleteIconButton, EditIconButton } from "@/Components";
import http from "@/http";
import { DialogEditProductForm } from ".";
import productProps from "@/types/productProps";

const TableProducts: React.FC = () => {
    const [openDialog, setOpenDialog] = React.useState(false);
    const [myProducts, setMyProducts] = React.useState<productProps[]>([]);
    const [editProductId, setEditProductId] = React.useState<number>(0);
    const [editProductName, setEditProductName] = React.useState<string>("");
    const [status, setStatus] = React.useState<string>("0");
    const [statusMessage, setStatusMessage] = React.useState<string>("");

    React.useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        const response = await http.get(`/product/my`);
        setMyProducts(response.data.products);
    };

    const handleDelete = (id: number) => {
        setStatus("0");
        setStatusMessage("");
        router.get(`/product/destroy/${id}`, undefined, {
            onSuccess: () => {
                setStatus("200");
                setStatusMessage("Produkt został usunięty");
            },
            onError: (page) => {
                setStatusMessage(page.message);
                setStatus(page.status);
            },
            preserveState: true,
        });
        getProducts();
    };

    const handleDialogClose = () => {
        setOpenDialog(false);
    };

    const handleEdit = (product: productProps) => {
        setStatus("0");
        setStatusMessage("");
        setEditProductId(product.id);
        setEditProductName(product.name);
        setOpenDialog(true);
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
                            <TableCell align="right">Opcje</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {myProducts.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell align="center">{row.name}</TableCell>
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
            <DialogEditProductForm
                open={openDialog}
                setOpenDialog={setOpenDialog}
                productId={editProductId}
                productName={editProductName}
                setProductName={setEditProductName}
                getProduct={getProducts}
                setStatus={setStatus}
                setStatusMessage={setStatusMessage}
            />
        </div>
    );
};

export default TableProducts;
