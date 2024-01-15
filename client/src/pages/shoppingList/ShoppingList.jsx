import {
  Container,
  Box,
  Typography,
  Button,
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import List from "./List";

const ShoppingList = () => {
  const [inputValue, setInputValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categoriesData, setCategoriesData] = useState({});
  const [categories, setCategories] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axios("http://localhost:3000/products");
      setCategories(res.data);
      // console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const clickHandle = () => {
    if (inputValue && selectedCategory) {
      setCategoriesData((prevData) => {
        const updatedCategories = { ...prevData };

        // Check if selectedCategory already exists in the categoriesData
        if (!updatedCategories[selectedCategory]) {
          updatedCategories[selectedCategory] = [];
        }

        const categoryItems = updatedCategories[selectedCategory];
        const existingItemIndex = categoryItems.findIndex(
          (item) => item.name === inputValue
        );

        if (existingItemIndex !== -1) {
          // Item already exists, update the amount
          categoryItems[existingItemIndex].amount =
            (categoryItems[existingItemIndex].amount || 1) + 1;
        } else {
          // Item doesn't exist, add a new item
          categoryItems.push({ name: inputValue, amount: 1 });
        }

        return updatedCategories;
      });

      setInputValue("");
      setSelectedCategory("");
    }
  };

  const handleChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <Container sx={{ mt: 5 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <Typography variant="h3">רשימת קניות</Typography>
        <Box
          sx={{
            width: "100%",
            px: 3,
            textAlign: "left",
          }}
        >
          <Typography variant="h6">
            סה"כ:
            {selectedCategory && categoriesData[selectedCategory]
              ? categoriesData[selectedCategory].length
              : 0}
            מוצרים
          </Typography>
        </Box>
        <Box sx={{ mt: 4 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              justifyContent: "space-evenly",
            }}
          >
            <TextField
              label="מוצר"
              variant="outlined"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />

            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">קטגוריה</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedCategory}
                label="קטגוריה"
                onChange={handleChange}
              >
                <MenuItem value="">כל הקטגוריות</MenuItem>
                {categories.length > 0 &&
                  categories.map((category) => {
                    return (
                      <MenuItem
                        key={category.category_id}
                        value={category.name}
                      >
                        {category.name}
                      </MenuItem>
                    );
                  })}
              </Select>
            </FormControl>
            <Button variant="outlined" onClick={clickHandle}>
              הוסף
            </Button>
          </Box>
        </Box>

        {/* list to products */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          {categories.length > 0 &&
            categories.map((category) => {
              return (
                <>
                  <List
                    key={category.category_id}
                    categoriesData={categoriesData}
                    category={category}
                  />
                </>
              );
            })}
        </Box>

        <Button variant="contained">סיים הזמנה</Button>
      </Box>
    </Container>
  );
};

export default ShoppingList;
