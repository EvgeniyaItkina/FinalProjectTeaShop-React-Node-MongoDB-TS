import { Box, SxProps, Theme } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useUserProducts } from "../../contexts/UserProductsContext";

const SearchBar = (prop: { sx: SxProps<Theme> | undefined }) => {
    const { serchValue, setSearchValue } = useUserProducts();

    return (
        <Box component="form" sx={prop.sx} noValidate autoComplete="off">
            <div style={{ position: "relative" }}>
                <SearchIcon
                    style={{ position: "absolute", top: 4, left: 2, color: "black" }}
                />
                <input
                    type="text"
                    style={{
                        height: "30px",
                        paddingLeft: "25px",
                        width: "100%",
                        boxSizing: "border-box",
                    }}
                    value={serchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder="Search"
                />
            </div>
        </Box>
    );
};

export default SearchBar;