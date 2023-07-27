import {
  AntDesign,
  Entypo,
  EvilIcons,
  Feather,
  FontAwesome,
  FontAwesome5,
  Fontisto,
  Foundation,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  Octicons,
  SimpleLineIcons,
  Zocial,
} from '@expo/vector-icons';
import { Text } from 'react-native';
import { Icon } from '@expo/vector-icons/build/createIconSet';

type GetMyClassT<C extends Icon<any, any>> = C extends Icon<infer T, any>
  ? T
  : unknown;

type AntDesignIcon = GetMyClassT<typeof AntDesign>;
type EvilIcon = GetMyClassT<typeof EvilIcons>;
type EntypoIcon = GetMyClassT<typeof Entypo>;
type FeatherIcon = GetMyClassT<typeof Feather>;
type FontistoIcon = GetMyClassT<typeof Fontisto>;
type FontAwesomeIcon = GetMyClassT<typeof FontAwesome>;
type FontAwesome5Icon = GetMyClassT<typeof FontAwesome5>;
type FoundationIcon = GetMyClassT<typeof Foundation>;
type IoniconsIcon = GetMyClassT<typeof Ionicons>;
type MaterialCommunityIconsIcon = GetMyClassT<typeof MaterialCommunityIcons>;
type MaterialIconsIcon = GetMyClassT<typeof MaterialIcons>;
type OcticonsIcon = GetMyClassT<typeof Octicons>;
type SimpleLineIconsIcon = GetMyClassT<typeof SimpleLineIcons>;
type ZocialIcon = GetMyClassT<typeof Zocial>;

type ExpoIcon =
  | {
      iconLibraryName: 'AntDesign';
      iconName: AntDesignIcon;
    }
  | {
      iconLibraryName: 'EvilIcons';
      iconName: EvilIcon;
    }
  | { iconLibraryName: 'Entypo'; iconName: EntypoIcon }
  | { iconLibraryName: 'Feather'; iconName: FeatherIcon }
  | { iconLibraryName: 'Fontisto'; iconName: FontistoIcon }
  | { iconLibraryName: 'FontAwesome'; iconName: FontAwesomeIcon }
  | { iconLibraryName: 'FontAwesome5'; iconName: FontAwesome5Icon }
  | { iconLibraryName: 'Foundation'; iconName: FoundationIcon }
  | { iconLibraryName: 'Ionicons'; iconName: IoniconsIcon }
  | {
      iconLibraryName: 'MaterialCommunityIcons';
      iconName: MaterialCommunityIconsIcon;
    }
  | { iconLibraryName: 'MaterialIcons'; iconName: MaterialIconsIcon }
  | { iconLibraryName: 'Octicons'; iconName: OcticonsIcon }
  | { iconLibraryName: 'SimpleLineIcons'; iconName: SimpleLineIconsIcon }
  | { iconLibraryName: 'Zocial'; iconName: ZocialIcon };

type CustomIconProps = ExpoIcon & {
  color?: string;
  size?: number;
  disabled?: boolean;
};

const DynamicIconComponent = ({
  iconName,
  iconLibraryName,
  color,
  size,
  disabled,
}: CustomIconProps) => {
  let Component;

  switch (iconLibraryName) {
    case 'AntDesign':
      Component = AntDesign;
      break;
    case 'EvilIcons':
      Component = EvilIcons;
      break;
    case 'Entypo':
      Component = Entypo;
      break;
    case 'Feather':
      Component = Feather;
      break;
    case 'Fontisto':
      Component = Fontisto;
      break;
    case 'FontAwesome':
      Component = FontAwesome;
      break;
    case 'FontAwesome5':
      Component = FontAwesome5;
      break;
    case 'Foundation':
      Component = Foundation;
      break;
    case 'Ionicons':
      Component = Ionicons;
      break;
    case 'MaterialCommunityIcons':
      Component = MaterialCommunityIcons;
      break;
    case 'MaterialIcons':
      Component = MaterialIcons;
      break;
    case 'Octicons':
      Component = Octicons;
      break;
    case 'SimpleLineIcons':
      Component = SimpleLineIcons;
      break;
    case 'Zocial':
      Component = Zocial;
      break;
    default:
      // Set a default component or handle the error case
      Component = () => <Text>404</Text>;
      break;
  }

  return disabled ? (
    <Component
      style={{ opacity: '50%' }}
      name={iconName}
      color={color}
      size={size}
    />
  ) : (
    <Component name={iconName} color={color} size={size} />
  );
};

export function CustomIcon(props: CustomIconProps): JSX.Element {
  return <DynamicIconComponent {...props} />;
}
