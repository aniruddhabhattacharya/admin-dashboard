import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, TablePagination, Paper } from "@mui/material";
import { useAppSelector } from '../redux/hooks.ts';

function Table_() {
    const data = useAppSelector((state) => state.dashBoard);
    const [orderBy, setOrderBy] = useState("timestamp");
    const [order, setOrder] = useState("asc");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleSort = (property) => {
        const isAscending = orderBy === property && order === "asc";
        setOrder(isAscending ? "desc" : "asc");
        setOrderBy(property);
    };

    const sortedData = [...data].sort((a, b) => {
        if (order === "asc") return a[orderBy] > b[orderBy] ? 1 : -1;
        return a[orderBy] < b[orderBy] ? 1 : -1;
    });

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <div>
            <Paper sx={{ width: "100%", overflow: "hidden" }}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <TableSortLabel active={orderBy === "timestamp"} direction={order} onClick={() => handleSort("timestamp")}>
                                        Date
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel active={orderBy === "brand"} direction={order} onClick={() => handleSort("brand")}>
                                        Brand
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel active={orderBy === "product_type"} direction={order} onClick={() => handleSort("product_type")}>
                                        Product Type
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell align="right">
                                    <TableSortLabel active={orderBy === "price"} direction={order} onClick={() => handleSort("price")}>
                                        Price
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell>
                                    <TableSortLabel active={orderBy === "condition"} direction={order} onClick={() => handleSort("condition")}>
                                        Condition
                                    </TableSortLabel>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                                <TableRow key={index}>
                                    <TableCell>{row.timestamp}</TableCell>
                                    <TableCell>{row.brand}</TableCell>
                                    <TableCell>{row.product_type}</TableCell>
                                    <TableCell align="right">{row.price}</TableCell>
                                    <TableCell>{row.condition}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination component="div" count={data.length} page={page} rowsPerPage={rowsPerPage} onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage} />
            </Paper>
        </div>
    );
}

export default Table_;
