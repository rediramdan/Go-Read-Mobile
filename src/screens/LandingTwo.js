import React from 'react';

import {View} from 'react-native';
import {Content, Text, Container, Spinner, Button} from 'native-base';
import Icon from 'react-native-vector-icons/Entypo';

class LandingTwo extends React.Component {
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
        <Icon style={{fontSize: 90, marginBottom: 20}} name="magnifying-glass" />
        <Text style={{fontSize: 30, marginBottom: 20,textAlign:'center'}}>
          Find the latest {'\n'} book now
        </Text>
        <Text
          note
          style={{
            textAlign: 'center',
            paddingLeft: 40,
            paddingRight: 40,
            fontSize: 16,
          }}>
          Find information immediately about the latest books on Go-Read
        </Text>
        <Button
          transparent
          dark
          style={{
            borderRadius: 10,
            marginTop: 20,
            height: 30,
            width: 120,
            justifyContent: 'center',
          }}
          onPress={() => {
            this.props.navigation.navigate('Home_');
          }}>
          <Text style={{color: 'white', fontSize: 12}}>Let's Start</Text>
          <Icon
            name="forward"
            style={{fontSize: 20, marginLeft: -10,color:'white',marginRight:10}}
          />
        </Button>
      </View>
    );
  }
}

export default LandingTwo;
