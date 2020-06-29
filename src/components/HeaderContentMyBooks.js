import React from 'react';
import {StyleSheet, Text} from 'react-native';

const styles = StyleSheet.create({
  wellcome: {
    fontSize: 18,
    color: 'rgba(0,0,0,0.8)',
    position: 'absolute',
    right: 50,
    top: 15,
  },
});

const HeaderContentMyBooks = ({scrollY}) => {
  return (
    <>
      <Text style={styles.wellcome}>My Books List</Text>
    </>
  );
};

export default HeaderContentMyBooks;
