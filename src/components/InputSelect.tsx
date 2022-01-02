import * as React from "react";
import { TextField, TextFieldProps } from "@mui/material";

type Props = TextFieldProps & {
  options: { value: string; text: string }[];
  placeholderOption: string;
};

export default function InputSelect({
  placeholderOption,
  options,
  ...props
}: Props) {
  return (
    <TextField {...props} select SelectProps={{ native: true }}>
      <option value="" aria-label="None">
        {placeholderOption}
      </option>
      {options.map(({ value, text }) => (
        <option key={value} value={value}>
          {text}
        </option>
      ))}
    </TextField>
  );
}
