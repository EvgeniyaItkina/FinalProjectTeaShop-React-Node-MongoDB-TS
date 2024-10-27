import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
type Props = {
    onEdit: () => void;
    onDelete: () => void;
};
export const AdminItemControls = (props: Props) => {
    return (
        <>
            <IconButton sx={{ marginLeft: "auto" }} onClick={props.onEdit}>
                <EditIcon />
            </IconButton>
            <IconButton sx={{ marginLeft: "auto" }} onClick={props.onDelete}>
                <DeleteIcon />
            </IconButton>
        </>
    );
};