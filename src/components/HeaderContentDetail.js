import React from 'react';
import {Animated, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {View} from 'native-base';

const _getTitleColor = scrollY => {
  return scrollY.interpolate({
    inputRange: [50, 80],
    outputRange: ['white', 'black'],
    extrapolate: 'clamp',
    useNativeDriver: true,
  });
};

const styles = StyleSheet.create({
  sizeFont: {
    fontSize: 22,
  },
  wellcome: {
    position: 'absolute',
    right: 140,
    top: 18,
    zIndex: 10,
  },
});

const HeaderContentDetail = ({scrollY, navigation}) => {
  const color = _getTitleColor(scrollY);
  console.log(navigation);
  return (
    <View style={styles.wellcome}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Animated.Text style={[{color: color}]}>
          <Icon name="arrowleft" style={styles.sizeFont} />
        </Animated.Text>
      </TouchableOpacity>
    </View>
  );
};

export default HeaderContentDetail;
