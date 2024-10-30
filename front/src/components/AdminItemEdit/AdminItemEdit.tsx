
import {
    Box,
    Button,
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
import Joi from "joi";
import { createProduct, editProduct } from "../../api";
import { ServerErrorCollapse } from "../ServerErrorCollapse/ServerErrorCollapse";
import CloseIcon from "@mui/icons-material/Close";

//Тип Prop указывает на то, что если есть `id`, выполняется редактирование, если нет — добавление нового элемента
// код делится на создание нового продукта или редактирование старого
type Prop = {
    id?: string;
    onItemChanged: () => void;
};

// Initial state for error messages, with each key representing a form field
// Начальное состояние для ошибок, каждый ключ соответствует полю формы
const errorInit = {
    name: "",
    category: "",
    subCategory: "",
    ingredients: "",
    price: "",
    weight: "",
    image: "",
};

// Validation type derived from `IProduct`, omitting uneditable fields
// Тип для валидации, взятый из `IProduct`, за исключением неизменяемых полей
//Omit - take type from Iproduct and delete keys "createdAt" | "updatedAt" | "_id"
type ValidationType = Omit<IProduct, "createdAt" | "updatedAt" | "_id">;

const schemaJoi = Joi.object<ValidationType>({
    name: Joi.string().required().label("Name"),
    category: Joi.string().required().label("Category"),
    subCategory: Joi.string().empty("").label("Sub Category"),
    ingredients: Joi.array().items(Joi.string()).label("Ingredients"),
    price: Joi.number().required().label("Price"),
    weight: Joi.number().label("Weight"),
    image: Joi.string().empty("").label("Image"),
});

export const AdminItemEdit = (prop: Prop) => {
    const { products, setProducts } = useUserProducts();
    const [serverError, setServerError] = useState("");
    const inputRefs = useRef<Record<string, HTMLInputElement | HTMLDivElement[]>>(
        {}
    );
    const [errorInput, setError] = useState(errorInit);
    //add optional download image 
    const [itemSelected, setItemSelected] = useState<IProduct & { uploadImage?: string }>({
        name: "",
        category: "",
        subCategory: "",
        ingredients: [],
        price: 0,
        weight: 0,
        image: "",
        createdAt: "",
        updatedAt: "",
        _id: "",
        uploadImage: "",
    });

    // Initialize `itemSelected` with existing product data if `id` exists
    // Инициализация `itemSelected` данными из продуктов, если `id` указан
    useEffect(() => {
        const item = products.find((item) => item._id === prop.id);
        if (item) setItemSelected({ ...item });
    }, [products]);

    if (!itemSelected) return null;

    // Clear specific field error when user types in the input
    // Сброс ошибки для конкретного поля при вводе пользователем
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setError({ ...errorInput, [e.target.id]: "" });
        setItemSelected({ ...itemSelected, [e.target.id]: e.target.value });
    };

    // Add ingredient to the ingredients array if it doesn’t already exist
    // Добавляет ингредиент в массив ингредиентов, если он еще не добавлен
    const addIngredient = () => {
        if (!itemSelected.ingredients) itemSelected.ingredients = [];
        if (Array.isArray(inputRefs.current["addIngridients"])) return;
        if (inputRefs.current["addIngridients"].value) {
            const v = inputRefs.current["addIngridients"].value.trim();
            if (itemSelected.ingredients.includes(v)) return;
            const newIngredients = [...itemSelected.ingredients];
            newIngredients.push(v);
            itemSelected.ingredients = newIngredients;
            setItemSelected({ ...itemSelected });
            inputRefs.current["addIngridients"].value = ""; // Clear input field after adding
        }
    };

    // Save the item by validating data, then either creating or updating based on `id` existence
    // Сохраняет элемент, выполняя валидацию данных, затем создает или обновляет на основе наличия `id`
    const saveItem = () => {
        const keys = Object.keys(errorInit);

        // Collect data from inputRefs and assign it to `data` object
        // Сбор данных из inputRefs и их присвоение объекту `data`
        const data: Record<string, any> = {};
        keys.forEach((key) => {
            if (key === "ingredients")
                if (inputRefs.current["ingredients"])
                    data["ingredients"] = (
                        inputRefs.current["ingredients"] as HTMLDivElement[]
                    ).map((el) => {
                        return el.textContent;
                    });
                else data["ingredients"] = [];
            else data[key] = (inputRefs.current[key] as HTMLInputElement).value;
        });

        // Validate the `data` object using Joi schema
        // Валидация объекта `data` с использованием Joi-схемы
        const { error, value } = schemaJoi.validate(data);
        if (error) {
            error.details.forEach((err) => {
                setError({ ...errorInput, [err.path[0]]: err.message });
            });
            return;
        }

        // Prepare the item for saving, including `_id` if editing
        // Подготовка элемента для сохранения, включая `_id`, если идет редактирование
        // add new image to Product, validation to check name product
        const updateItem = {
            ...value,
            _id: itemSelected._id,
            uploadImage: itemSelected.uploadImage,
        } as IProduct & { uploadImage?: string };
        if (itemSelected.uploadImage && !updateItem.image) {
            setError({ ...errorInput, image: "Please fill image name" });
            return;
        }

        if (prop.id) {
            editProduct(updateItem)
                .then((res) => {
                    if (!res) throw new Error("Server error");
                    const savedItem = res.data;
                    const index = products.findIndex(
                        (item) => item._id === savedItem._id
                    );
                    products[index] = savedItem;
                    setProducts([...products]);
                    prop.onItemChanged();
                })
                .catch((e) => {
                    setServerError(e.message ?? "Server error");
                });
        } else {
            createProduct(updateItem)
                .then((res) => {
                    if (!res) throw new Error("Server error");
                    const savedItem = res.data;
                    console.log(savedItem);
                    products.push(savedItem);
                    setProducts([...products]);
                    prop.onItemChanged();
                })
                .catch((e) => {
                    setServerError(e.message ?? "Server error");
                });
        }
    };

    return (
        <Box overflow={"auto"} maxHeight={"90vh"}>
            {/* Display server error if exists */}
            {/* Отображение ошибки сервера, если она есть */}
            <Box component={"h1"}>{prop.id ? "Edit Item" : "Add Item"}</Box>
            <ServerErrorCollapse {...{ serverError, setServerError }} />
            <Stack gap={3}>
                <TextField
                    required
                    value={itemSelected.name}
                    id="name"
                    label="Name"
                    variant="standard"
                    inputRef={(el) => (inputRefs.current["name"] = el)}
                    error={Boolean(errorInput.name)}
                    helperText={errorInput.name}
                    onChange={onChange}
                />
                <TextField
                    required
                    value={itemSelected.category}
                    id="category"
                    label="Category"
                    variant="standard"
                    inputRef={(el) => (inputRefs.current["category"] = el)}
                    error={Boolean(errorInput.category)}
                    helperText={errorInput.category}
                    onChange={onChange}
                />
                <TextField
                    value={itemSelected.subCategory}
                    id="subCategory"
                    label="Sub Category"
                    variant="standard"
                    inputRef={(el) => (inputRefs.current["subCategory"] = el)}
                    error={Boolean(errorInput.subCategory)}
                    helperText={errorInput.subCategory}
                    onChange={onChange}
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

                                    //решается проблема, если нет ингридиентов, то создается пустой массив,
                                    // если есть, то каждый чипс заносится как новый эллемент массива - для последующей поготовки 
                                    // валидации и отправки на сервер
                                    ref={(el) => {
                                        if (inputRefs.current[`ingredients`] === undefined) {
                                            inputRefs.current[`ingredients`] = [];
                                        }
                                        if (Array.isArray(inputRefs.current[`ingredients`]) && el)
                                            inputRefs.current[`ingredients`][index] = el;
                                    }}
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
                    value={itemSelected.price}
                    id="price"
                    label="Price"
                    variant="standard"
                    inputRef={(el) => (inputRefs.current["price"] = el)}
                    error={Boolean(errorInput.price)}
                    helperText={errorInput.price}
                    onChange={onChange}
                />
                <TextField
                    value={itemSelected.weight}
                    id="weight"
                    label="Weight"
                    variant="standard"
                    inputRef={(el) => (inputRefs.current["weight"] = el)}
                    error={Boolean(errorInput.weight)}
                    helperText={errorInput.weight}
                    onChange={onChange}
                />
                <TextField
                    value={itemSelected.image}
                    id="image"
                    label="Image URL"
                    variant="standard"
                    inputRef={(el) => (inputRefs.current["image"] = el)}
                    error={Boolean(errorInput.image)}
                    helperText={errorInput.image}
                    onChange={onChange}
                />
                {/* add pictures from computer and send to backend  server */}
                <Box>
                    <Button variant="contained" component="label">
                        Upload Image
                        <input
                            type="file"
                            hidden
                            accept="image/*"
                            ref={(el) => (inputRefs.current["uploadImage"] = el as any)}
                            onChange={(e) => {
                                const file = e.target.files?.[0];

                                if (file) {
                                    const reader = new FileReader();
                                    reader.onloadend = () => {
                                        setError({ ...errorInput, image: "" });
                                        setItemSelected({
                                            ...itemSelected,
                                            uploadImage: reader.result as string,
                                            image: file.name,
                                        });
                                    };
                                    reader.readAsDataURL(file);
                                }
                            }}
                        />
                    </Button>
                    {itemSelected.uploadImage && (
                        <Box mt={2} position={"relative"}>
                            <Box position={"absolute"} right={0} top={2}>
                                <IconButton
                                    onClick={() => {
                                        setItemSelected({ ...itemSelected, uploadImage: "" });
                                        (
                                            inputRefs.current["uploadImage"] as HTMLInputElement
                                        ).value = "";
                                    }}
                                >
                                    <CloseIcon />
                                </IconButton>
                            </Box>
                            <img
                                src={itemSelected.uploadImage}
                                alt="Preview"
                                style={{ maxWidth: "200px" }}
                            />
                        </Box>
                    )}
                </Box>



                <Stack direction="row" spacing={2}>
                    <Button variant="contained" onClick={prop.onItemChanged}>
                        Back
                    </Button>
                    {prop.id && (
                        <Button variant="contained" onClick={saveItem}>
                            Save
                        </Button>
                    )}
                    {!prop.id && (
                        <Button variant="contained" onClick={saveItem}>
                            Add Item
                        </Button>
                    )}
                </Stack>
            </Stack>
        </Box>
    );
};