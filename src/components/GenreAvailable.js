import React from 'react';
import {SafeAreaView, FlatList, Image, StyleSheet} from 'react-native';
import {Text, CardItem} from 'native-base';

const ItemFlatlist = ({item}) => {
  return (
    <CardItem style={styles.carditemStyle}>
      <Image
        style={[StyleSheet.absoluteFill, styles.imageStyle]}
        source={{
          uri:
            'https://image.freepik.com/free-photo/stack-old-books-black-background-vintage-tone_68495-90.jpg',
        }}
      />
      <Text style={styles.h2}>{item.name}</Text>
    </CardItem>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 10,
    paddingBottom: 10,
    marginTop: 20,
  },
  header: {
    fontSize: 20,
    marginLeft: 20,
  },
  flatlistStyle: {
    height: 150,
    paddingTop: 5,
    paddingLeft: 20,
  },
  carditemStyle: {
    padding: 0,
    alignItems: 'center',
    shadowColor: 'rgba(0,0,0,0.1)',
    width: 180,
    backgroundColor: 'white',
    height: 80,
    marginRight: 20,
    borderRadius: 10,
    shadowOffset: {
      width: 9,
      height: 20,
    },
    shadowOpacity: 0.1,
    shadowRadius: 0.14,
    elevation: 12,
  },
  imageStyle: {
    borderRadius: 10,
  },
  h2: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

const GenreAvailable = ({data}) => {
  return (
    <SafeAreaView style={styles.wrapper}>
      <Text style={styles.header}>Genre Available</Text>
      <FlatList
        style={styles.flatlistStyle}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={({item}) => <ItemFlatlist item={item} />}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

export default GenreAvailable;
