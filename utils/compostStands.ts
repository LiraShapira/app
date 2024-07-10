import { CompostStand } from "../types/Deposit";

export const compostStands: CompostStand[] = [
  CompostStand.hakaveret,
  CompostStand.food_forest_park_hahurshot,
  CompostStand.tel_hubez,
  CompostStand.ginat_hahistadrut,
  CompostStand.alexander_zaid,
  CompostStand.de_modina,
  CompostStand.shiffer,
  CompostStand.burma,
  CompostStand.park_sonya,
  CompostStand.kerem_hazeitim,
  CompostStand.hizkiyahu_hamelech,
  CompostStand.masalant,
  CompostStand.cafe_shapira
]

export const standsIdToNameMap: Record<number, CompostStand> = {
  2: CompostStand.hakaveret,
  3: CompostStand.food_forest_park_hahurshot,
  4: CompostStand.tel_hubez,
  5: CompostStand.ginat_hahistadrut,
  6: CompostStand.alexander_zaid,
  7: CompostStand.de_modina,
  8: CompostStand.shiffer,
  9: CompostStand.burma,
  10: CompostStand.park_sonya,
  11: CompostStand.kerem_hazeitim,
  12: CompostStand.hizkiyahu_hamelech,
  13: CompostStand.masalant,
  14: CompostStand.cafe_shapira,
};

export const standsNameToIdMap: Record<CompostStand, number> = {
  hakaveret: 2,
  food_forest_park_hahurshot: 3,
  tel_hubez: 4,
  ginat_hahistadrut: 5,
  alexander_zaid: 6,
  de_modina: 7,
  shiffer: 8,
  burma: 9,
  park_sonya: 10,
  kerem_hazeitim: 11,
  hizkiyahu_hamelech: 12,
  masalant: 13,
  cafe_shapira: 14,
};
