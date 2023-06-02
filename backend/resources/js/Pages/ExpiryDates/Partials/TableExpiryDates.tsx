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
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import "dayjs/locale/en-gb";

import { Pagination } from ".";

// interface TableExpiryDatesProps {
//     expiryDates: Array<any>;
// }

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

const columns: GridColDef[] = [
    { field: "name", headerName: "Nazwa produktu", flex: 1 },
    { field: "date", headerName: "Termin przydatności", flex: 1 },
    { field: "amount", headerName: "Ilość", type: "number", flex: 1 },
];

const TableExpiryDates: React.FC = () => {
    const { expiryDates }: any = usePage().props;
    const data: Array<expiryDateProps> = expiryDates.data;
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

            <DataGrid
                className="mt-2"
                rows={expiryDates}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 15 },
                    },
                }}
                slots={{
                    toolbar: GridToolbar,
                }}
            />

            {/* <TableContainer className="mt-4" component={Paper}>
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
                <Pagination
                    total={expiryDates.total}
                    perPage={expiryDates.per_page}
                />
            </TableContainer> */}
        </div>
    );
};

export default TableExpiryDates;
