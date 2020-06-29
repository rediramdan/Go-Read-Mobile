import React from 'react';
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  Text,
  CardItem,
  Left,
  Thumbnail,
  Body,
  Button,
  Spinner,
} from 'native-base';

const ItemCustom = ({item, navigation}) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate('Detail', {item})}>
      <CardItem style={styles.carditem}>
        <Left style={styles.left}>
          <Thumbnail
            square
            style={styles.thumb}
            source={{
              uri: 'http://192.168.43.67:3001/public/images/' + item.image,
            }}
          />
          <Body>
            <Text numberOfLines={2}>{item.title}</Text>
            <Text note numberOfLines={1}>
              {item.author_name}
            </Text>
            <Text note>{item.genre_name}</Text>
          </Body>
        </Left>
      </CardItem>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    shadowColor: 'black',
    shadowOffset: {
      width: 9,
      height: 20,
    },
    shadowOpacity: 1,
    shadowRadius: 0.14,
    elevation: 12,
    minHeight: 410,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  header: {
    marginBottom: 10,
    marginLeft: 20,
    marginTop: 10,
    fontSize: 17,
  },
  carditem: {
    paddingTop: 5,
  },
  left: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
    paddingBottom: 10,
  },
  thumb: {
    width: 80,
    height: 110,
    borderRadius: 10,
    marginLeft: 20,
    marginRight: 20,
  },
  not: {
    alignSelf: 'center',
    color: 'rgba(0,0,0,0.2)',
  },
  mtmin: {
    marginTop: -10,
  },
  jus: {
    justifyContent: 'center',
  },
});

const ContentApp = ({data, navigation, onLoadMore, isLoading, marginTop}) => {
  const margin = parseInt(marginTop);
  return (
    <SafeAreaView style={[styles.wrapper, {marginTop: margin}]}>
      <Text style={styles.header}>
        {marginTop > 0 ? 'Books List' : 'Discover New'}
      </Text>
      <FlatList
        data={data}
        renderItem={({item}) => (
          <ItemCustom item={item} navigation={navigation} />
        )}
      />
      {data.length <= 0 ? (
        <Text style={styles.not}>books not found</Text>
      ) : null}
      {isLoading ? (
        <Spinner color="black" style={styles.mtmin} />
      ) : (
        <Button transparent light style={styles.jus} disabled />
      )}
    </SafeAreaView>
  );
};

export default ContentApp;
