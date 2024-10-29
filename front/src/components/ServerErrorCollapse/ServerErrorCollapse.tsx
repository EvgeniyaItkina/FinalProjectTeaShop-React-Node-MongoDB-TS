import { Alert, Collapse, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface Prop {
    serverError: string;
    setServerError: (value: string) => void;
}

export const ServerErrorCollapse = (prop: Prop) => {
    const { serverError, setServerError } = prop;
    return (
        <Collapse in={Boolean(serverError)}>
            <Alert
                severity="error"
                action={
                    <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                            setServerError("");
                        }}
                    >
                        <CloseIcon fontSize="inherit" />
                    </IconButton>
                }
                sx={{ mb: 2 }}
            >
                {serverError}
            </Alert>
        </Collapse>
    );
};