export enum CompostStand {
  blank = '',
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
  hizkiyahu_hamelech = 'hizkiyahu_haFmelech',
  masalant = 'masalant',
  cafe_shapira = 'cafe_shapira'
}

export interface DepositForm {
  amount: number;
  binStatus?: 'empty' | 'full';
  compostSmell?: 'yes' | 'no';
  dryMatter?: 'no' | 'some' | 'yes',
  notes?: string;
  compostStand: CompostStand
}
