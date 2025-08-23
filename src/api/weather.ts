import axios from "axios";

export const getWeather = async (city: string) => {
  try {
    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=Tashkent&appid=8cf356f52e88a2d6b48f4dc7376a7939&units=metric`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
