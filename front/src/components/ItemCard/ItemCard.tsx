import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from "@mui/material";

import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link } from "react-router-dom";
import { IProduct } from "../../type";

export const ItemCard = (prop: {
  item: IProduct;
  showActionsButtons: boolean;
  isFavorite: boolean;
  isAdmin: boolean;
  adminItemControls: JSX.Element | null;
  onFavoriteChange: (item_id: string) => void;
  onAddToBasket: (item_id: string) => void;
  maxWidth?: number | string;
}) => {
  const { item, isFavorite, showActionsButtons } = prop;
  const AdminItemControls = prop.adminItemControls;
  const onFavoriteClick = () => {
    prop.onFavoriteChange(item._id);
  };
  const onAddToBasketClick = () => {
    prop.onAddToBasket(item._id);
  };

  return (
    <Card sx={{ maxWidth: prop.maxWidth ? prop.maxWidth : 345 }}>
      <CardHeader
        to={"/product/" + item._id}
        component={Link}
        sx={{ textAlign: "center" }}
        title={<Typography variant="h6">{item.name}</Typography>}
      />
      <CardContent>
        <Box
          sx={{ height: "250px" }}
          to={"/product/" + item._id}
          component={Link}
          display={"block"}
        >
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

        <Box sx={{ height: "100px", overflow: "auto" }}>
          <ul>
            {item.ingredients.map((el, index) => {
              return <li key={index}>{el}</li>;
            })}
          </ul>
        </Box>
        <Typography variant="body2" color="text.secondary">
          Price: {item.price}₪
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Weight: {item.weight}g
        </Typography>
        {showActionsButtons && (
          <Box display={"flex"} marginTop={1}>
            <Typography variant="body2">
              <Button onClick={onAddToBasketClick} variant="contained">
                Add to basket
              </Button>
            </Typography>
            {prop.isAdmin && AdminItemControls}
            <IconButton
              aria-label="add-to-favorites"
              onClick={onFavoriteClick}
              sx={{ color: isFavorite ? "red" : "", marginLeft: "auto" }}
            >
              <FavoriteIcon />
            </IconButton>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};