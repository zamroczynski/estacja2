import { useState, FC, useEffect } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Box,
    CircularProgress,
} from "@mui/material";

import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import "dayjs/locale/en-gb";

import http from "@/http";

import expiryDateProps from "@/types/expiryDateProps";

const TableExpiryDates: FC = () => {
    const [data, setData] = useState<expiryDateProps[]>([]);
    const today = dayjs();
    const [dateValue, setDateValue] = useState(today);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setTimeout(() => {
            handleDateChange(dateValue);
        }, 500);
    }, []);

    const handleDateChange = async (e: any) => {
        setLoading(true);
        setDateValue(e);
        const newDate = e.format("YYYY-MM-DD").toString();
        const searchParams = new URLSearchParams({ newDate });
        const response = await http.get(`/eds/get?${searchParams}`);
        setData(response.data.expiryDates);
        setLoading(false);
    };

    return (
        <div>
            <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale={dayjs.locale("en-gb")}
            >
                <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                        label="Wybierz datę"
                        value={dateValue}
                        slotProps={{ textField: { fullWidth: true } }}
                        onChange={(e) => handleDateChange(e)}
                    />
                </DemoContainer>
            </LocalizationProvider>

            <TableContainer className="mt-4" component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Nazwa produktu</TableCell>
                            <TableCell align="right">
                                Termin przydatności
                            </TableCell>
                            <TableCell align="right">Ilość</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell align="center">
                                    {row.product.name}
                                </TableCell>
                                <TableCell align="right">{row.date}</TableCell>
                                <TableCell align="right">
                                    {row.amount}
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
        </div>
    );
};

export default TableExpiryDates;
