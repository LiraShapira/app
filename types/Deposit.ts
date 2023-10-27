export enum CompostStand  {
  hakaveret = 'hakaveret',
  food_forest_park_hahurshot = 'food_forest_park_hahurshot',
  tel_hubez = 'tel_hubez',
  ginat_hahistadrut = 'ginat_hahistadrut',
  alexander_zaid = 'alexander_zaid',
  de_Modina = 'de_Modina',
  shiffer = 'shiffer',
  Burma = 'Burma',
}

export interface DepositForm {
  amount: number;
  binStatus?: 'empty' | 'full';
  compostSmell?: 'yes' | 'no';
  dryMatter?: 'no' | 'some' | 'yes',
  notes?: string;
  compostStand: CompostStand
}
