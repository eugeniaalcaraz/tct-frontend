import React, { FC } from "react";
import { TextField } from "@mui/material";
import { useAppDispatch } from "@/state/app/hooks";
import { setData } from "@/state/features/updatedProduct";

type UpdateProps = {
    name?: string;
    value: string | number;
    width?: string;
};

const UpdateInput: FC<UpdateProps> = ({ name, value, width = "15rem" }) => {
    const dispatch = useAppDispatch();
    //const [inputValue, setInputValue] = useState(value);

    const handleChange = (e, state) => {
        dispatch(setData({ [state]: e.target.value }));
    };

    return (
        <TextField
            onBlur={(e) => handleChange(e, name)}
            defaultValue={value}
            size="small"
            sx={{
                width,
            }}
        />
    );
};

export { UpdateInput };
