import React from 'react';
import {connect} from 'react-redux';
import {getHistoryActionCreator} from '../redux/actions/actionBook';
import {getNewBooksActionCreator} from '../redux/actions/actionBook';
import {getMyBooksActionCreator} from '../redux/actions/actionBook';
import {deleteHistoryActionCreator} from '../redux/actions/actionBook';
import {addHistoryActionCreator} from '../redux/actions/actionBook';
import {addMyBookActionCreator} from '../redux/actions/actionBook';
import {transactionBook} from '../utils/http';

import {
  Animated,
  StyleSheet,
  RefreshControl,
  SafeAreaView,
  View,
  Alert,
} from 'react-native';
import {
  Container,
  Text,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Button,
  Spinner,
  Content,
} from 'native-base';
import IconEntypo from 'react-native-vector-icons/Entypo';
import Header from '../components/Header';
import DiscoverNew from '../components/DiscoverNew';
import HeaderContentMyBooks from '../components/HeaderContentMyBooks';

const styles = StyleSheet.create({
  bg: {
    backgroundColor: '#F9F9F9',
  },
  wrapper: {
    shadowColor: 'black',
    shadowOffset: {
      width: 9,
      height: 20,
    },
    width: '100%',
    minHeight: 480,
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
    shadowOpacity: 1,
    shadowRadius: 0.14,
    elevation: 12,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: 20,
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
    alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  fulllWidth: {
    width: '100%',
  },
  mt: {
    marginTop: 10,
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

class MyBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollY: new Animated.Value(0),
      search: '',
      sort: 'created_at',
      asc: false,
      requestPage: 1,
      limit: 100,
      isLoading: true,
      openSnackbar: false,
      messageSnackbar: '',
      inDelete: null,
    };
  }

  handleTransaction = async item => {
    let st = '';
    this.setState({
      isLoading: true,
    });
    if (item.status === 1) {
      st = 0;
    } else {
      st = 1;
    }
    await transactionBook({status: st}, item.id)
      .then(response => {
        this.setState({
          isLoading: false,
        });
        this.props.addHistoryAction({
          id: response.data.data.id_history,
          status: st,
          id_book: item.id,
          title: item.title,
          created_at: new Date(),
        });
        this.props.addMyBookAction({
          ...item,
          status: st,
        });
        Alert.alert('Success', 'Book has been returned');
      })
      .catch(error => {
        if (
          error.response.data.data.message === 'JsonWebTokenError' ||
          error.response.data.data.message === 'TokenExpiredError'
        ) {
          this.props.history.push('/refresh-token');
        }
      });
  };

  render() {
    const newBooks = this.props.myBooks;
    const isLoading = this.props.isLoading;
    const bookHistory = this.props.bookHistory;
    console.log('ok');
    return (
      <Container style={styles.bg}>
        <Header
          setHeight={0}
          sizeHeight={60}
          scrollY={this.state.scrollY}
          renderContent={<HeaderContentMyBooks scrollY={this.state.scrollY} />}
          source={
            'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ1qBNxPrInPCuEgjpvRoDUcDB6yCz7JMBbe3947KyMUBLOIMpC&usqp=CAU'
          }
        />
        <Animated.ScrollView
          overScrollMode={'never'}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={this.onRefresh} />
          }
          scrollEventThrottle={16}
          onScroll={Animated.event([
            {
              nativeEvent: {contentOffset: {y: this.state.scrollY}},
            },
          ])}>
          <DiscoverNew
            navigation={this.props.navigation}
            data={newBooks}
            textHeader={' '}
            Top={20}
            isLoading={this.state.isLoading}
            handleTransaction={this.handleTransaction}
          />
          <SafeAreaView style={styles.wrapper}>
            <View style={styles.contentWrapper} />
            <Text style={[styles.fulllWidth, styles.mt]}>History</Text>
            <Content>
              <List style={{marginBottom: 20}}>
                {bookHistory.map(val => {
                  return (
                    <ListItem thumbnail>
                      <Left>
                        <IconEntypo
                          name="book"
                          style={{fontSize: 35, color: 'rgba(0,0,0,0.3)'}}
                        />
                      </Left>
                      <Body>
                        <Text>
                          You have
                          {val.status === 1 ? ' Returned ' : ' Borrowed '}
                          {val.title}
                        </Text>
                        <Text note numberOfLines={1}>
                          {new Date(val.created_at).toLocaleString()}
                        </Text>
                      </Body>
                      <Right style={{width: 60}}>
                        {this.state.inDelete === val.id ? (
                          <Spinner color="red" />
                        ) : (
                          <Button
                            transparent
                            onPress={() => {
                              Alert.alert(
                                'are you sure ?',
                                'to delete this history',
                                [
                                  {
                                    text: 'No',
                                    onPress: () => {},
                                  },
                                  {
                                    text: 'Yes',
                                    onPress: async () => {
                                      this.setState(
                                        {
                                          inDelete: val.id,
                                        },
                                        async () => {
                                          await this.props.deleteHistory(
                                            val.id,
                                          );
                                        },
                                      );
                                    },
                                  },
                                ],
                              );
                            }}>
                            <IconEntypo
                              name="trash"
                              style={{fontSize: 20, color: 'rgba(255,0,0,0.4)'}}
                            />
                          </Button>
                        )}
                      </Right>
                    </ListItem>
                  );
                })}
              </List>
              {bookHistory.length <= 0 ? (
                <Text style={{alignSelf: 'center'}} note>
                  You don't have any history yet...
                </Text>
              ) : null}
            </Content>
          </SafeAreaView>
        </Animated.ScrollView>
      </Container>
    );
  }
}

const mapStateToProps = ({book}) => {
  const {
    responseAPI,
    pagination,
    isLoading,
    isRejected,
    isFulfilled,
    myBooks,
    url,
    bookHistory,
    discoverNew,
  } = book;
  return {
    url,
    isLoading,
    isRejected,
    isFulfilled,
    discoverNew,
    bookHistory,
    myBooks,
    responseAPI,
    pagination,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getHistoryAction: body => {
      dispatch(getHistoryActionCreator(body));
    },
    getNewBooksAction: body => {
      dispatch(getNewBooksActionCreator(body));
    },
    deleteHistory: body => {
      dispatch(deleteHistoryActionCreator(body));
    },
    addHistoryAction: body => {
      dispatch(addHistoryActionCreator(body));
    },
    addMyBookAction: body => {
      dispatch(addMyBookActionCreator(body));
    },
    getMyBooksAction: body => {
      dispatch(getMyBooksActionCreator(body));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MyBooks);
