import {
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    Input,
    TableRow,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

import { BasketItem } from "../../type";
import { useBasketActions } from "../../hooks/useBasketActions";

export const BasketTable = (prop: { basketItems: BasketItem[] }) => {
    const { setItemToBasket, deleteItemFromBasket } = useBasketActions();

    return (
        <div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Item Name</TableCell>
                            <TableCell align="right">Price</TableCell>
                            <TableCell align="center">Quantity</TableCell>
                            <TableCell align="right">Item Total</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {prop.basketItems.map((item, index) => {
                            if (item.product === null) return null;
                            return (
                                <TableRow
                                    key={index}
                                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {item.product.name}
                                    </TableCell>
                                    <TableCell align="right">{item.price}</TableCell>
                                    <TableCell align="center">
                                        <IconButton
                                            size="small"
                                            aria-label="plus"
                                            onClick={() => {
                                                setItemToBasket(item.product._id, item.quantity + 1);
                                            }}
                                        >
                                            <AddIcon />
                                        </IconButton>
                                        <Input
                                            sx={{ width: 40 }}
                                            value={item.quantity}
                                            inputProps={{
                                                style: { textAlign: "center" },
                                            }}
                                            onChange={(e) => {
                                                if (!e.target.value) return;
                                                setItemToBasket(
                                                    item.product._id,
                                                    parseInt(e.target.value)
                                                );
                                            }}
                                        ></Input>
                                        <IconButton
                                            size="small"
                                            aria-label="minus"
                                            onClick={() => {
                                                if (item.quantity === 1) return;
                                                setItemToBasket(item.product._id, item.quantity - 1);
                                            }}
                                        >
                                            <RemoveIcon />
                                        </IconButton>
                                    </TableCell>
                                    <TableCell align="right">
                                        {(item.price * item.quantity).toFixed(2)}
                                    </TableCell>
                                    <TableCell align="right">
                                        <IconButton
                                            aria-label="delete"
                                            onClick={() => {

                                                deleteItemFromBasket(item.product._id);
                                            }}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                        <TableRow>
                            <TableCell colSpan={3} align="right">
                                Total
                            </TableCell>
                            <TableCell align="right">
                                {prop.basketItems
                                    .reduce((acc, item) => acc + item.price * item.quantity, 0)
                                    .toFixed(2)}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};