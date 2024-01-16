import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ShoppingList from "./pages/shoppingList/ShoppingList";
import Checkout from "./pages/checkout/Checkout";
import NotFound from "./pages/NotFound/NotFound";

function App() {
  return (
    <Router>
      <Routes>
        <Route path={"/"} element={<ShoppingList />} />
        <Route path={"/checkout"} element={<Checkout />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
