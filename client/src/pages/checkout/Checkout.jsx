import {
  Container,
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  TextField,
  Divider,
  List,
} from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const Checkout = () => {
  const {
    data: categories,
    isLoading,
    categoriesData,
  } = useSelector((state) => state.data);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userData);

    // post
    // axios.post
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
              // border: "1px solid red",
              backgroundColor: "#fff",
            }}
          >
            <Typography variant="h5" sx={{ textAlign: "center", mt: 1 }}>
              פרטים אישיים
            </Typography>

            <Box
              sx={{
                // border: "1px solid red",
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
                    />
                    <TextField
                      name="address"
                      label="כתובת מלאה"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      required
                      onChange={handleInput}
                      value={userData.address}
                    />
                    <TextField
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

            {categoriesData.length > 0 ? (
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
          <Button variant="contained" type="submit" onClick={handleSubmit}>
            אשר הזמנה
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Checkout;
