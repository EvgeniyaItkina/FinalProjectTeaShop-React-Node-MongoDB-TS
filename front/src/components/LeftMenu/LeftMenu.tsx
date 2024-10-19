import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import { useMemo } from "react";
import { useUserProducts } from "../../contexts/UserProductsContext";

export const LeftMenu = () => {
  const { products } = useUserProducts();
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
            {categoriesTree.map((category) => {
              return (
                <Box key={category.category}>
                  <ListItemButton key={category.category}>
                    <ListItemText>{category.category}</ListItemText>
                  </ListItemButton>

                  <List>
                    {category.subCategories.map((subCategory) => {
                      return (
                        <ListItemButton sx={{ pl: 4 }} key={subCategory}>
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