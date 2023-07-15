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
import { FontAwesome5IconNames } from './FontAwesome5IconNames';

// NOTE: FontAwesome5 icon names are not included in this type
export type IconName = keyof typeof MaterialIcons.glyphMap | keyof typeof AntDesign.glyphMap | keyof typeof Entypo.glyphMap | keyof typeof EvilIcons.glyphMap |
  keyof typeof Feather.glyphMap |
  keyof typeof Fontisto.glyphMap |
  keyof typeof FontAwesome.glyphMap |
  keyof typeof Foundation.glyphMap |
  keyof typeof Ionicons.glyphMap |
  keyof typeof MaterialCommunityIcons.glyphMap |
  keyof typeof MaterialIcons.glyphMap |
  keyof typeof Octicons.glyphMap |
  keyof typeof SimpleLineIcons.glyphMap |
  keyof typeof Zocial.glyphMap | FontAwesome5IconNames

export type IconLibrary = 'AntDesign' |
  'Entypo' |
  'EvilIcons' |
  'Feather' |
  'Fontisto' |
  'FontAwesome' |
  'FontAwesome5' |
  'Foundation' |
  'Ionicons' |
  'MaterialCommunityIcons' |
  'MaterialIcons' |
  'Octicons' |
  'SimpleLineIcons' |
  'Zocial'
