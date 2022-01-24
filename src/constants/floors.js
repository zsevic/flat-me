export const floorsLocaleMap = {
  cellar: "u podrumu",
  "semi-basement": "u polusuterenu",
  basement: "u suterenu",
  "low ground floor": "na niskom prizemlju",
  "ground floor": "na prizemlju",
  "high ground floor": "na visokom prizemlju",
  attic: "u potkrovlju",
  "2-4": "2-4. sprat",
  "5-10": "5-10. sprat",
  "11+": "11+. sprat",
};

export const floorFilters = [
  {
    value: "not-basement",
    locale: "Nije u suterenu",
  },
  {
    value: "not-ground-floor",
    locale: "Nije na prizemlju",
  },
  {
    value: "not-attic",
    locale: "Nije u potkrovlju",
  },
];
