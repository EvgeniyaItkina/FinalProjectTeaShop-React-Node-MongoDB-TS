import { useEffect, useMemo, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { ImageLogo } from "./ImageLogo";
import SearchBar from "./SearchBar";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Badge, IconButton } from "@mui/material";
import { useUserProducts } from "../../contexts/UserProductsContext";
import { Link } from "react-router-dom";
import { removeToken } from "../../lib/TokenLib";

const TEA_SHOP = "Flying Teapot Shop";

const pages = [
    ["About", "/about", ""],
    ["Login", "/login", "unauth"],
    ["Registration", "/registration", "unauth"],
    ["Profile", "/profile", "auth"],
    ["Favorites", "/favorites", "auth"],
    ["CRM", "/crm", "auth", "admin"],
    ["Logout", "/logout", "auth"],
];

export function TopHeader() {
    const [authState, setAuthState] = useState<"unauth" | "auth">("unauth");
    const [isAdmin, setIsAdmin] = useState<"admin" | undefined>();

    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const { user } = useUserProducts();
    useEffect(() => {
        if (user) {
            setAuthState("auth");
            if (user.role === "admin") {
                setIsAdmin("admin");
            }
        } else {
            setAuthState("unauth");
            setIsAdmin(undefined);
        }
    }, [user]);

    const itemInBasket = useMemo(
        () =>
            !user
                ? 0
                : user?.basketItems.reduce((acc, item) => acc + item.quantity, 0),
        [user]
    );

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <ImageLogo
                        sx={{ display: { xs: "none", md: "flex", height: 50 }, mr: 1 }}
                    />
                    <Typography
                        variant="h6"
                        noWrap
                        to="/"
                        component={Link}
                        sx={{
                            mr: 2,
                            display: { xs: "none", md: "flex" },
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "inherit",
                            textDecoration: "none",
                        }}
                    >
                        {TEA_SHOP}
                    </Typography>
                    <SearchBar sx={{ display: { xs: "none", md: "flex" } }} />

                    <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>

                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{ display: { xs: "block", md: "none" } }}
                        >

                            {pages.map((page, index) => {
                                const [text, path, regime] = page;
                                let onClick = undefined;
                                if (path === "/logout") {
                                    onClick = (
                                        e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
                                    ) => {
                                        e.preventDefault();
                                        removeToken();
                                        window.location.href = "/";
                                    };
                                }
                                if (regime === authState || regime === "")
                                    return (
                                        <MenuItem key={index} onClick={handleCloseNavMenu}>
                                            <Button
                                                to={path}
                                                component={Link}
                                                sx={{ textAlign: "center" }}
                                                onClick={onClick}
                                            >
                                                {text}
                                            </Button>
                                        </MenuItem>
                                    );
                            })}
                        </Menu>
                    </Box>

                    <Typography
                        variant="h5"
                        noWrap
                        component={Link}
                        to="/"
                        sx={{
                            mr: 2,
                            display: { xs: "flex", md: "none" },
                            flexGrow: 1,
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "inherit",
                            textDecoration: "none",
                        }}
                    >
                        {TEA_SHOP}
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                        {pages.map((page, index) => {
                            const [text, path, regime, forRole] = page;

                            let onClickMy = (
                                _: React.MouseEvent<HTMLAnchorElement, MouseEvent>
                            ) => {
                                handleCloseNavMenu();
                            };

                            if (path === "/logout") {
                                onClickMy = (
                                    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
                                ) => {
                                    e.preventDefault();
                                    removeToken();
                                    window.location.href = "/";
                                };
                            }
                            if (regime === authState || regime === "")
                                if (forRole === isAdmin || forRole === undefined)
                                    return (
                                        <Button
                                            key={index}
                                            to={path}
                                            component={Link}
                                            onClick={onClickMy}
                                            sx={{ my: 2, color: "white", display: "block" }}
                                        >
                                            {text}
                                        </Button>
                                    );
                        })}
                    </Box>
                    <Box sx={{ flexGrow: 0 }}>
                        <Menu
                            sx={{ mt: "45px" }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        ></Menu>
                    </Box>
                    {authState === "auth" && (
                        <IconButton color="inherit" to={'/basket'} component={Link}>
                            {itemInBasket > 0 && (
                                <Badge badgeContent={itemInBasket} color="secondary">
                                    <ShoppingCartIcon />
                                </Badge>
                            )}
                            {itemInBasket === 0 && <ShoppingCartIcon />}
                        </IconButton>
                    )}
                </Toolbar>
            </Container>
            <SearchBar
                sx={{ padding: "10px", display: { md: "none", xl: "none" } }}
            />
        </AppBar>
    );
}