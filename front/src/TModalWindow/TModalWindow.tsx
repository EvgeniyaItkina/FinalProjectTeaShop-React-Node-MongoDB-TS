import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

type Prop = {
    isShow: boolean;
    onClose: () => void;
    children: React.ReactNode;
    showCloseButton?: boolean;
};
const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};
export const TModalWindow = (prop: Prop) => {
    const { isShow, onClose, children } = prop;
    const showCloseButton = prop.showCloseButton ?? true;
    return (
        <Modal
            open={isShow}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                {children}
                {showCloseButton && (
                <Box marginTop={3}>
                    <Button variant="contained" onClick={() => prop.onClose()}>
                        Close
                    </Button>
                </Box>
                )}
            </Box>
        </Modal>
    );
};
