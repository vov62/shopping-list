/* eslint-disable react/prop-types */
import { Box, Typography } from "@mui/material";

const List = ({ categoriesData, category }) => {
  const categoryItems = categoriesData[category.name] || [];

  return (
    <Box>
      <Typography variant="h6">{`${category.name} - ${categoryItems.length} מוצרים`}</Typography>
      <ul>
        {categoryItems.map((item, itemIndex) => (
          <li key={itemIndex}>
            {item.name}
            {""}
            {item.amount && item.amount > 1 && item.amount}
          </li>
        ))}
      </ul>
    </Box>
  );
};

export default List;
