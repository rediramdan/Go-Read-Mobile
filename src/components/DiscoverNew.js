import React from 'react';
import {
  FlatList,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Text, CardItem, Left, Thumbnail, Button, Spinner} from 'native-base';

const ItemFlatlist = ({
  item,
  navigation,
  textHeader,
  handleTransaction,
  isLoading,
  selected,
  setSelected,
}) => {
  return (
    <CardItem style={styles.cardItemStyle}>
      <TouchableOpacity onPress={() => navigation.navigate('Detail', {item})}>
        <Left>
          <Thumbnail
            square
            style={styles.thumb}
            source={{
              uri: 'http://192.168.43.67:3001/public/images/' + item.image,
            }}
          />
        </Left>
        {textHeader === ' ' ? (
          isLoading && selected === item.id ? (
            <Spinner color="orange" style={styles.wkwk} />
          ) : (
            <Button
              transparent
              style={styles.minmin}
              onPress={() => {
                Alert.alert('Are you sure ?', 'wan to returned the book', [
                  {
                    text: 'No',
                    onPress: () => {},
                  },
                  {
                    text: 'Yes',
                    onPress: async () => {
                      setSelected(item.id);
                      handleTransaction(item);
                    },
                  },
                ]);
              }}>
              <Text style={styles.orange}>Return Book</Text>
            </Button>
          )
        ) : null}
      </TouchableOpacity>
    </CardItem>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 20,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: 'white',
    elevation: 2,
  },
  wkwk: {
    marginTop: 10,
    height: 20,
    marginLeft: -9,
  },
  orange: {
    color: 'orange',
  },
  minmin: {
    marginLeft: -9,
  },
  header: {
    marginTop: 10,
    fontSize: 17,
  },
  note: {
    fontSize: 12,
  },
  thumb: {
    width: 105,
    height: 150,
    marginRight: 20,
    borderRadius: 10,
  },
  cardItemStyle: {
    paddingLeft: 0,
    paddingRight: 0,
  },
});

const _getMarginleft = scrollX => {
  return scrollX.interpolate({
    inputRange: [0, 40],
    outputRange: [0, 0],
    extrapolate: 'clamp',
    useNativeDriver: true,
  });
};

const DiscoverNew = ({
  data,
  navigation,
  textHeader = 'Recomended Books',
  Top = 152,
  handleTransaction,
  isLoading,
}) => {
  const [scrollx] = React.useState(new Animated.Value(0));
  const [selected, setSelected] = React.useState(null);
  const marginLeftContent = _getMarginleft(scrollx);
  return (
    <Animated.View
      style={[styles.wrapper, {marginLeft: marginLeftContent, marginTop: Top}]}>
      <Text style={styles.header}>{textHeader}</Text>
      {Top >= 152 ? (
        <Text note style={styles.note}>
          Hunt new books before other bookworms do it...
        </Text>
      ) : null}
      <FlatList
        overScrollMode={'never'}
        scrollEventThrottle={16}
        onScroll={Animated.event([
          {
            nativeEvent: {contentOffset: {x: scrollx}},
          },
        ])}
        style={styles.flat}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={({item}) => (
          <ItemFlatlist
            item={item}
            navigation={navigation}
            textHeader={textHeader}
            handleTransaction={handleTransaction}
            isLoading={isLoading}
            selected={selected}
            setSelected={setSelected}
          />
        )}
        keyExtractor={item => item.id}
      />
    </Animated.View>
  );
};

export default DiscoverNew;
