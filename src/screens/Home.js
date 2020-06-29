import React from 'react';
import {connect} from 'react-redux';
import {getNewBooksActionCreator} from '../redux/actions/actionBook';
import {getLoadBooksActionCreator} from '../redux/actions/actionBook';
import {getUserActionCreator} from '../redux/actions/actionBook';

import {
  Animated,
  StyleSheet,
  RefreshControl,
  View,
  BackHandler,
  Alert,
} from 'react-native';
import {Container, Button, Text} from 'native-base';
import Header from '../components/Header';
import DiscoverNew from '../components/DiscoverNew';
import GenreAvailable from '../components/GenreAvailable';
import ContentApp from '../components/ContentApp';
import HeaderContentHome from '../components/HeaderContentHome';
import AsyncStorage from '@react-native-community/async-storage';

const styles = StyleSheet.create({
  bg: {
    backgroundColor: '#F9F9F9',
  },
  wrapperLog: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.1)',
    paddingTop: 30,
    marginTop: -10,
  },
  wrapperLog2: {
    width: '100%',
    height: 80,
    paddingTop: 5,
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'row',
  },
  w: {
    width: 120,
    height: 40,
    marginRight: 10,
    borderRadius: 10,
    justifyContent: 'center',
  },
  font: {
    fontSize: 11,
  },
  mt: {
    marginTop: 10,
  },
  qq: {
    width: 120,
    height: 40,
    marginLeft: 10,
    borderRadius: 10,
    justifyContent: 'center',
  },
});

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      scrollY: new Animated.Value(0),
      search: '',
      sort: 'created_at',
      asc: false,
      requestPage: 1,
      limit: 2,
      openSnackbar: false,
      messageSnackbar: '',
      _token: false,
    };
  }

  getToken = async () => {
    const _token = await AsyncStorage.getItem('_token');
    this.setState({
      _token,
    });
  };

  onRefresh = async () => {
    this.setState(
      {
        requestPage: 1,
      },
      async () => {
        await this.props.getUserAction(this.state);
      },
    );
    await this.props.getNewBooksAction(this.state);
  };

  onSearch = async value => {
    this.setState(
      {
        search: value,
        requestPage: 1,
      },
      async () => {
        await this.props.getUserAction(this.state);
      },
    );
  };

  onLoadMore = async nextPage => {
    if (this.state.requestPage !== nextPage) {
      this.setState(
        {
          requestPage: nextPage,
        },
        async () => {
          await this.props.getLoadBooksAction(this.state);
        },
      );
    }
  };

  isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 1;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    this.getToken();
  }

  handleBackPress = () => {
    Alert.alert(
      'Exit App',
      'Do you want to exit?',
      [
        {
          text: 'No',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Yes', onPress: () => BackHandler.exitApp()},
      ],
      {cancelable: false},
    );
    return true;
  };

  render() {
    const data = this.props.responseAPI;
    const newBooks = this.props.discoverNew;
    const dataGenre = this.props.dataGenre;
    const isLoading = this.props.isLoading;
    const pagination = this.props.pagination;
    const marginTop = this.state.search === '' ? '-50' : '150';
    return (
      <Container style={styles.bg}>
        <Header
          scrollY={this.state.scrollY}
          renderContent={
            <HeaderContentHome
              scrollY={this.state.scrollY}
              onSearch={this.onSearch}
            />
          }
          source={
            'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ1qBNxPrInPCuEgjpvRoDUcDB6yCz7JMBbe3947KyMUBLOIMpC&usqp=CAU'
          }
        />
        <Animated.ScrollView
          overScrollMode={'never'}
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={() => {
                this.onRefresh();
              }}
            />
          }
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {contentOffset: {y: this.state.scrollY}},
              },
            ],
            {
              listener: event => {
                if (this.isCloseToBottom(event.nativeEvent)) {
                  this.onLoadMore(pagination.nextPage);
                }
              },
            },
          )}>
          {this.state.search === '' ? (
            <DiscoverNew navigation={this.props.navigation} data={newBooks} />
          ) : null}
          {this.state._token === null && this.state.search === '' ? (
            <View style={styles.wrapperLog}>
              <Text note>You have not been identified, please</Text>
              <View style={styles.wrapperLog2}>
                <Button
                  dark
                  style={styles.w}
                  onPress={() => {
                    this.props.navigation.navigate('Login');
                  }}>
                  <Text style={styles.font}>Login</Text>
                </Button>
                <Text style={styles.mt} note>
                  or
                </Text>
                <Button
                  dark
                  style={styles.qq}
                  onPress={() => {
                    this.props.navigation.navigate('Register');
                  }}>
                  <Text style={styles.font}>Register now</Text>
                </Button>
              </View>
            </View>
          ) : null}
          {this.state.search === '' ? (
            <GenreAvailable data={dataGenre} />
          ) : null}

          <ContentApp
            data={data}
            navigation={this.props.navigation}
            onLoadMore={this.onLoadMore}
            isLoading={isLoading}
            marginTop={marginTop}
          />
        </Animated.ScrollView>
      </Container>
    );
  }
}

const mapStateToProps = ({book, genre}) => {
  const {
    responseAPI,
    pagination,
    isLoading,
    isRejected,
    url,
    discoverNew,
  } = book;
  const dataGenre = genre.responseAPI;
  return {
    url,
    isLoading,
    isRejected,
    discoverNew,
    responseAPI,
    pagination,
    dataGenre,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getNewBooksAction: body => {
      dispatch(getNewBooksActionCreator(body));
    },
    getLoadBooksAction: body => {
      dispatch(getLoadBooksActionCreator(body));
    },
    getUserAction: body => {
      dispatch(getUserActionCreator(body));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
