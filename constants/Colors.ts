const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';

export enum Light {
  text = '#000',
  background = '#fff',
  shading = '#e0e0e0',
  highlight = '#BBE698',
  tint = tintColorLight,
  tabIconDefault = '#ccc',
  tabIconSelected = tintColorLight,
}

export enum Dark {
  text = '#fff',
  background = '#000',
  shading = '#595858',
  highlight = '#BBE698',
  tint = tintColorDark,
  tabIconDefault = '#ccc',
  tabIconSelected = tintColorDark,
}

export type AppColor = Dark | Light;

interface AppColors {
  dark: typeof Dark;
  light: typeof Light;
}

const appColors: AppColors = {
  dark: Dark,
  light: Light
};

export default appColors
