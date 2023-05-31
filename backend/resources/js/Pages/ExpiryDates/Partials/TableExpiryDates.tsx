import * as React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    ThemeProvider,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";

import DarkTheme from "@/Themes/DarkTheme";

// interface TableExpiryDatesProps {
//     children?: React.ReactNode;
//     index: number;
//     value: number;
// }

const TableExpiryDates: React.FC = () => {
    const today = dayjs();
    return (
        <div>
            <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale={dayjs.locale("en-gb")}
            >
                <DemoContainer components={["DatePicker"]}>
                    <DatePicker
                        label="Wybierz datę"
                        defaultValue={today}
                        slotProps={{ textField: { fullWidth: true } }}
                    />
                </DemoContainer>
            </LocalizationProvider>

            <TableContainer className="mt-4" component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Nazwa produktu</TableCell>
                            <TableCell align="center">
                                Termin przydatności
                            </TableCell>
                            <TableCell align="center">Ilość</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell align="center">Cistka</TableCell>
                            <TableCell align="right">31.05.2023</TableCell>
                            <TableCell align="right">2</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default TableExpiryDates;
