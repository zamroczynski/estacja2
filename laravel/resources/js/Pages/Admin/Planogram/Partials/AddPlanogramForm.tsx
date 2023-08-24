import * as React from "react";
import { router, usePage } from "@inertiajs/react";
import {
    TextField,
    Box,
    Button,
    Alert,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import "dayjs/locale/en-gb";
import { UploadFile, Close } from "@mui/icons-material";

const AddPlanogramForm: any = () => {
    const { errors } = usePage().props;
    const [name, setName] = React.useState<string>("");
    const [comments, setComments] = React.useState<string>("");
    const [status, setStatus] = React.useState<any>("0");
    const [statusMessage, setStatusMessage] = React.useState<any>("");
    const today = dayjs();
    const [dateValue, setDateValue] = React.useState<any>(today);
    const [file, setFile] = React.useState<File>();

    const handleSubmit = async (e: React.FormEvent) => {
        setStatus(0);
        setStatusMessage("");
        try {
            e.preventDefault();
            const data = {
                name: name,
                comments: comments,
                valid_from: dateValue.format("YYYY-MM-DD"),
                file: file,
            };
            router.post("/admin/planogram/store", data, {
                onSuccess: (page) => {
                    setStatusMessage("Planogram został dodany!");
                    setStatus("200");
                },
                onError: (page) => {
                    setStatusMessage(page.message);
                    setStatus(page.status);
                },
            });
            setName("");
            setComments("");
            setFile(undefined);
        } catch (error) {
            setStatusMessage("Błąd serwera!");
            setStatus(500);
        }
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const handleClearFile = () => {
        setFile(undefined);
    };

    return (
        <Box component="form" onSubmit={handleSubmit}>
            {status === "200" && (
                <Alert severity="success" className="mb-4">
                    {statusMessage}
                </Alert>
            )}
            {errors.name && (
                <Alert severity="error" className="mb-4">
                    {errors.name}
                </Alert>
            )}
            <TextField
                fullWidth
                sx={{ marginTop: "0.5rem", marginBottom: "1.0rem" }}
                label="Nazwa"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
            />
            {errors.comments && (
                <Alert severity="error" className="mb-4">
                    {errors.comments}
                </Alert>
            )}
            <TextField
                fullWidth
                sx={{ marginTop: "0.5rem", marginBottom: "1.0rem" }}
                label="komentarz"
                value={comments}
                required
                onChange={(e) => setComments(e.target.value)}
            />
            {errors.file && (
                <Alert severity="error" className="mb-4">
                    {errors.file}
                </Alert>
            )}
            <Button
                component="label"
                startIcon={<UploadFile />}
                sx={{ marginRight: "1rem", marginBottom: "1rem" }}
            >
                Dodaj plik
                <input type="file" hidden onChange={handleFileUpload} />
            </Button>
            {file && (
                <div className="mb-2">
                    <Button disabled variant="outlined">
                        {file.name}
                    </Button>
                    <Button startIcon={<Close />} onClick={handleClearFile} />
                </div>
            )}
            {errors.valid_from && (
                <Alert severity="error" className="mb-4">
                    {errors.valid_from}
                </Alert>
            )}
            <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale={dayjs.locale("en-gb")}
            >
                <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                        label="Planogram ważne od"
                        value={dateValue}
                        slotProps={{ textField: { fullWidth: true } }}
                        onChange={(e) => setDateValue(e)}
                    />
                </DemoContainer>
            </LocalizationProvider>
            <Button
                type="submit"
                sx={{ marginTop: "1.0rem" }}
                variant="outlined"
                fullWidth
            >
                Zapisz
            </Button>
        </Box>
    );
};

export default AddPlanogramForm;
