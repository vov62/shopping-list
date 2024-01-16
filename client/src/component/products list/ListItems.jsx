/* eslint-disable react/prop-types */
import { Typography } from "@mui/material";
import "./listItems.scss";

const ListItems = ({ categoriesData, category }) => {
  const categoryItems = categoriesData[category.name] || [];

  return (
    <div className="list-items">
      <Typography variant="h6">{`${category.name} - ${categoryItems.length} מוצרים`}</Typography>
      <ul className="list-items-ul">
        {categoryItems.map((item) => (
          <li key={item.name}>
            {item.name} {item.amount && item.amount > 1 && item.amount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListItems;
