// rootReducer.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  data: [],
  error: "",
  categoriesData: {},
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    DATA_FETCH_REQUESTED: (state) => {
      return { ...state, isLoading: true, error: null };
    },
    DATA_FETCH_FAILED: (state, action) => {
      return { ...state, isLoading: false, error: action.payload };
    },
    DATA_FETCH_SUCCEED: (state, action) => {
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };
    },
    ADD_ITEM_TO_CATEGORY: (state, action) => {
      const { category, item } = action.payload;

      // Deep copy the state
      const updatedCategoriesData = JSON.parse(
        JSON.stringify(state.categoriesData)
      );

      if (!updatedCategoriesData[category]) {
        updatedCategoriesData[category] = [];
      }

      const categoryItems = updatedCategoriesData[category];
      const existingItemIndex = categoryItems.findIndex(
        (existingItem) => existingItem.name === item.name
      );

      if (existingItemIndex !== -1) {
        // If the item already exists, update the amount
        categoryItems[existingItemIndex].amount =
          (categoryItems[existingItemIndex].amount || 1) + 1;
      } else {
        // If the item doesn't exist, add a new item
        categoryItems.push({ ...item, amount: 1 });
      }

      return { ...state, categoriesData: updatedCategoriesData };
    },
    CLEAR_CATEGORIES: (state) => {
      return {
        ...state,
        categoriesData: {},
      };
    },
  },
});

export const {
  DATA_FETCH_REQUESTED,
  DATA_FETCH_FAILED,
  DATA_FETCH_SUCCEED,
  ADD_ITEM_TO_CATEGORY,
  CLEAR_CATEGORIES,
} = dataSlice.actions;

export const { actions, reducer } = dataSlice;
