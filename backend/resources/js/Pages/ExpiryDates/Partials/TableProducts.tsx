import * as React from "react";
import { usePage, router } from "@inertiajs/react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableFooter,
    TablePagination,
    Paper,
    Alert,
} from "@mui/material";

import { DeleteIconButton, EditIconButton } from "@/Components";
import http from "@/http";
import { DialogEditProductForm } from ".";
import productProps from "@/types/productProps";
import TablePaginationActions from "@/Components/TablePaginationActions";

const TableProducts: React.FC = () => {
    const [openDialog, setOpenDialog] = React.useState(false);
    const [myProducts, setMyProducts] = React.useState<productProps[]>([]);
    const [editProductId, setEditProductId] = React.useState<number>(0);
    const [editProductName, setEditProductName] = React.useState<string>("");
    const [status, setStatus] = React.useState<string>("0");
    const [statusMessage, setStatusMessage] = React.useState<string>("");
    //Pagination:
    const [currentPage, setCurrentPage] = React.useState<number>(1);
    const [firstPageUrl, setFirstPageUrl] = React.useState<string>("");
    const [from, setFrom] = React.useState<number>(1);
    const [lastPage, setLastPage] = React.useState<number>(1);
    const [lastPageUrl, setLastPageUrl] = React.useState<string>("");
    const [links, setLinks] = React.useState<Object[]>([]);
    const [nextPageUrl, setNextPageUrl] = React.useState<string>("");
    const [path, setPath] = React.useState<string>("");
    const [perPage, setPerPage] = React.useState<number>(15);
    const [prevPageUrl, setPrevPageUrl] = React.useState<string>("");
    const [to, setTo] = React.useState<number>(15);
    const [total, setTotal] = React.useState<number>(1);

    React.useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async (url: string = "/product/my") => {
        const response = await http.get(url);
        const apiResponse = response.data.products;
        setMyProducts(apiResponse.data);
        setCurrentPage(apiResponse.current_page);
        setFirstPageUrl(apiResponse.first_page_url);
        setFrom(apiResponse.from);
        setLastPage(apiResponse.last_page);
        setLastPageUrl(apiResponse.last_page_url);
        setLinks(apiResponse.links);
        setNextPageUrl(apiResponse.next_page_url);
        setPath(apiResponse.path);
        setPerPage(apiResponse.per_page);
        setPrevPageUrl(apiResponse.prev_page_url);
        setTo(apiResponse.to);
        setTotal(apiResponse.total);
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

    const handleChangePage = (event: React.MouseEvent | null, page: number) => {
        if (page === currentPage + 1) {
            getProducts(nextPageUrl);
        }
        if (page === currentPage - 1) {
            getProducts(prevPageUrl);
        }
        if (page === lastPage) {
            getProducts(lastPageUrl);
        }
        if (page === 1) {
            getProducts(firstPageUrl);
        }
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
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                colSpan={4}
                                count={total}
                                rowsPerPage={perPage}
                                page={currentPage}
                                onPageChange={(e, page) =>
                                    handleChangePage(e, page)
                                }
                                rowsPerPageOptions={[-1]}
                                ActionsComponent={TablePaginationActions}
                                labelDisplayedRows={({
                                    from,
                                    to,
                                    count = total,
                                }) => ` `}
                            />
                        </TableRow>
                    </TableFooter>
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
