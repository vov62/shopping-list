import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
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

  // console.log(categoriesData);

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
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "5px",
        }}
      >
        <Box
          sx={{
            textAlign: "center",
            mt: 4,
          }}
        >
          <Typography variant="h4"> סיכום הזמנה</Typography>
        </Box>

        <Box
          sx={{
            mt: 4,
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            paddingInline: "20px",
          }}
        >
          <Box
            sx={{
              backgroundColor: "#fff",
            }}
          >
            <Typography variant="h5" sx={{ textAlign: "center", mt: 1 }}>
              פרטים אישיים
            </Typography>

            <Box
              sx={{
                width: "400px",
              }}
            >
              <Card sx={{ mt: 2 }}>
                <CardContent>
                  <form>
                    <TextField
                      name="name"
                      label="שם מלא"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      required
                      onChange={handleInput}
                      value={userData.name}
                      type="text"
                    />
                    <TextField
                      type="text"
                      name="address"
                      label="כתובת "
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      required
                      onChange={handleInput}
                      value={userData.address}
                    />
                    <TextField
                      type="email"
                      name="email"
                      label="אימייל"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      required
                      onChange={handleInput}
                      value={userData.email}
                    />
                  </form>
                </CardContent>
              </Card>
            </Box>
          </Box>

          <List
            sx={{
              width: "400px",
              backgroundColor: "#fff",
              borderRadius: "10px",
              padding: "10px 20px",
            }}
          >
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
                      <Box
                        key={item.name}
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          mt: 0.5,
                        }}
                      >
                        <Typography variant="subtitle2">{item.name}</Typography>
                        <Typography variant="body1">
                          {item.amount || 1}
                        </Typography>
                      </Box>
                    ))}
                    <Divider variant="inset" component="li" />
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
