import React from 'react';

import {Animated, StyleSheet, SafeAreaView, View} from 'react-native';
import {Container, Text, Button, Icon, Spinner} from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
const styles = StyleSheet.create({
  bg: {
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  wrapper: {
    shadowColor: 'black',
    shadowOffset: {
      width: 9,
      height: 20,
    },
    width: '100%',
    minHeight: 500,
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: 'center',
    shadowOpacity: 1,
    shadowRadius: 0.14,
    elevation: 12,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: 300,
    backgroundColor: 'white',
  },
  thumbWrapper: {
    width: 110,
    borderRadius: 10,
    height: 160,
    position: 'absolute',
    right: 40,
  },
  thumb: {
    borderRadius: 10,
  },
  title: {
    position: 'absolute',
    fontWeight: 'bold',
    zIndex: 10,
  },
  contentWrapper: {
    position: 'absolute',
    width: 30,
    height: 4,
    top: 10,
    borderRadius: 2,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  fulllWidth: {
    width: '100%',
    textAlign: 'center',
    color: 'rgba(0,0,0,0.3)',
  },
  mt: {
    marginTop: 80,
  },
  available: {
    color: 'green',
  },
  button: {
    borderRadius: 10,
    justifyContent: 'center',
    marginTop: 20,
    width: 200,
  },
});

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }

  onLogout = async () => {
    this.setState({
      isLoading: true,
    });
    await AsyncStorage.removeItem('_token');
    this.setState({
      isLoading: false,
    });
    this.props.navigation.navigate('Home_');
  };

  render() {
    return (
      <Container style={styles.bg}>
        <Animated.ScrollView
          overScrollMode={'never'}
          scrollEventThrottle={16}
          onScroll={Animated.event([
            {
              nativeEvent: {contentOffset: {y: this.state.scrollY}},
            },
          ])}>
          <SafeAreaView style={styles.wrapper}>
            <View style={styles.contentWrapper} />
            <Icon name="warning" style={[styles.fulllWidth, styles.mt]} />
            <Text style={[styles.fulllWidth]}>Are you sure?</Text>
            <Button
              dark
              style={styles.button}
              onPress={() => {
                this.onLogout();
              }}>
              {this.state.isLoading ? (
                <Spinner color="white" />
              ) : (
                <Text>Logout</Text>
              )}
            </Button>
          </SafeAreaView>
        </Animated.ScrollView>
      </Container>
    );
  }
}

export default Profile;
