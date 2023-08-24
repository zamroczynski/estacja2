import * as React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
} from "@mui/material";
import "dayjs/locale/en-gb";

import expiryDateProps from "@/types/expiryDateProps";

interface ReportTableProps {
    expiryDates: expiryDateProps[];
    handleXlsx: () => void;
}

const ReportTable: React.FC<ReportTableProps> = ({
    expiryDates,
    handleXlsx,
}) => {
    return (
        <div className="w-full">
            <Button
                sx={{ marginTop: "0.5rem" }}
                variant="outlined"
                fullWidth
                onClick={handleXlsx}
            >
                Pobierz XLSX
            </Button>
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
                        {expiryDates.map((row) => (
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

export default ReportTable;
