import axios from "axios";

const fetchShoppingData = async () => {
  const base_url = "http://localhost:3000/products";

  try {
    const dataFromApi = await axios(`${base_url}`);

    if (dataFromApi.status !== 200) {
      throw new Error("Failed to fetch data");
    }

    const data = await dataFromApi.data;
    // console.log(data);

    return { data };
  } catch (error) {
    return { error: error.message };
  }
};

export default fetchShoppingData;
