import { Box, Button, Grid2, IconButton, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { IProduct } from "../../type";

export const ItemRow = (prop: {
    item: IProduct;
    showActionsButtons: boolean;
    isFavorite: boolean;
    isAdmin: boolean;
    adminItemControls: JSX.Element;
    onFavoriteChange: (item_id: string) => void;
    onAddToBasket: (item_id: string) => void;
}) => {
    const { item, isFavorite, showActionsButtons } = prop;

    const onFavoriteClick = () => {
        prop.onFavoriteChange(item._id);
    };
    const onAddToBasketClick = () => {
        prop.onAddToBasket(item._id);
    };

    return (
        <Box border={1} borderRadius={'5px'} padding={1}>
            <Grid2 container columnGap={1}>
                <Box sx={{ width: "150px" }}>
                    <img
                        style={{
                            maxWidth: "100%",
                            maxHeight: "100%",
                            display: "block",
                            margin: "auto",
                        }}
                        src={"/images/" + item.image}
                        alt={item.name}
                    />
                </Box>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <Typography variant="h6">{item.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                        Price: {item.price}₪
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Weight: {item.weight}g
                    </Typography>
                    {showActionsButtons && (
                        <Box display={"flex"} marginTop={"auto"}>
                            <Typography variant="body2">
                                <Button onClick={onAddToBasketClick} variant="contained">Add to basket</Button>
                            </Typography>
                            {prop.isAdmin && prop.adminItemControls}
                            <IconButton
                                onClick={onFavoriteClick}
                                aria-label="add-to-favorites"
                                sx={{ color: isFavorite ? "red" : "" }}
                            >
                                <FavoriteIcon />
                            </IconButton>
                        </Box>
                    )}
                </div>
            </Grid2>
        </Box>
    );
};