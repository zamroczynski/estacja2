import * as React from "react";
import { usePage } from "@inertiajs/react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from "@mui/material";

import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import "dayjs/locale/en-gb";

import http from "@/http";

interface expiryDateProps {
    id: number;
    amount: number;
    date: string;
    product_id: number;
    product: any;
    created_at: string;
    created_by: number;
    updated_at: string;
    updated_by: number;
    deleted_at: any;
}

const TableExpiryDates: React.FC = () => {
    const { expiryDates }: any = usePage().props;
    const [data, setData] = React.useState<expiryDateProps[]>(expiryDates);
    const today = dayjs(expiryDates.date);
    const [dateValue, setDateValue] = React.useState(today);

    const handleDateChange = async (e: any) => {
        setDateValue(e);
        const newDate = e.format("YYYY-MM-DD").toString();
        const searchParams = new URLSearchParams({ newDate });
        const response = await http.get(`/eds?${searchParams}`);
        setData(response.data.expiryDates);
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
        </div>
    );
};

export default TableExpiryDates;
