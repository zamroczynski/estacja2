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

import { DialogEditUserForm } from ".";
import { DeleteIconButton, EditIconButton } from "@/Components";
import http from "@/http";

interface userProps {
    id: number;
    name: string;
    email: string;
    password: string;
    role: string;
    created_at: string;
    created_by: number;
    updated_at: string;
    updated_by: number;
    deleted_at: string | null;
}

const ManageTableExpiryDates: React.FC = () => {
    const [openDialog, setOpenDialog] = React.useState(false);
    const [userId, setUserId] = React.useState<number>(0);
    const [userName, setUserName] = React.useState<string>("");
    const [userPassword, setUserPassword] = React.useState<string>("");
    const [userEmail, setUserEmail] = React.useState<string>("");
    const [userRole, setUserRole] = React.useState<string | null>(null);
    const [users, setUsers] = React.useState<userProps[]>([]);
    const [roles, setRoles] = React.useState<string[]>([]);
    const [status, setStatus] = React.useState<string>("0");
    const [statusMessage, setStatusMessage] = React.useState<string>("");
    const [loading, setLoading] = React.useState<boolean>(true);

    React.useEffect(() => {
        setTimeout(() => {
            getUsers();
            getRoles();
            setLoading(false);
        }, 1000);
    }, []);

    const getUsers = async () => {
        await http.get(`/admin/users`).then((response) => {
            setUsers(response.data.users);
        });
    };

    const getRoles = async () => {
        await http.get(`/admin/roles`).then((response) => {
            setRoles(response.data.roles);
        });
    };

    const handleEdit = (user: userProps) => {
        setStatus("0");
        setStatusMessage("");
        setUserId(user.id);
        setUserName(user.name);
        setUserEmail(user.email);
        setUserRole(user.role);
        setUserPassword("");
        setOpenDialog(true);
    };

    const handleDelete = (id: number) => {
        setStatus("0");
        setStatusMessage("");
        router.get(`/admin/user/destroy/${id}`, undefined, {
            onSuccess: () => {
                setStatus("200");
                setStatusMessage("Konto zostało zarchiwizowane");
            },
            onError: (page) => {
                setStatusMessage(page.message);
                setStatus(page.status);
            },
            preserveState: true,
        });
        setLoading(true);
        getUsers();
        setLoading(false);
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
                            <TableCell align="center">
                                Imię i nazwisko
                            </TableCell>
                            <TableCell align="center">Email</TableCell>
                            <TableCell align="center">Rola</TableCell>
                            <TableCell align="center">
                                Data utworzenia konta
                            </TableCell>
                            <TableCell align="right">Opcje</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell align="center">{row.name}</TableCell>
                                <TableCell align="center">
                                    {row.email}
                                </TableCell>
                                <TableCell align="center">{row.role}</TableCell>
                                <TableCell align="center">
                                    {dayjs(row.created_at).format("DD/MM/YYYY")}
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
            <DialogEditUserForm
                open={openDialog}
                setOpenDialog={setOpenDialog}
                userId={userId}
                userName={userName}
                setUserName={setUserName}
                userEmail={userEmail}
                setUserEmail={setUserEmail}
                userRole={userRole}
                setUserRole={setUserRole}
                userPassword={userPassword}
                setUserPassword={setUserPassword}
                roles={roles}
                getUsers={getUsers}
                setStatus={setStatus}
                setStatusMessage={setStatusMessage}
            />
        </div>
    );
};

export default ManageTableExpiryDates;
