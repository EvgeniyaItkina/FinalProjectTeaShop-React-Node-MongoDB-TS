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
import { IProduct } from "../../contexts/UserProductsContext";

export const ItemCard = (prop: {
  item: IProduct;
  showActionsButtons: boolean;
  isFavorite: boolean;
}) => {
  const { item, isFavorite, showActionsButtons } = prop;
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        sx={{ textAlign: "center" }}
        title={<Typography variant="h6">{item.name}</Typography>}
      />
      <CardContent>
        <Box sx={{ height: "250px" }}>
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
              <Button variant="contained">Add to basket</Button>
            </Typography>
            <IconButton
              aria-label="add-to-favorites"
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