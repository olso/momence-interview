import * as React from "react";
import {
  Container,
  Table,
  TableRow,
  Paper,
  Grid,
  Stack,
  Typography,
  Skeleton,
  TextFieldProps,
  Box,
} from "@mui/material";

import InputSelect from "../../components/InputSelect";
import InputMoney from "../../components/InputMoney";
import { useCnb } from "../../services/cnb";
import {
  StyledTableBody,
  StyledTableCell,
  StyledTableContainer,
  StyledTableHead,
  StyledTableRow,
} from "./Styled";

const CnbForm = () => {
  const { rates } = useCnb();

  const [amount, setFromAmount] = React.useState(1);
  const [toCurrencyCode, setToCurrencyCode] = React.useState("CZK");

  const selectedRate = React.useMemo(
    () => rates.find((v) => v.currencyCode === toCurrencyCode),
    [rates, toCurrencyCode]
  );

  type OnChange = NonNullable<TextFieldProps["onChange"]>;

  const handleSelect = React.useCallback<OnChange>((event) => {
    setToCurrencyCode(event.target.value);
  }, []);

  const handleInput = React.useCallback<OnChange>((event) => {
    setFromAmount(Number(event.target.value));
  }, []);

  return (
    <Box component="form" noValidate autoComplete="off">
      <Grid container spacing="2" alignItems="center">
        <Grid item xs={12} md={4}>
          <InputMoney
            fullWidth
            value={amount}
            currencyCode="CZK"
            onChange={handleInput}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <InputSelect
            fullWidth
            value={toCurrencyCode}
            onChange={handleSelect}
            placeholderOption="Currency"
            options={rates.map(({ currencyCode, currencyName }) => ({
              value: currencyCode,
              text: `${currencyName}/${currencyCode}`,
            }))}
          />
        </Grid>
        <Box sx={{ display: { md: "none" } }} height={10} width="100%" />
        <Grid item xs={12} md={4} container justifyContent="center">
          {selectedRate && (
            <>
              <Typography>
                {Number(amount / selectedRate.rate).toFixed(4)}{" "}
                {toCurrencyCode}
              </Typography>
            </>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

const CnbDebug = () => {
  const { meta } = useCnb();

  return (
    <Typography>
      updated at{" "}
      {meta ? (
        <>
          {meta?.date || ""} {meta?.id || ""}
        </>
      ) : (
        <Skeleton sx={{ display: "inline-block" }} width={130} />
      )}
    </Typography>
  );
};

const CnbTable = () => {
  const { rates } = useCnb();

  const skeleton = React.useMemo(
    () =>
      new Array(11).fill(0).map((v, i) => (
        <StyledTableRow hover key={i}>
          <StyledTableCell component="th" scope="row" colSpan={5}>
            <Skeleton />
          </StyledTableCell>
        </StyledTableRow>
      )),
    []
  );

  return (
    <>
      <StyledTableContainer>
        <Table size="small" stickyHeader>
          <StyledTableHead>
            <TableRow>
              <StyledTableCell>země</StyledTableCell>
              <StyledTableCell>měna</StyledTableCell>
              <StyledTableCell>kód</StyledTableCell>
              <StyledTableCell>kurz</StyledTableCell>
            </TableRow>
          </StyledTableHead>
          <StyledTableBody>
            {rates.length ? (
              <>
                {rates.map(
                  ({ currencyCode, countryName, currencyName, rate }) => (
                    <StyledTableRow key={currencyCode} hover>
                      <StyledTableCell component="th" scope="row">
                        {countryName}
                      </StyledTableCell>
                      <StyledTableCell>{currencyName}</StyledTableCell>
                      <StyledTableCell>{currencyCode}</StyledTableCell>
                      <StyledTableCell>{rate.toFixed(4)}</StyledTableCell>
                    </StyledTableRow>
                  )
                )}
              </>
            ) : (
              <>{skeleton}</>
            )}
          </StyledTableBody>
        </Table>
      </StyledTableContainer>
    </>
  );
};

export default function Example() {
  return (
    <Container sx={{ height: "100%" }}>
      <Stack spacing={2} justifyContent="center" sx={{ height: "100%" }}>
        <Paper>
          <Box p={2}>
            <CnbForm />
          </Box>
        </Paper>
        <Paper sx={{ overflow: "auto" }}>
          <CnbTable />
        </Paper>
        <Paper>
          <Box p={2}>
            <CnbDebug />
          </Box>
        </Paper>
      </Stack>
    </Container>
  );
}
