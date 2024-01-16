import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  Divider,
  List,
} from "@mui/material";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { CLEAR_CATEGORIES } from "../../redux/features/fetchDataSlice";
import "./checkout.scss";

const Checkout = () => {
  const dispatch = useDispatch();
  const { categoriesData } = useSelector((state) => state.data);

  const [userData, setUserData] = useState({
    name: "",
    address: "",
    email: "",
  });

  const handleInput = (e) => {
    e.persist();
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !userData.name ||
      !userData.address ||
      !userData.email ||
      Object.keys(categoriesData).length === 0
    ) {
      toast.error("אנא מלאו את כל השדות", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    const options = {
      name: userData.name,
      address: userData.address,
      email: userData.email,
      categoriesData: JSON.stringify(categoriesData),
    };

    // post
    try {
      const res = await axios.post(
        "http://localhost:3000/submitOrder",
        options
      );
      // console.log(res.data);

      if (res.status === 200) {
        setUserData({
          name: "",
          address: "",
          email: "",
        });
        dispatch(CLEAR_CATEGORIES());
        toast.success("הזמנתכם התקבלה!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("שגיאה!");
    }
  };

  return (
    <Container>
      <Box className="checkout-wrapper">
        <Box
          sx={{
            textAlign: "center",
            mt: 4,
          }}
        >
          <Typography variant="h4"> סיכום הזמנה</Typography>
        </Box>

        <Box className="details-wrapper">
          <Box className="personal-details ">
            <Card sx={{ py: 2 }}>
              <Typography variant="h5" sx={{ textAlign: "center", mt: 1 }}>
                פרטים אישיים
              </Typography>
              <CardContent>
                <form>
                  <input
                    type="text"
                    name="name"
                    placeholder="שם מלא"
                    onChange={handleInput}
                    value={userData.name}
                  />
                  <input
                    type="text"
                    name="address"
                    placeholder="כתובת"
                    onChange={handleInput}
                    value={userData.address}
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="אימייל"
                    onChange={handleInput}
                    value={userData.email}
                  />
                </form>
              </CardContent>
            </Card>
          </Box>

          <Box className="order-details">
            <Card>
              <CardContent>
                <List>
                  <Typography variant="h5" sx={{ textAlign: "center" }}>
                    עגלת הקניות
                  </Typography>

                  {Object.keys(categoriesData).length > 0 ? (
                    Object.entries(categoriesData).map(
                      ([categoryName, categoryItems]) => (
                        <Box key={categoryName}>
                          <Typography variant="h6" sx={{ mt: 1 }}>
                            {categoryName}
                          </Typography>
                          {categoryItems.map((item) => (
                            <Box key={item.name} className="list-item">
                              <Typography variant="subtitle2">
                                {item.name}
                              </Typography>
                              <Typography variant="body1">
                                {item.amount || 1}
                              </Typography>
                            </Box>
                          ))}
                          <Divider variant="inset" />
                        </Box>
                      )
                    )
                  ) : (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Typography variant="h6">אין פריטים כרגע</Typography>
                    </Box>
                  )}
                </List>
              </CardContent>
            </Card>
          </Box>
        </Box>

        <Box sx={{ mt: 2 }}>
          <button className="order-Btn" type="submit" onClick={handleSubmit}>
            אשר הזמנה
          </button>
        </Box>
      </Box>
    </Container>
  );
};

export default Checkout;
