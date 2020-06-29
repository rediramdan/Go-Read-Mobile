import React from 'react';

import {View} from 'react-native';
import {Content, Text, Container, Spinner, Button} from 'native-base';
import Icon from 'react-native-vector-icons/Entypo';

class LandingOne extends React.Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          textAlignVertical: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
        }}>
        <Icon style={{fontSize: 90, marginBottom: 20}} name="help" />
        <Text style={{fontSize: 30, marginBottom: 20}}>What is GO-Read ?</Text>
        <Text
          note
          style={{
            textAlign: 'center',
            paddingLeft: 40,
            paddingRight: 40,
            fontSize: 16,
          }}>
          An application provider of information about the latest and most
          popular books.
        </Text>
        <Button
          transparent
          dark
          style={{
            borderRadius: 10,
            marginTop: 20,
            height: 30,
            width: 100,
            justifyContent: 'center',
          }}
          onPress={() => {
            this.props.navigation.navigate('LandingTwo');
          }}>
          <Text style={{color: 'white', fontSize: 12}}>Next</Text>
        </Button>
        <Button
          transparent
          style={{marginTop: 10, height: 30}}
          onPress={() => {
            this.props.navigation.navigate('Home_');
          }}>
          <Text style={{color: 'black', fontSize: 12, marginLeft: -8}}>
            Skip
          </Text>
          <Icon
            name="controller-next"
            style={{fontSize: 20, marginLeft: -15}}
          />
        </Button>
      </View>
    );
  }
}

export default LandingOne;
