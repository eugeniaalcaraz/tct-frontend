import React, { FC, ChangeEvent, useState, useEffect } from "react";
import { TextField } from "@mui/material";

import { useAppDispatch, useAppSelector } from "@/state/app/hooks";
import { handleInputChange } from "@/state/features";

type InputProps = {
    value: string;
    label: string;
    disabled?: boolean;
    onInput?: (...args) => void;
};

const Input: FC<InputProps> = ({ value, label, disabled = false, onInput }) => {
    const [inputValue, setInputValue] = useState(value);
    const filters = useAppSelector((state) => state.filters);
    const dispatch = useAppDispatch();

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    useEffect(() => {
        filters[label] == "" && setInputValue("");
    }, [filters[label]]);

    const handleBlur = (state: string) => {
        if (inputValue !== "") {
            dispatch(handleInputChange({ label: state, value: inputValue }));
        }
    };

    const handleEnter = (e) => {
        if (e.key === "Enter") {
            dispatch(handleInputChange({ label, value: inputValue }));
        }
    };

    return (
        <TextField
            sx={{
                width: "13rem",
                maxWidth: "100%",
                "&& > *": { fontSize: "1.3rem" },
                "&& > label": { textTransform: "capitalize" },
            }}
            size="small"
            id="outlined-name"
            label={label}
            value={inputValue}
            onChange={handleChange}
            onKeyDown={handleEnter}
            onInput={onInput}
            onBlur={() => handleBlur(label)}
            autoComplete="off"
            disabled={disabled}
            className="input"
        />
    );
};

export { Input };
