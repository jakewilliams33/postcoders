import axios from "axios";

export const getAreaData = async (outCode, countryCode) => {
  const { data } = await axios.get(
    `https://api.zippopotam.us/${countryCode}/${outCode}`
  );

  return data.places;
};
