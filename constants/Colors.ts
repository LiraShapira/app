export enum Light {
  text = '#000',
  background = '#fff',
  backgroundHighlight1 = '#EBF5EB',
  backgroundHighlight2 = '#F2E4EB',
  shading = '#e0e0e0',
  highlight = '#6CB041',
  tint = '#4195B0',
  tabIconDefault = '#ccc',
  warning = '#B04141'
}

export enum Dark {
  text = '#fff',
  background = '#000',
  backgroundHighlight1 = '#EBF5EB',
  backgroundHighlight2 = '#F2E4EB',
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
