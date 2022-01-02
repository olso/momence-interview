import styled from "styled-components";
import {
  TableBody,
  TableContainer,
  TableHead,
  TableCell,
  TableRow,
} from "@mui/material";

export const StyledTableCell = styled(TableCell).attrs({ align: "left" })``;

export const StyledTableContainer = styled(TableContainer)`
  max-height: 400px;
`;

export const StyledTableRow = styled(TableRow)`
  background-color: white;

  &:nth-of-type(odd) {
    background-color: rgba(0, 0, 0, 0.1);
  }

  &:last-child td,
  &:last-child th {
    border: 0;
  }
`;

export const StyledTableBody = styled(TableBody)`
  ${StyledTableCell} {
  }
`;

export const StyledTableHead = styled(TableHead)`
  ${StyledTableCell} {
    text-transform: uppercase;
    background-color: #fff;
    color: #000;
    font-weight: bold;
  }
`;

