import * as React from "react";
import { TextField, TextFieldProps, InputAdornment } from "@mui/material";
import NumberFormat from "react-number-format";

type Props = TextFieldProps & {
  currencyCode: string;
};

const NumberFormatCustom = ({ inputRef, ...props }: any) => {
  return (
    <NumberFormat {...props} getInputRef={inputRef} thousandSeparator={false} />
  );
};

export default function InputMoney({
  currencyCode,
  ...props
}: Props) {
  return (
    <TextField
      {...props}
      type="text"
      inputProps={{
        inputMode: "decimal",
      }}
      InputProps={{
        endAdornment: <InputAdornment position="end">{currencyCode}</InputAdornment>,
        inputComponent: NumberFormatCustom,
      }}
    />
  );
}
