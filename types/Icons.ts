import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { Zocial } from '@expo/vector-icons';
// NOTE: no type is provided here
import { FontAwesome5 } from '@expo/vector-icons';
// so we created and added FontAwesome5 icon name type
import { FontAwesome5IconNames as FontAwesome5Icon } from './FontAwesome5IconNames';
import { Icon } from "@expo/vector-icons/build/createIconSet";

export type LocalIcon = 'big_tick_icon'
  | 'deposit_icon'
  | 'events_icon'
  | 'fruit_icon_1'
  | 'fruit_icon_2'
  | 'fruit_icon_3'
  | 'fruit_icon_4'
  | 'fruit_icon_5'
  | 'fruit_icon_6'
  | 'fruit_icon_7'
  | 'medium_tick_icon'
  | 'request_icon_with_circle'
  | 'request_icon'
  | 'send_icon_with_circle'
  | 'send_icon'
  | 'small_tick_icon'
  | 'truck_icon'
  | 'wallet_icon'
  | 'request_icon_with_circle_dark'

export enum IconLibrary {
  AntDesign = 'AntDesign',
  Entypo = 'Entypo',
  EvilIcons = 'EvilIcons',
  Feather = 'Feather',
  Fontisto = 'Fontisto',
  FontAwesome = 'FontAwesome',
  FontAwesome5 = 'FontAwesome5',
  Foundation = 'Foundation',
  Ionicons = 'Ionicons',
  MaterialCommunityIcons = 'MaterialCommunityIcons',
  MaterialIcons = 'MaterialIcons',
  Octicons = 'Octicons',
  SimpleLineIcons = 'SimpleLineIcons',
  Zocial = 'Zocial',
  Local = 'Local',
}


export type GetMyClassT<C extends Icon<any, any>> = C extends Icon<infer T, any>
  ? T
  : unknown;

export type AntDesignIcon = GetMyClassT<typeof AntDesign>;
export type EvilIcon = GetMyClassT<typeof EvilIcons>;
export type EntypoIcon = GetMyClassT<typeof Entypo>;
export type FeatherIcon = GetMyClassT<typeof Feather>;
export type FontistoIcon = GetMyClassT<typeof Fontisto>;
export type FontAwesomeIcon = GetMyClassT<typeof FontAwesome>;
// export type FontAwesome5Icon = GetMyClassT<typeof FontAwesome5>;
export type FoundationIcon = GetMyClassT<typeof Foundation>;
export type IoniconsIcon = GetMyClassT<typeof Ionicons>;
export type MaterialCommunityIconsIcon = GetMyClassT<typeof MaterialCommunityIcons>;
export type MaterialIconsIcon = GetMyClassT<typeof MaterialIcons>;
export type OcticonsIcon = GetMyClassT<typeof Octicons>;
export type SimpleLineIconsIcon = GetMyClassT<typeof SimpleLineIcons>;
export type ZocialIcon = GetMyClassT<typeof Zocial>;

interface AntDesignLibraryAndIcon { iconLibraryName: IconLibrary.AntDesign; iconName: AntDesignIcon }
interface EvilIconsLibraryAndIcon { iconLibraryName: IconLibrary.EvilIcons; iconName: EvilIcon }
interface EntypoLibraryAndIcon { iconLibraryName: IconLibrary.Entypo; iconName: EntypoIcon }
interface FeatherLibraryAndIcon { iconLibraryName: IconLibrary.Feather; iconName: FeatherIcon }
interface FontistoLibraryAndIcon { iconLibraryName: IconLibrary.Fontisto; iconName: FontistoIcon }
interface FontAwesomeLibraryAndIcon { iconLibraryName: IconLibrary.FontAwesome; iconName: FontAwesomeIcon }
interface FontAwesome5LibraryAndIcon { iconLibraryName: IconLibrary.FontAwesome5; iconName: FontAwesome5Icon }
interface FoundationLibraryAndIcon { iconLibraryName: IconLibrary.Foundation; iconName: FoundationIcon }
interface IoniconsLibraryAndIcon { iconLibraryName: IconLibrary.Ionicons; iconName: IoniconsIcon }
interface MaterialCommunityIconsLibraryAndIcon { iconLibraryName: IconLibrary.MaterialCommunityIcons; iconName: MaterialCommunityIconsIcon }
interface MaterialIconsLibraryAndIcon { iconLibraryName: IconLibrary.MaterialIcons; iconName: MaterialIconsIcon }
interface OcticonsLibraryAndIcon { iconLibraryName: IconLibrary.Octicons; iconName: OcticonsIcon }
interface SimpleLineIconsLibraryAndIcon { iconLibraryName: IconLibrary.SimpleLineIcons; iconName: SimpleLineIconsIcon }
interface ZocialLibraryAndIcon { iconLibraryName: IconLibrary.Zocial; iconName: ZocialIcon }
interface LocalLibraryAndIcon { iconLibraryName: IconLibrary.Local; iconName: LocalIcon }


export type ExpoIcon = AntDesignLibraryAndIcon
  | EvilIconsLibraryAndIcon
  | EntypoLibraryAndIcon
  | FeatherLibraryAndIcon
  | FontistoLibraryAndIcon
  | FontAwesomeLibraryAndIcon
  | FontAwesome5LibraryAndIcon
  | FoundationLibraryAndIcon
  | IoniconsLibraryAndIcon
  | MaterialCommunityIconsLibraryAndIcon
  | MaterialIconsLibraryAndIcon
  | OcticonsLibraryAndIcon
  | SimpleLineIconsLibraryAndIcon
  | ZocialLibraryAndIcon
  | LocalLibraryAndIcon
