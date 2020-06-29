import React from 'react';
import {Animated, StyleSheet} from 'react-native';
import {Item, Input, Icon} from 'native-base';

const _getSearchTop = scrollY => {
  return scrollY.interpolate({
    inputRange: [0, 60],
    outputRange: [95, 10],
    extrapolate: 'clamp',
    useNativeDriver: true,
  });
};

const _getSearchBackgroundColor = scrollY => {
  return scrollY.interpolate({
    inputRange: [0, 60, 80],
    outputRange: [
      'rgba(255,255,255,1)',
      'rgba(255,255,255,1)',
      'rgba(0,0,0,0.1)',
    ],
    extrapolate: 'clamp',
    useNativeDriver: true,
  });
};

const _getTitleOpacity = scrollY => {
  return scrollY.interpolate({
    inputRange: [0, 20, 50],
    outputRange: [1, 0.1, 0],
    extrapolate: 'clamp',
    useNativeDriver: true,
  });
};

const _getTitleZIndex = scrollY => {
  return scrollY.interpolate({
    inputRange: [0, 80],
    outputRange: [999, -9999],
    extrapolate: 'clamp',
    useNativeDriver: true,
  });
};

const styles = StyleSheet.create({
  item: {
    borderColor: 'transparent',
    paddingLeft: 15,
    borderRadius: 10,
    height: 40,
    width: 325,
  },
  sizeFont: {
    fontSize: 12,
  },
  colorFont: {
    color: 'rgba(0,0,0,0.2)',
  },
  wellcome: {
    fontSize: 22,
    color: 'white',
    fontWeight: 'bold',
    position: 'absolute',
    left: 10,
    top: 20,
  },
  h1: {
    fontSize: 33,
    position: 'absolute',
    left: 10,
    top: 45,
    color: 'white',
    fontWeight: 'bold',
  },
});

const HeaderContentHome = ({scrollY, onSearch}) => {
  const topSearch = _getSearchTop(scrollY);
  const backgroundColorSearch = _getSearchBackgroundColor(scrollY);
  const titleOpacity = _getTitleOpacity(scrollY);
  const titleZIndex = _getTitleZIndex(scrollY);
  const [tmp, setTmp] = React.useState(null);
  return (
    <>
      <Animated.Text
        style={[styles.wellcome, {zIndex: titleZIndex, opacity: titleOpacity}]}>
        Wellcome to
      </Animated.Text>
      <Animated.Text
        style={[styles.h1, {zIndex: titleZIndex, opacity: titleOpacity}]}>
        GO-Read
      </Animated.Text>
      <Item
        style={[
          styles.item,
          {
            backgroundColor: backgroundColorSearch,
            marginTop: topSearch,
          },
        ]}>
        <Icon style={styles.colorFont} name="ios-search" />
        <Input
          placeholderTextColor={'rgba(0,0,0,0.2)'}
          style={styles.sizeFont}
          onChangeText={e => {
            setTmp(e);
          }}
          onSubmitEditing={() => {
            onSearch(tmp)
          }}
          placeholder="Search by name, author, genre"
        />
      </Item>
    </>
  );
};

export default HeaderContentHome;
