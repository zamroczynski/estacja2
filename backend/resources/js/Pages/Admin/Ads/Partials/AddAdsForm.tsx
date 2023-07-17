import * as React from "react";
import { router } from "@inertiajs/react";
import {
    TextField,
    Box,
    Button,
    Alert,
    Select,
    MenuItem,
    SelectChangeEvent,
    InputLabel,
    FormControl,
} from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import "dayjs/locale/en-gb";

import http from "@/http";

interface prorityProps {
    id: number;
    name: string;
    value: number;
    created_at: string;
    created_by: number;
    updated_at: string;
    updated_by: number;
    deleted_at: any;
}

const AddAdsForm: any = () => {
    const [title, setTitle] = React.useState<string>("");
    const [description, setDescription] = React.useState<string>("");
    const [priorities, setPriorities] = React.useState<prorityProps[]>([]);
    const [selectedPrority, setSelectedPrority] = React.useState<string>("");
    const [status, setStatus] = React.useState<any>("0");
    const [statusMessage, setStatusMessage] = React.useState<any>("");
    const today = dayjs();
    const [dateValue, setDateValue] = React.useState<any>(today);

    const handleSubmit = async (e: React.FormEvent) => {
        setStatus(0);
        setStatusMessage("");
        try {
            e.preventDefault();
            const data = {
                title: title,
                description: description,
                prority: selectedPrority,
                validUntil: dateValue,
            };
            router.post("/admin/ads/store", data, {
                onSuccess: (page) => {
                    setStatusMessage("Ogłoszenie zostało utworzone!");
                    setStatus("200");
                },
                onError: (page) => {
                    setStatusMessage(page.message);
                    setStatus(page.status);
                },
            });
            setTitle("");
            setDescription("");
        } catch (error) {
            setStatusMessage("Błąd serwera!");
            setStatus(500);
        }
    };

    React.useEffect(() => {
        getProrites();
    }, []);

    const getProrites = async () => {
        const response = await http.get("/admin/prorities");
        setPriorities(response.data.prorites);
    };

    const handleSelectChange = (event: SelectChangeEvent) => {
        setSelectedPrority(event.target.value as string);
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
                sx={{ marginTop: "0.5rem", marginBottom: "1.0rem" }}
                label="Tytuł"
                value={title}
                required
                onChange={(e) => setTitle(e.target.value)}
            />
            <ReactQuill value={description} onChange={setDescription} />
            <FormControl
                fullWidth
                sx={{ marginTop: "1.0rem", marginBottom: "1.0rem" }}
            >
                <InputLabel id="prority-label">Priorytet</InputLabel>
                <Select
                    labelId="prority-label"
                    id="prority"
                    onChange={handleSelectChange}
                    required
                >
                    {priorities.map((row) => (
                        <MenuItem value={row.id}>{row.name}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale={dayjs.locale("en-gb")}
            >
                <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                        label="Ogłoszenie ważne do"
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

export default AddAdsForm;
