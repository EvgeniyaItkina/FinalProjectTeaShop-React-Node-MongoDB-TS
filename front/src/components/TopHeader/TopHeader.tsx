import * as React from "react";
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

const TEA_SHOP = "Tea Shop";

const pages = [
    ["About", "/about", ""],
    ["Login", "/login", "unauth"],
    ["Registration", "/registration", "unauth"],
    ["Profile", "/profile", "auth"],
    ["Logout", "/", "auth"],
    ["Basket", "/basket", "auth"],
    ["Favorites", "/favorites", "auth"],
    ["CRM", "/crm", "auth", "admin"],
];

export function TopHeader() {
    const [authState, setAuthState] = React.useState<"unauth" | "auth">("auth");
    const [isAdmin, setIsAdmin] = React.useState<"admin" | undefined>();
    const [itemInBasket, setItemInBasket] = React.useState<number>(0);

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
        null
    );
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
        null
    );

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
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
                        component="a"
                        href="#app-bar-with-responsive-menu"
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
                                if (page[2] === authState || page[2] === "")
                                    return (
                                        <MenuItem key={index} onClick={handleCloseNavMenu}>
                                            <Typography sx={{ textAlign: "center" }}>
                                                {page[0]}
                                            </Typography>
                                        </MenuItem>
                                    );
                            })}
                        </Menu>
                    </Box>

                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
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
                            if (page[2] === authState || page[2] === "")
                                if (page[3] === isAdmin || page[3] === undefined)
                                    return (
                                        <Button
                                            key={index}
                                            onClick={handleCloseNavMenu}
                                            sx={{ my: 2, color: "white", display: "block" }}
                                        >
                                            {page[0]}
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
                        <IconButton color="inherit">
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