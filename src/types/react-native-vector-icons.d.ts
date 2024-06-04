declare module 'react-native-vector-icons/Icon' {
  import { Component } from 'react';
  import { TextProps } from 'react-native';

  export interface IconProps extends TextProps {
    name: string;
    size?: number;
    color?: string;
  }

  export default class Icon extends Component<IconProps> {}
}

declare module 'react-native-vector-icons/FontAwesome' {
  import Icon from 'react-native-vector-icons/Icon';
  export default class FontAwesome extends Icon {}
}

declare module 'react-native-vector-icons/MaterialCommunityIcons' {
  import Icon from 'react-native-vector-icons/Icon';
  export default class MaterialCommunityIcons extends Icon {}
}

declare module 'react-native-vector-icons/AntDesign' {
  import Icon from 'react-native-vector-icons/Icon';
  export default class AntDesign extends Icon {}
}

declare module 'react-native-vector-icons/Feather' {
  import Icon from 'react-native-vector-icons/Icon';
  export default class Feather extends Icon {}
}
declare module 'react-native-vector-icons/Ionicons' {
  import Icon from 'react-native-vector-icons/Icon';
  export default class Ionicons extends Icon {}
}
