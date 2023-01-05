import axios from "axios";

export const getAreaData = async (outCode, countryCode) => {
  const url = `https://api.zippopotam.us/${countryCode}/${outCode}`;

  const cachedData = JSON.parse(localStorage.getItem(url));

  if (!cachedData) {
    const { data } = await axios.get(url);
    localStorage.setItem(url, JSON.stringify(data));
    return data.places;
  }
  return cachedData.places;
};
