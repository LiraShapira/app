export enum CompostStand  {
  hakaveret = 'hakaveret',
  food_forest_park_hahurshot = 'food_forest_park_hahurshot',
  tel_hubez = 'tel_hubez',
  ginat_hahistadrut = 'ginat_hahistadrut',
  alexander_zaid = 'alexander_zaid',
  de_modina = 'de_modina',
  shiffer = 'shiffer',
  burma = 'burma',
  park_sonya = 'park_sonya',
  kerem_hazeitim = 'kerem_hazeitim',
  hizkiyahu_hamelech = 'hizkiyahu_hamelech',
  masalant = 'masalant',
  cafe_shapira = 'cafe_shapira'
}

export interface DepositForm {
  amount: number;
  compostSmell?: boolean;
  dryMatter?: 'no' | 'some' | 'yes';
  bugs?: boolean;
  scalesMissing?: boolean;
  compostFull?: boolean;
  cleanAndTidy?: boolean;
  notes?: string;
  compostStand: CompostStand
}
