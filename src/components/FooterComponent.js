import React from 'react';
import {StyleSheet} from 'react-native';
import {Footer, FooterTab, Button, Icon, Text} from 'native-base';

const styles = StyleSheet.create({
  footertab: {
    backgroundColor: 'white',
    paddingBottom: 10,
    paddingTop: 20,
  },
});

const FooterComponent = ({active}) => {
  return (
    <Footer>
      <FooterTab style={styles.footertab}>
        <Button vertical>
          <Icon
            style={{color: `rgba(0,0,0,${active === 0 ? '1' : '0.2'})`}}
            name="home"
          />
          <Text style={{color: `rgba(0,0,0,${active === 0 ? '1' : '0.2'})`}}>
            Home
          </Text>
        </Button>
        <Button vertical>
          <Icon
            style={{color: `rgba(0,0,0,${active === 1 ? '1' : '0.2'})`}}
            name="book"
          />
          <Text style={{color: `rgba(0,0,0,${active === 1 ? '1' : '0.2'})`}}>
            My Books
          </Text>
        </Button>
      </FooterTab>
    </Footer>
  );
};

export default FooterComponent;
