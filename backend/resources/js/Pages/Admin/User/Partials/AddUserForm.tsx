import * as React from "react";
import { router } from "@inertiajs/react";
import { TextField, Box, Button, Alert } from "@mui/material";

const AddUserForm: any = () => {
    const [userName, setUserName] = React.useState<string>("");
    const [userEmail, setUserEmail] = React.useState<string>("");
    const [userPassword, setUserPassword] = React.useState<string>("");
    const [status, setStatus] = React.useState<any>("0");
    const [statusMessage, setStatusMessage] = React.useState<any>("");
    const handleSubmit = async (e: React.FormEvent) => {
        setStatus(0);
        setStatusMessage("");
        try {
            e.preventDefault();
            const data = {
                userName: userName,
                userEmail: userEmail,
                userPassword: userPassword,
            };
            router.post("/admin/user/store", data, {
                onSuccess: (page) => {
                    setStatusMessage("Konto zostało utworzone!");
                    setStatus("200");
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
            <TextField
                fullWidth
                sx={{ marginTop: "0.5rem" }}
                label="Imię i Nazwisko"
                value={userName}
                required
                onChange={(e) => setUserName(e.target.value)}
            />
            <TextField
                sx={{ marginTop: "0.5rem" }}
                type="email"
                fullWidth
                label="Email"
                value={userEmail}
                required
                onChange={(e) => setUserEmail(e.target.value)}
            />
            <TextField
                type="password"
                sx={{ marginTop: "0.5rem" }}
                fullWidth
                label="Hasło"
                value={userPassword}
                required
                onChange={(e) => setUserPassword(e.target.value)}
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

export default AddUserForm;
