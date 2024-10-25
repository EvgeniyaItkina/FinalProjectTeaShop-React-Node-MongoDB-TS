import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import { useMemo } from "react";
import { useUserProducts } from "../../contexts/UserProductsContext";
import { useNavigate } from "react-router-dom";

export const LeftMenu = () => {
  const { products,
    setSelectedCategory,
    setSubSelectedCategory,
    selectedCategory,
    subSelectedCategory, } = useUserProducts();
    const navigate = useNavigate();
  const categoriesTree = useMemo(() => {
    const categories = products.map((product) => product.category);
    const uniqueCategories = [...new Set(categories)];
    const categoriesTree = uniqueCategories.map((category) => {
      const subCategories = products
        .filter((product) => product.category === category)
        .map((product) => {
          if (product.subCategory) return product.subCategory;
        })
        .filter(Boolean);
      const uniqueSubCategories = [...new Set(subCategories)];
      return { category, subCategories: uniqueSubCategories };
    });

    return categoriesTree;
  }, [products]);

  if (products)
    return (
      <>
        {categoriesTree && (
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader component="h1" id="nested-list-subheader">
                Categories
              </ListSubheader>
            }
          >
            <Box>
              <ListItemButton
                sx={{
                  backgroundColor:
                    !selectedCategory && !subSelectedCategory
                      ? "lightgray"
                      : "",
                }}
                onClick={() => {
                  setSelectedCategory(undefined);
                  setSubSelectedCategory(undefined);
                  navigate("/");
                }}
              >
                <ListItemText>All</ListItemText>
              </ListItemButton>
            </Box>
            {categoriesTree.map((category) => {
              return (
                <Box key={category.category}>
                  <ListItemButton key={category.category}
                    sx={{
                      backgroundColor:
                        selectedCategory === category.category &&
                        !subSelectedCategory
                          ? "lightgray"
                          : "",
                    }}
                    onClick={() => {
                      setSelectedCategory(category.category);
                      setSubSelectedCategory(undefined);
                      navigate("/");
                    }}
                    >
                    <ListItemText>{category.category}</ListItemText>
                  </ListItemButton>

                  <List>
                    {category.subCategories.map((subCategory) => {
                      return (
                        <ListItemButton sx={{
                          pl: 4,
                          backgroundColor:
                            subSelectedCategory === subCategory
                              ? "lightgray"
                              : "",
                        }}
                        key={subCategory}
                        onClick={() => {
                          setSelectedCategory(category.category);
                          setSubSelectedCategory(subCategory);
                          navigate("/");
                        }}
                        >
                          <ListItemText
                            primaryTypographyProps={{ variant: "body2" }}
                          >
                            {subCategory}
                          </ListItemText>
                        </ListItemButton>
                      );
                    })}
                  </List>
                </Box>
              );
            })}
          </List>
        )}
      </>
    );
};