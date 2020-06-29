import React from 'react';
import {Animated, StyleSheet} from 'react-native';
import {Body} from 'native-base';

const _getHeaderHeight = (scrollY, height, sizeHeight) => {
  return scrollY.interpolate({
    inputRange: [0, height],
    outputRange: [sizeHeight, 60],
    extrapolate: 'clamp',
    useNativeDriver: true,
  });
};

const _getHeaderOpacity = scrollY => {
  return scrollY.interpolate({
    inputRange: [0, 80],
    outputRange: [1, 0],
    extrapolate: 'clamp',
    useNativeDriver: true,
  });
};

const _getHeaderzIndex = scrollY => {
  return scrollY.interpolate({
    inputRange: [0, 85, 90],
    outputRange: [-1, -1, 1],
    extrapolate: 'clamp',
    useNativeDriver: true,
  });
};

const _getHeaderColor = (scrollY, height) => {
  return scrollY.interpolate({
    inputRange: [height - 10, height],
    outputRange: ['rgba(255,255,255,0)', 'rgba(255,255,255,1)'],
    extrapolate: 'clamp',
    useNativeDriver: true,
  });
};

const _getHeaderHeight2 = (scrollY, height, sizeHeight) => {
  return scrollY.interpolate({
    inputRange: [0, height],
    outputRange: [sizeHeight, 60],
    extrapolate: 'clamp',
    useNativeDriver: true,
  });
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    width: '100%',
    zIndex: 1,
  },
  wrapper2: {
    position: 'absolute',
    top: 0,
    width: '100%',
  },
});

const Header = ({
  scrollY,
  renderContent,
  source,
  setHeight = 60,
  sizeHeight = 250,
}) => {
  const heightHeader = _getHeaderHeight(scrollY, setHeight, sizeHeight);
  const opacityHeader = _getHeaderOpacity(scrollY);
  const colorHeader = _getHeaderColor(scrollY, setHeight);
  const height2Header = _getHeaderHeight2(
    scrollY,
    setHeight,
    sizeHeight >= 250 ? 140 : sizeHeight,
  );
  const zIndexHeader = _getHeaderzIndex(scrollY);
  return (
    <>
      <Animated.View
        style={[styles.wrapper2, {height: heightHeader, zIndex: zIndexHeader}]}>
        {sizeHeight >= 250 ? (
          <Animated.Image
            style={[
              StyleSheet.absoluteFill,
              {
                opacity: opacityHeader,
                height: heightHeader,
              },
            ]}
            source={{
              uri: source,
            }}
          />
        ) : null}
      </Animated.View>
      <Animated.View
        style={[
          styles.wrapper,
          {height: height2Header, backgroundColor: colorHeader},
        ]}>
        <Body>{renderContent}</Body>
      </Animated.View>
    </>
  );
};

export default Header;
