import * as React from "react";
import { usePage } from "@inertiajs/react";
import { Box, Button, Alert, CircularProgress } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import "dayjs/locale/en-gb";
import * as XLSX from "xlsx";

import http from "@/http";
import { ReportTable } from ".";

const ReportExpiryDateForm: any = () => {
    const { errors }: any | null = usePage().props;
    const today = dayjs();
    const [dateValueStart, setDateValueStart] = React.useState<any>(today);
    const [dateValueEnd, setDateValueEnd] = React.useState<any>(today);
    const [status, setStatus] = React.useState<any>(0);
    const [statusMessage, setStatusMessage] = React.useState<any>("");
    const [reportData, setReportData] = React.useState<any[]>([]);
    const [showReportTable, setShowReportTable] =
        React.useState<boolean>(false);
    const [loading, setLoading] = React.useState<boolean>(false);
    const handleClick = async (e: React.FormEvent) => {
        setShowReportTable(false);
        setLoading(true);
        setStatus(0);
        setStatusMessage("");
        try {
            const payload = {
                dateStart: dateValueStart,
                dateEnd: dateValueEnd,
            };
            await http
                .get(`/eds/report`, { params: payload })
                .then((response) => {
                    setReportData(response.data.expiryDates);
                });
            setLoading(false);
            setShowReportTable(true);
        } catch (error) {
            setStatusMessage("Błąd serwera!");
            setStatus(500);
        }
    };
    const handleXlsx = () => {
        const rows = reportData.map((row) => ({
            NazwaProduktu: row.product.name,
            Termin: row.date,
            Ilosc: row.amount,
        }));
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet(rows);
        XLSX.utils.book_append_sheet(workbook, worksheet, "Dates");
        XLSX.writeFile(workbook, "test.xlsx", { compression: true });
    };
    return (
        <>
            <Box component="form">
                {status === 200 && (
                    <Alert severity="success" className="mb-4">
                        {statusMessage}
                    </Alert>
                )}
                {errors?.status === "500" && (
                    <Alert severity="error" className="mb-4">
                        {errors?.message}
                    </Alert>
                )}
                <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                    adapterLocale={dayjs.locale("en-gb")}
                >
                    <DemoContainer components={["DatePicker"]}>
                        <DatePicker
                            label="Wybierz datę początkową"
                            value={dateValueStart}
                            slotProps={{ textField: { fullWidth: true } }}
                            onChange={(e) => setDateValueStart(e)}
                        />
                    </DemoContainer>
                </LocalizationProvider>
                <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                    adapterLocale={dayjs.locale("en-gb")}
                >
                    <DemoContainer components={["DatePicker"]}>
                        <DatePicker
                            label="Wybierz datę końcową"
                            value={dateValueEnd}
                            slotProps={{ textField: { fullWidth: true } }}
                            onChange={(e) => setDateValueEnd(e)}
                        />
                    </DemoContainer>
                </LocalizationProvider>
                <Button
                    sx={{ marginTop: "0.5rem" }}
                    variant="outlined"
                    fullWidth
                    onClick={handleClick}
                >
                    Generuj raport
                </Button>
            </Box>
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
            {showReportTable && (
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        marginBottom: "0.5rem",
                    }}
                >
                    <ReportTable
                        expiryDates={reportData}
                        handleXlsx={handleXlsx}
                    />
                </Box>
            )}
        </>
    );
};

export default ReportExpiryDateForm;
