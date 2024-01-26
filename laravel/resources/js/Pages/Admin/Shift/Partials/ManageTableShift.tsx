import * as React from "react";
import { router } from "@inertiajs/react";
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

import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/en-gb";

import http from "@/http";

import shiftProps from "@/types/shiftProps";
import { DeleteIconButton, EditIconButton } from "@/Components";

import { DialogEditShiftForm } from ".";

const ManageTableShift: React.FC = () => {
    const today = dayjs();
    const [shifts, setShifts] = React.useState<shiftProps[]>([]);
    const [openDialog, setOpenDialog] = React.useState(false);
    const [selectedShiftId, setSelectedShiftId] = React.useState(0);
    const [selectedShiftName, setSelectedShiftName] = React.useState<
        string | null
    >("");
    const [selectedShiftTimeStart, setSelectedShiftTimeStart] =
        React.useState<any>(today);
    const [selectedShiftTimeStop, setSelectedShiftTimeStop] =
        React.useState<any>(today);
    const [editShift, setEditShift] = React.useState<shiftProps | null>(null);
    const [loading, setLoading] = React.useState(true);
    const [status, setStatus] = React.useState<string>("0");
    const [statusMessage, setStatusMessage] = React.useState<string>("");
    React.useEffect(() => {
        setTimeout(() => {
            getShifts();
        }, 1);
    }, []);

    const getShifts = async (url: string = "/admin/shift/index") => {
        await http.get(url).then((response) => {
            setLoading(true);
            setShifts(response.data.shifts);
        });
        setLoading(false);
    };

    const handleEdit = (shift: shiftProps) => {
        setStatus("0");
        setStatusMessage("");
        setEditShift(shift);
        setSelectedShiftId(shift.id);
        setSelectedShiftName(shift.name);
        setSelectedShiftTimeStart(
            dayjs(shift.time_start, { format: "HH:mm:ss" })
        );
        setSelectedShiftTimeStop(
            dayjs(shift.time_stop, { format: "HH:mm:ss" })
        );
        setOpenDialog(true);
    };

    const handleDelete = (id: number) => {
        setStatus("0");
        setStatusMessage("");
        router.get(`/admin/shift/destroy/${id}`, undefined, {
            onSuccess: () => {
                setStatus("200");
                setStatusMessage("Zmiana została usunięta");
            },
            onError: (page) => {
                setStatusMessage(page.message);
                setStatus(page.status);
            },
            preserveState: true,
        });
        setLoading(true);
        getShifts();
    };

    return (
        <>
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
                            <TableCell align="center">Nazwa zmiany</TableCell>
                            <TableCell align="right">Start</TableCell>
                            <TableCell align="right">Stop</TableCell>
                            <TableCell align="right">Opcje</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {shifts.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell align="center">{row.name}</TableCell>
                                <TableCell align="right">
                                    {row.time_start}
                                </TableCell>
                                <TableCell align="right">
                                    {row.time_stop}
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
            <DialogEditShiftForm
                open={openDialog}
                setOpenDialog={setOpenDialog}
                shift={editShift}
                setLoading={setLoading}
                setStatus={setStatus}
                setStatusMessage={setStatusMessage}
                getShift={getShifts}
                selectedShiftId={selectedShiftId}
                selectedShiftName={selectedShiftName}
                selectedShiftTimeStart={selectedShiftTimeStart}
                selectedShiftTimeStop={selectedShiftTimeStop}
                setSelectedShiftName={setSelectedShiftName}
                setSelectedShiftTimeStart={setSelectedShiftTimeStart}
                setSelectedShiftTimeStop={setSelectedShiftTimeStop}
            />
        </>
    );
};

export default ManageTableShift;
