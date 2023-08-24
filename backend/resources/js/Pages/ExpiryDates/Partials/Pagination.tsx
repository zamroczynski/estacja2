import * as React from "react";
import { usePage } from "@inertiajs/react";
import axios from "axios";
import { Pagination as MuiPagination } from "@mui/material";

interface PaginationProps {
    total: number;
    perPage: number;
}

const Pagination: React.FC<PaginationProps> = ({ total, perPage }) => {
    const { url, currentPage: initialPage } = usePage().props;
    const [currentPage, setCurrentPage] = React.useState(initialPage);

    const handlePageChange = (
        event: React.ChangeEvent<unknown>,
        page: number
    ) => {
        axios.get(url as string, { params: { page } }).then((response) => {
            setCurrentPage(page);
            // Tutaj możesz zaktualizować dane na stronie za pomocą otrzymanej odpowiedzi
        });
    };

    return (
        <MuiPagination
            count={Math.ceil(total / perPage)}
            page={currentPage as number}
            onChange={handlePageChange}
        />
    );
};

export default Pagination;
