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
import { ExpoIcon, LocalIcon } from '../../types/Icons';
import { SvgProps } from 'react-native-svg';
import send_icon from '../../assets/icons/send_icon';
import request_icon_with_circle from '../../assets/icons/request_icon_with_circle';
import request_icon_with_circle_dark from '../../assets/icons/request_icon_with_circle_dark';
import request_icon from '../../assets/icons/request_icon';
import wallet_icon from '../../assets/icons/wallet_icon';
import truck_icon from '../../assets/icons/truck_icon';
import events_icon from '../../assets/icons/events_icon';
import big_tick_icon from '../../assets/icons/big_tick_icon';
import fruit_icon_7 from '../../assets/icons/fruit_icon_7';
import fruit_icon_5 from '../../assets/icons/fruit_icon_5';
import fruit_icon_6 from '../../assets/icons/fruit_icon_6';
import fruit_icon_3 from '../../assets/icons/fruit_icon_3';
import fruit_icon_4 from '../../assets/icons/fruit_icon_4';
import fruit_icon_1 from '../../assets/icons/fruit_icon_1';
import fruit_icon_2 from '../../assets/icons/fruit_icon_2';
import deposit_icon from '../../assets/icons/deposit_icon';
import send_icon_with_circle from '../../assets/icons/send_icon_with_circle';
import small_tick_icon from '../../assets/icons/small_tick_icon';
import medium_tick_icon from '../../assets/icons/medium_tick_icon';
import appColors from '../../constants/Colors';

export const iconMap: Record<string, (n: SvgProps) => JSX.Element> = {
  big_tick_icon: big_tick_icon,
  deposit_icon: deposit_icon,
  events_icon: events_icon,
  fruit_icon_1: fruit_icon_1,
  fruit_icon_2: fruit_icon_2,
  fruit_icon_3: fruit_icon_3,
  fruit_icon_4: fruit_icon_4,
  fruit_icon_5: fruit_icon_5,
  fruit_icon_6: fruit_icon_6,
  fruit_icon_7: fruit_icon_7,
  medium_tick_icon: medium_tick_icon,
  request_icon: request_icon,
  request_icon_with_circle: request_icon_with_circle,
  request_icon_with_circle_dark: request_icon_with_circle_dark,
  send_icon_with_circle: send_icon_with_circle,
  send_icon: send_icon,
  small_tick_icon: small_tick_icon,
  truck_icon: truck_icon,
  wallet_icon: wallet_icon,
};

export type CustomIconProps = ExpoIcon & {
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
    case 'Local':
      Component = iconMap[iconName];
      // custom props won't affect UI of local icons
      return <Component />;
    default:
      // Set a default component or handle the error case
      Component = () => <Text>404</Text>;
      break;
  }

  return disabled ? (
    <Component
      style={{ opacity: 0.5 }}
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
