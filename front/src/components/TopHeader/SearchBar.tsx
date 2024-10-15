import React, { useState } from "react";
import { Box, SxProps, Theme } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = (prop: { sx: SxProps<Theme> | undefined }) => {
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const handleClearSearch = () => {
        setSearchQuery("");
    };

    return (
        <Box
            component="form"
            sx={prop.sx} noValidate autoComplete="off"
        >
            <div style={{ position: "relative" }}>
                <SearchIcon style={{ position: "absolute", top: 7, left: 2, color: "black" }} />
                <input
                    type="text"
                    style={{
                        height: "30px",
                        paddingLeft: "25px",
                        width: "100%",
                        boxSizing: "border-box",
                    }}
                    placeholder="Search"
                />
            </div>
        </Box>
    );
};

export default SearchBar;