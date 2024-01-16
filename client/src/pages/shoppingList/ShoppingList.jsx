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
import { useNavigate } from "react-router-dom";
import List from "./List";
import { useSelector, useDispatch } from "react-redux";
import {
  DATA_FETCH_REQUESTED,
  ADD_ITEM_TO_CATEGORY,
} from "../../redux/features/fetchDataSlice";

const ShoppingList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  // const [categoriesData, setCategoriesData] = useState({});

  useEffect(() => {
    dispatch(DATA_FETCH_REQUESTED());
  }, [dispatch]);

  const {
    data: categories,
    isLoading,
    categoriesData,
  } = useSelector((state) => state.data);
  // console.log(categories);

  const clickHandle = () => {
    if (inputValue && selectedCategory) {
      dispatch(
        ADD_ITEM_TO_CATEGORY({
          category: selectedCategory,
          item: { name: inputValue },
        })
      );

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
          gap: "25px",
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
            {Object.values(categoriesData).reduce((total, categoryItems) => {
              return total + categoryItems.length;
            }, 0)}
            מוצרים
          </Typography>
        </Box>
        <Box sx={{ mt: 4 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
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
          {isLoading ? (
            <div>loading...</div>
          ) : (
            categories.length > 0 &&
            categories.map((category) => (
              <List
                key={category.category_id}
                categoriesData={categoriesData}
                category={category}
              />
            ))
          )}
        </Box>

        <Button onClick={() => navigate("/checkout")} variant="contained">
          סיים הזמנה
        </Button>
      </Box>
    </Container>
  );
};

export default ShoppingList;
