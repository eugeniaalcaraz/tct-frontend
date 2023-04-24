import React, { FC, useEffect, useState, SyntheticEvent } from "react";
import { Snackbar, IconButton, Slide, SlideProps } from "@mui/material";
import { useIconsContext } from "@components/hooks";

export interface SnackbarMessage {
    message: string;
    key: number;
}

export interface State {
    open: boolean;
    snackPack: readonly SnackbarMessage[];
}

type SnackbarsProps = {
    openSnack: boolean;
    messageSnack: SnackbarMessage;
};

type TransitionProps = Omit<SlideProps, "direction">;

const Snackbars: FC<SnackbarsProps> = ({ openSnack, messageSnack }) => {
    const [snackPack, setSnackPack] = useState<readonly SnackbarMessage[]>([]);
    const [open, setOpen] = useState(openSnack);
    const [messageInfo, setMessageInfo] = useState<SnackbarMessage | undefined>(
        messageSnack
    );
    const { icons } = useIconsContext();

    function TransitionDown(props: TransitionProps) {
        return <Slide {...props} direction="down" />;
    }

    useEffect(() => {
        if (snackPack.length && !messageInfo) {
            setMessageInfo({ ...snackPack[0] });
            setSnackPack((prev) => prev.slice(1));
            setOpen(true);
        } else if (snackPack.length && messageInfo && open) {
            setOpen(false);
        }
    }, [snackPack, messageInfo, open]);

    const handleClose = (event: SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };

    const handleExited = () => {
        setMessageInfo(undefined);
    };

    return (
        <Snackbar
            key={messageInfo ? messageInfo.key : undefined}
            open={open}
            autoHideDuration={5000}
            onClose={handleClose}
            TransitionProps={{ onExited: handleExited }}
            TransitionComponent={TransitionDown}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            message={messageInfo ? messageInfo.message : undefined}
            action={
                <IconButton
                    aria-label="close"
                    color="inherit"
                    sx={{ p: 0.5 }}
                    onClick={handleClose}
                >
                    {icons["close"]}
                </IconButton>
            }
        />
    );
};

export { Snackbars };
