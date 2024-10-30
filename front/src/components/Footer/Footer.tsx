import { Box, Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import { useUserProducts } from "../../contexts/UserProductsContext";

export const Footer = () => {
    const { user } = useUserProducts();
    return (
        <Box
            position={{ xs: "fixed", md: "unset" }}
            bottom={0}
            left={0}
            width={"100vw"}
            bgcolor={"lightblue"}
            display={"flex"}
            zIndex={3}
            justifyContent={"center"}
            padding={1}
        >
            <Stack direction={'row'}>
                <Button to={"/"} component={Link}>
                    Home
                </Button>
                <Button to={"/about"} component={Link}>
                    About
                </Button>
                {user &&
                    <Button to={"/favorites"} component={Link}>
                        Favorites
                    </Button>}
            </Stack>
        </Box>
    );
};