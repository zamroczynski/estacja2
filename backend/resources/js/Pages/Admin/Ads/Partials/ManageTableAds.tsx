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
import { DialogEditAdsForm } from ".";
import http from "@/http";
import adsProps from "@/types/adsProps";
import prorityProps from "@/types/prorityProps";

const ManageTableAds: React.FC = () => {
    const [ads, setAds] = React.useState<adsProps[]>([]);
    const [priorities, setPriorities] = React.useState<prorityProps[]>([]);
    const [openDialog, setOpenDialog] = React.useState(false);
    const [editAdsId, setEditAdsId] = React.useState<number>(0);
    const [dateValue, setDateValue] = React.useState<any>("");
    const [description, setDescription] = React.useState<string>("");

    const [selectedPrority, setSelectedPrority] = React.useState<string>("1");
    const [title, setTitle] = React.useState<string>("");
    const [status, setStatus] = React.useState<string>("0");
    const [statusMessage, setStatusMessage] = React.useState<string>("");
    const [loading, setLoading] = React.useState<boolean>(true);

    React.useEffect(() => {
        setTimeout(() => {
            getAds();
            getProrites();
        }, 1);
    }, []);
    const getAds = async () => {
        await http.get(`/admin/ads/index`).then((response) => {
            setLoading(false);
            setAds(response.data.ads);
        });
        setLoading(false);
    };

    const getProrites = async () => {
        const response = await http.get("/admin/prorities");
        setPriorities(response.data.prorites);
    };

    const handleEdit = (ads: adsProps) => {
        setStatus("0");
        setStatusMessage("");
        setEditAdsId(ads.id);
        setTitle(ads.title);
        const dateConvert = dayjs(ads.valid_until);
        setDateValue(dateConvert);
        setDescription(ads.description);
        setSelectedPrority(ads.prority_id.toString());
        setOpenDialog(true);
    };

    const handleDelete = (id: number) => {
        setStatus("0");
        setStatusMessage("");
        router.get(`/admin/ads/destroy/${id}`, undefined, {
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
        getAds();
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
                            <TableCell align="center">Tytuł</TableCell>
                            <TableCell align="right">Priorytet</TableCell>
                            <TableCell align="right">Ważne do</TableCell>
                            <TableCell align="right">Opcje</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {ads?.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell align="center">
                                    {row.title}
                                </TableCell>
                                <TableCell align="right">
                                    {row.prority.name}
                                </TableCell>
                                <TableCell align="right">
                                    {dayjs(row.valid_until).format(
                                        "DD/MM/YYYY"
                                    )}
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
            <DialogEditAdsForm
                open={openDialog}
                setOpenDialog={setOpenDialog}
                editAdsId={editAdsId}
                setTitle={setTitle}
                title={title}
                setDateValue={setDateValue}
                dateValue={dateValue}
                setDescription={setDescription}
                description={description}
                setSelectedPrority={setSelectedPrority}
                selectedPrority={selectedPrority}
                priorities={priorities}
                setStatus={setStatus}
                setStatusMessage={setStatusMessage}
                http={http}
                getAds={getAds}
                setLoading={setLoading}
            />
        </div>
    );
};

export default ManageTableAds;
