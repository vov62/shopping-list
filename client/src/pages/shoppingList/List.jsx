/* eslint-disable react/prop-types */
import { Box, Typography } from "@mui/material";

const List = ({ categoriesData, category }) => {
  const categoryItems = categoriesData[category.name] || [];

  //   console.log(categoriesData);

  return (
    <Box>
      <Typography variant="h6">{`${category.name} - ${categoryItems.length} מוצרים`}</Typography>
      <ul>
        {categoryItems.map((item) => (
          <li key={item.name}>
            {item.name} {item.amount && item.amount > 1 && item.amount}
          </li>
        ))}
      </ul>
    </Box>
  );
};

export default List;
