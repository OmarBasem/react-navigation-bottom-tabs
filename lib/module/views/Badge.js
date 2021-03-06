function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import { useTheme } from '@react-navigation/native';
import color from 'color';
import * as React from 'react';
import { Animated, StyleSheet } from 'react-native';
export default function Badge({
  visible = true,
  size = 18,
  children,
  style,
  ...rest
}) {
  const [opacity] = React.useState(() => new Animated.Value(visible ? 1 : 0));
  const [rendered, setRendered] = React.useState(visible ? true : false);
  const theme = useTheme();
  React.useEffect(() => {
    if (!rendered) {
      return;
    }

    Animated.timing(opacity, {
      toValue: visible ? 1 : 0,
      duration: 150,
      useNativeDriver: true
    }).start(({
      finished
    }) => {
      if (finished && !visible) {
        setRendered(false);
      }
    });
    return () => opacity.stopAnimation();
  }, [opacity, rendered, visible]);

  if (visible && !rendered) {
    setRendered(true);
  }

  if (!visible && !rendered) {
    return null;
  } // @ts-expect-error: backgroundColor definitely exists


  const {
    backgroundColor = theme.colors.notification,
    ...restStyle
  } = StyleSheet.flatten(style) || {};
  const textColor = color(backgroundColor).isLight() ? 'black' : 'white';
  const borderRadius = size / 2;
  const fontSize = Math.floor(size * 3 / 4);
  return /*#__PURE__*/React.createElement(Animated.Text, _extends({
    numberOfLines: 1,
    style: [{
      opacity,
      transform: [{
        scale: opacity.interpolate({
          inputRange: [0, 1],
          outputRange: [0.5, 1]
        })
      }],
      backgroundColor,
      color: textColor,
      fontSize,
      lineHeight: size - 1,
      height: size,
      minWidth: size,
      borderRadius
    }, styles.container, restStyle]
  }, rest), children);
}
const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-end',
    textAlign: 'center',
    paddingHorizontal: 4,
    overflow: 'hidden'
  }
});
//# sourceMappingURL=Badge.js.map