import * as React from "react";
import { router } from "@inertiajs/react";
import { TextField, Box, Button, Alert } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimeField } from "@mui/x-date-pickers/TimeField";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";

const AddShiftForm = () => {
    const today = dayjs();
    const [shiftName, setShiftName] = React.useState<string>("");
    const [shiftStart, setShiftStart] = React.useState<any>(today);
    const [shiftStop, setShiftStop] = React.useState<any>(today);

    const [status, setStatus] = React.useState<any>("0");
    const [statusMessage, setStatusMessage] = React.useState<any>("");

    const handleSubmit = async (e: React.FormEvent) => {
        setStatus(0);
        setStatusMessage("");

        try {
            e.preventDefault();
            const data = {
                name: shiftName,
                timeStart: shiftStart,
                timeStop: shiftStop,
            };
            router.post("/admin/shift/store", data, {
                onSuccess: (page) => {
                    setStatus(200);
                    setStatusMessage("Dodano nową zmianę!");
                },
                onError: (page) => {
                    setStatus(page.status);
                    setStatusMessage(page.message);
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
            {status === 500 && (
                <Alert severity="error" className="mb-4">
                    {statusMessage}
                </Alert>
            )}
            <TextField
                fullWidth
                sx={{ marginTop: "0.5rem" }}
                label="Nazwa"
                value={shiftName}
                required
                onChange={(e) => setShiftName(e.target.value)}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["TimePicker"]}>
                    <TimeField
                        fullWidth
                        label="Start"
                        value={shiftStart}
                        onChange={(value) => setShiftStart(value)}
                        sx={{ marginTop: "0.5rem" }}
                        ampm={false}
                        required
                    />
                </DemoContainer>
                <DemoContainer components={["TimePicker"]}>
                    <TimeField
                        fullWidth
                        label="Stop"
                        value={shiftStop}
                        onChange={(value) => setShiftStop(value)}
                        sx={{ marginTop: "0.5rem" }}
                        ampm={false}
                        required
                    />
                </DemoContainer>
            </LocalizationProvider>
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

export default AddShiftForm;
