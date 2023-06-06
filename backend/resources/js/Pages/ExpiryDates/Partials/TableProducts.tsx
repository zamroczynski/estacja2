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
} from "@mui/material";

import DeleteIconButton from "@/Components/DeleteIcon";
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

const TableProducts: React.FC = () => {
    // const [myProducts, setMyProducts] = React.useState<productsProps[]>([]);
    const [myProducts, setMyProducts] = React.useState<productsProps[]>([]);
    const [status, setStatus] = React.useState<string>("0");
    const [statusMessage, setStatusMessage] = React.useState<string>("");

    React.useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        const response = await http.get(`/products/my`);
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
    console.log(myProducts);
    return (
        <div>
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
                                    <DeleteIconButton
                                        onClick={(e) => handleDelete(row.id)}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default TableProducts;
