import { LocalIcon} from "../../types/Icons";
import { SvgProps } from 'react-native-svg';
import send_icon from "./send_icon";
import request_icon_with_circle from "./request_icon_with_circle";
import request_icon_with_circle_dark from "./request_icon_with_circle_dark";
import request_icon from "./request_icon";
import wallet_icon from "./wallet_icon";
import truck_icon from "./truck_icon";
import events_icon from "./events_icon";
import big_tick_icon from "./big_tick_icon";
import fruit_icon_7 from "./fruit_icon_7";
import fruit_icon_5 from "./fruit_icon_5";
import fruit_icon_6 from "./fruit_icon_6";
import fruit_icon_3 from "./fruit_icon_3";
import fruit_icon_4 from "./fruit_icon_4";
import fruit_icon_1 from "./fruit_icon_1";
import fruit_icon_2 from "./fruit_icon_2";
import deposit_icon from "./deposit_icon";
import send_icon_with_circle from "./send_icon_with_circle";
import small_tick_icon from "./small_tick_icon";
import medium_tick_icon from "./medium_tick_icon";

export const iconMap: Record<LocalIcon, (n: SvgProps)=>JSX.Element> = {
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
  request_icon_with_circle: request_icon_with_circle,
  request_icon: request_icon,
  send_icon_with_circle: send_icon_with_circle,
  send_icon: send_icon,
  small_tick_icon: small_tick_icon,
  truck_icon: truck_icon,
  wallet_icon: wallet_icon,
  request_icon_with_circle_dark: request_icon_with_circle_dark,
}
