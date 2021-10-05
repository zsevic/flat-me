import { MUNICIPALITIES } from "constants/municipalities";

export const placesMap = {
  Beograd: MUNICIPALITIES,
};

export const placesData = Object.entries(placesMap).map(([city, places]) => ({
  title: city,
  value: city,
  children: places.map((place) => ({
    title: place,
    value: place,
  })),
}));
