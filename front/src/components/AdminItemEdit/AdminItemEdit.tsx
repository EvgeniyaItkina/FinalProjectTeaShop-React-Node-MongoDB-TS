
import {
    Box,
    Chip,
    IconButton,
    InputAdornment,
    OutlinedInput,
    Stack,
    TextField,
} from "@mui/material";
import { useUserProducts } from "../../contexts/UserProductsContext";
import { useEffect, useRef, useState } from "react";

import ControlPointDuplicateIcon from "@mui/icons-material/ControlPointDuplicate";
import { IProduct } from "../../type";
type Prop = {
    id: string;
};

const errorInit = {
    name: "",
    category: "",
    subCategory: "",
    ingredients: "",
    price: "",
    weight: "",
    image: "",
};

export const AdminItemEdit = (prop: Prop) => {
    const { products } = useUserProducts();
    const inputRefs = useRef<Record<string, HTMLInputElement>>({});
    const [errorInput, setError] = useState(errorInit);
    const [itemSelected, setItemSelected] = useState<IProduct | undefined>();
    useEffect(() => {
        const item = products.find((item) => item._id === prop.id);
        if (item) setItemSelected({ ...item });
    }, [products]);

    if (!itemSelected) return null;
    const onChangeClearError = (e: React.ChangeEvent<HTMLInputElement>) => {
        setError({ ...errorInput, [e.target.id]: "" });
    };
    const addIngredient = () => {
        if (!itemSelected.ingredients) itemSelected.ingredients = [];
        if (inputRefs.current["addIngridients"].value) {
            const v = inputRefs.current["addIngridients"].value.trim();
            if (itemSelected.ingredients.includes(v)) return;
            const newIngredients = [...itemSelected.ingredients];
            newIngredients.push(v);
            itemSelected.ingredients = newIngredients;
            setItemSelected({ ...itemSelected });
            inputRefs.current["addIngridients"].value = "";
        }
    };

    return (
        <Box>
            <Stack gap={3}>
                <TextField
                    required
                    defaultValue={itemSelected.name}
                    id="name"
                    label="Name"
                    variant="standard"
                    inputRef={(el) => (inputRefs.current["name"] = el)}
                    error={Boolean(errorInput.name)}
                    helperText={errorInput.name}
                    onChange={onChangeClearError}
                />
                <TextField
                    required
                    defaultValue={itemSelected.category}
                    id="category"
                    label="Category"
                    variant="standard"
                    inputRef={(el) => (inputRefs.current["category"] = el)}
                    error={Boolean(errorInput.category)}
                    helperText={errorInput.category}
                    onChange={onChangeClearError}
                />
                <TextField
                    defaultValue={itemSelected.subCategory}
                    id="subCategory"
                    label="Sub Category"
                    variant="standard"
                    inputRef={(el) => (inputRefs.current["subCategory"] = el)}
                    error={Boolean(errorInput.subCategory)}
                    helperText={errorInput.subCategory}
                    onChange={onChangeClearError}
                />
                <OutlinedInput
                    size="small"
                    placeholder="add ingredient"
                    inputRef={(el) => (inputRefs.current["addIngridients"] = el)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") addIngredient();
                    }}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label={"add ingredient"}
                                onClick={addIngredient}
                                edge="end"
                            >
                                <ControlPointDuplicateIcon />
                            </IconButton>
                        </InputAdornment>
                    }
                />
                <Box maxHeight={"80px"} overflow={"auto"}>
                    {itemSelected &&
                        itemSelected.ingredients.map((ingredient, index) => {
                            return (
                                <Chip
                                    sx={{ margin: 0.3 }}
                                    variant="outlined"
                                    label={ingredient}
                                    key={index}
                                    onDelete={() => {
                                        const newIngredients = itemSelected.ingredients.filter(
                                            (_, i) => i !== index
                                        );
                                        setItemSelected({
                                            ...itemSelected,
                                            ingredients: newIngredients,
                                        });
                                    }}
                                />
                            );
                        })}
                </Box>
                <TextField
                    required
                    defaultValue={itemSelected.price}
                    id="price"
                    label="Price"
                    variant="standard"
                    inputRef={(el) => (inputRefs.current["price"] = el)}
                    error={Boolean(errorInput.price)}
                    helperText={errorInput.price}
                    onChange={onChangeClearError}
                />
                <TextField
                    defaultValue={itemSelected.weight}
                    id="weight"
                    label="Weight"
                    variant="standard"
                    inputRef={(el) => (inputRefs.current["weight"] = el)}
                    error={Boolean(errorInput.weight)}
                    helperText={errorInput.weight}
                    onChange={onChangeClearError}
                />
                <TextField
                    defaultValue={itemSelected.image}
                    id="image"
                    label="Image URL"
                    variant="standard"
                    inputRef={(el) => (inputRefs.current["image"] = el)}
                    error={Boolean(errorInput.image)}
                    helperText={errorInput.image}
                    onChange={onChangeClearError}
                />
            </Stack>
        </Box>
    );
};
