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
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import "dayjs/locale/en-gb";

import taskTypeProps from "@/types/taskTypeProps";
import prorityProps from "@/types/prorityProps";
import http from "@/http";

const AddTaskForm: any = () => {
    const today = dayjs();
    const [name, setName] = React.useState<string>("");
    const [description, setDescription] = React.useState<string>("opis...");
    const [deadline, setDeadline] = React.useState<any>(today);
    const [status, setStatus] = React.useState<any>("0");
    const [statusMessage, setStatusMessage] = React.useState<any>("");
    const [taskType, setTaskType] = React.useState<taskTypeProps[]>([]);
    const [selectedTaskType, setSelectedTaskType] = React.useState<string>("");
    const [priorities, setPriorities] = React.useState<prorityProps[]>([]);
    const [selectedPrority, setSelectedPrority] = React.useState<string>("");

    React.useEffect(() => {
        getTaskType();
        getProrites();
    }, []);

    const getTaskType = async () => {
        const response = await http.get("/admin/task/type");
        setTaskType(response.data.types);
    };

    const getProrites = async () => {
        const response = await http.get("/admin/prorities");
        setPriorities(response.data.prorites);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        setStatus(0);
        setStatusMessage("");
        try {
            e.preventDefault();
            const data = {
                name: name,
                description: description,
                deadline: deadline,
                taskType: selectedTaskType,
                prority: selectedPrority,
            };
            router.post("/admin/task/store", data, {
                onSuccess: (page) => {
                    setStatusMessage("Zadanie zostało utworzone!");
                    setStatus("200");
                },
                onError: (page) => {
                    setStatusMessage(page.message);
                    setStatus(page.status);
                },
            });
            setName("");
            setDescription("");
        } catch (error) {
            setStatusMessage("Błąd serwera!");
            setStatus(500);
        }
    };

    const handleSelectChange = (event: SelectChangeEvent, type: string) => {
        if (type === "task") {
            setSelectedTaskType(event.target.value as string);
        }
        if (type === "prority") {
            setSelectedPrority(event.target.value as string);
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
                sx={{ marginTop: "0.5rem", marginBottom: "1.0rem" }}
                label="Nazwa"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
            />
            <ReactQuill value={description} onChange={setDescription} />
            <FormControl fullWidth sx={{ marginTop: "1.0rem" }}>
                <InputLabel id="taskType-label">Rodzaj zadania</InputLabel>
                <Select
                    labelId="taskType-label"
                    id="taskType"
                    onChange={(e: SelectChangeEvent) => {
                        handleSelectChange(e, "task");
                    }}
                    required
                >
                    {taskType.map((row) => (
                        <MenuItem value={row.id}>{row.name}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl fullWidth sx={{ marginTop: "1.0rem" }}>
                <InputLabel id="prority-label">Priorytet zadania</InputLabel>
                <Select
                    labelId="prority-label"
                    id="prority"
                    onChange={(e: SelectChangeEvent) => {
                        handleSelectChange(e, "prority");
                    }}
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
                    <DateTimePicker
                        label="Termin wykonania"
                        value={deadline}
                        slotProps={{ textField: { fullWidth: true } }}
                        onChange={(e) => setDeadline(e)}
                        sx={{ marginTop: "1.0rem" }}
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

export default AddTaskForm;
