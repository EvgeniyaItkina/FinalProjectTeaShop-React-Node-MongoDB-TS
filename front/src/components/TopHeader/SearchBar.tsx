import React, { useState } from "react";
import { Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar: React.FC = () => {
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
            sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
            noValidate
            autoComplete="off"
        >
            <div style={{ position: "relative" }}>
                <SearchIcon style={{ position: "absolute", top: 7, left: 2, color: "black" }} />
                <input
                    type="text"
                    style={{
                        height: "30px",
                        paddingLeft: "25px",
                    }}
                    placeholder="Search"
                />
            </div>
        </Box>
    );
};

export default SearchBar;