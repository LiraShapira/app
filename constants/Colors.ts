export enum Light {
  text = '#000',
  background = '#fff',
  shading = '#e0e0e0',
  highlight = '#6CB041',
  tint = '#4195B0',
  tabIconDefault = '#ccc',
  warning = '#B04141'
}

export enum Dark {
  text = '#fff',
  background = '#000',
  shading = '#595858',
  highlight = '#6CB041',
  tint = '#4195B0',
  tabIconDefault = '#ccc',
  warning = '#B04141'
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
