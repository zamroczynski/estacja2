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
    CircularProgress,
    Box,
    Alert,
} from "@mui/material";

import dayjs from "dayjs";
import "dayjs/locale/en-gb";

import { DeleteIconButton, EditIconButton } from "@/Components";
import TablePaginationActions from "@/Components/TablePaginationActions";
import { DialogEditPlanogramForm } from ".";
import http from "@/http";
import planogramProps from "@/types/planogramProps";
import mediaProps from "@/types/mediaProps";

const ManageTablePlanogram: React.FC = () => {
    const { errors } = usePage().props;
    const [plangorams, setPlanograms] = React.useState<planogramProps[]>([]);
    const [openDialog, setOpenDialog] = React.useState(false);
    const [editPlanogramId, setEditPlanogramId] = React.useState<number>(0);
    const [dateValue, setDateValue] = React.useState<any>("");
    const [comments, setComments] = React.useState<string>("");

    const [selectedPrority, setSelectedPrority] = React.useState<string>("1");
    const [name, setName] = React.useState<string>("");
    const [status, setStatus] = React.useState<string>("0");
    const [statusMessage, setStatusMessage] = React.useState<string>("");
    const [loading, setLoading] = React.useState<boolean>(true);

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
    const [total, setTotal] = React.useState<number>(200);
    const [media, setMedia] = React.useState<mediaProps>();

    React.useEffect(() => {
        setTimeout(() => {
            getPlanogram();
        }, 1);
    }, []);
    const getPlanogram = async (url: string = "/admin/planogram/index") => {
        await http.get(url).then((response) => {
            setLoading(false);
            const apiResponse = response.data.planogram;
            setPlanograms(apiResponse.data);
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
        });
        setLoading(false);
    };

    const getMedia = async (editPlanogramId: number) => {
        await http
            .get(`/admin/planogram/media/${editPlanogramId}`)
            .then((response) => {
                setMedia(response.data.media);
            });
    };

    const handleEdit = (planogram: planogramProps) => {
        setStatus("0");
        setStatusMessage("");
        setEditPlanogramId(planogram.id);
        setName(planogram.name);
        const dateConvert = dayjs(planogram.valid_from);
        setDateValue(dateConvert);
        setComments(planogram.comments);
        getMedia(planogram.id);
        setOpenDialog(true);
    };

    const handleDelete = (id: number) => {
        setStatus("0");
        setStatusMessage("");
        router.get(`/admin/planogram/destroy/${id}`, undefined, {
            onSuccess: () => {
                setStatus("200");
                setStatusMessage("Ogłoszenie usunięte");
            },
            onError: (page) => {
                setStatusMessage(page.message);
                setStatus(page.status);
            },
            preserveState: true,
        });
        setLoading(true);
        getPlanogram();
    };

    const handleChangePage = (event: React.MouseEvent | null, page: number) => {
        if (page === currentPage + 1) {
            getPlanogram(nextPageUrl);
        }
        if (page === currentPage - 1) {
            getPlanogram(prevPageUrl);
        }
        if (page === lastPage) {
            getPlanogram(lastPageUrl);
        }
        if (page === 1) {
            getPlanogram(firstPageUrl);
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
                            <TableCell align="center">Nazwa</TableCell>
                            <TableCell align="right">
                                Planogram ważny od
                            </TableCell>
                            <TableCell align="right">Opcje</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {plangorams?.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell align="center">{row.name}</TableCell>
                                <TableCell align="right">
                                    {dayjs(row.valid_from).format("DD/MM/YYYY")}
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
            <DialogEditPlanogramForm
                open={openDialog}
                setOpenDialog={setOpenDialog}
                editPlanogramId={editPlanogramId}
                setName={setName}
                name={name}
                setDateValue={setDateValue}
                dateValue={dateValue}
                setComments={setComments}
                comments={comments}
                setStatus={setStatus}
                setStatusMessage={setStatusMessage}
                http={http}
                getPlanogram={getPlanogram}
                setLoading={setLoading}
                media={media}
                setMedia={setMedia}
            />
        </div>
    );
};

export default ManageTablePlanogram;
