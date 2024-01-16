import { Container, Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListItems from "../../component/products list/ListItems";
import { useSelector, useDispatch } from "react-redux";
import {
  DATA_FETCH_REQUESTED,
  ADD_ITEM_TO_CATEGORY,
} from "../../redux/features/fetchDataSlice";
import Spinner from "../../component/spinner/Spinner";
import "./shoppingList.scss";

const ShoppingList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    dispatch(DATA_FETCH_REQUESTED());
  }, [dispatch]);

  const {
    data: categories,
    isLoading,
    categoriesData,
  } = useSelector((state) => state.data);

  const addProductHandle = () => {
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
  const clickHandle = () => {
    navigate("/checkout");
  };

  return (
    <Container sx={{ mt: 5 }}>
      <Box className="wrapper">
        <Typography variant="h3">רשימת קניות</Typography>
        <Box
          sx={
            {
              // width: "100%",
            }
          }
          className="total-items"
        >
          <Typography variant="h6">
            סה&quot;כ:
            <span>
              (
              {Object.values(categoriesData).reduce((total, categoryItems) => {
                return total + categoryItems.length;
              }, 0)}
              )
            </span>
            מוצרים
          </Typography>
        </Box>

        <Box>
          <Box className="form-category">
            <input
              type="text"
              name="firstname"
              placeholder="מוצר"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />

            <select
              id="country"
              name="country"
              value={selectedCategory}
              onChange={handleChange}
            >
              <option value="" defaultValue="קטגוריה" disabled hidden>
                קטגוריה
              </option>

              {categories.length > 0 &&
                categories.map((category) => {
                  return (
                    <option key={category.category_id} value={category.name}>
                      {category.name}
                    </option>
                  );
                })}
            </select>

            <button className="add-Btn" onClick={addProductHandle}>
              הוסף
            </button>
          </Box>
        </Box>

        {/* list of all categories */}
        <Box className="products-list-container">
          {isLoading ? (
            <Spinner />
          ) : (
            categories.length > 0 &&
            categories.map((category) => (
              <ListItems
                key={category.category_id}
                categoriesData={categoriesData}
                category={category}
              />
            ))
          )}
        </Box>

        <button className="order-Btn" type="button" onClick={clickHandle}>
          סיים הזמנה
        </button>
      </Box>
    </Container>
  );
};

export default ShoppingList;
