import React from 'react';
import {
  Animated,
  StyleSheet,
  SafeAreaView,
  Image,
  View,
  Alert,
} from 'react-native';
import {Container, Text, Button, Spinner} from 'native-base';
import Header from '../components/Header';
import HeaderContentDetail from '../components/HeaderContentDetail';
import {connect} from 'react-redux';
import {addHistoryActionCreator} from '../redux/actions/actionBook';
import {addMyBookActionCreator} from '../redux/actions/actionBook';
import {transactionBook} from '../utils/http';
import AsyncStorage from '@react-native-community/async-storage';

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
    marginTop: 220,
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

class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollY: new Animated.Value(0),
      book: this.props.route.params.item,
      status: this.props.route.params.item.status,
      isLoading: false,
      _token: null,
      getToken: false,
    };
  }

  _getColorTitle = () => {
    const {scrollY} = this.state;
    return scrollY.interpolate({
      inputRange: [0, 60],
      outputRange: ['white', 'black'],
      extrapolate: 'clamp',
      useNativeDriver: true,
    });
  };

  _getTopTitle = () => {
    const {scrollY} = this.state;
    return scrollY.interpolate({
      inputRange: [0, 90],
      outputRange: [180, 17],
      extrapolate: 'clamp',
      useNativeDriver: true,
    });
  };

  _getLeftTitle = () => {
    const {scrollY} = this.state;
    return scrollY.interpolate({
      inputRange: [0, 90],
      outputRange: [20, 65],
      extrapolate: 'clamp',
      useNativeDriver: true,
    });
  };

  _getSizeTitle = () => {
    const {scrollY} = this.state;
    return scrollY.interpolate({
      inputRange: [0, 90],
      outputRange: [21, 18],
      extrapolate: 'clamp',
      useNativeDriver: true,
    });
  };

  _getTopThumb = () => {
    const {scrollY} = this.state;
    return scrollY.interpolate({
      inputRange: [0, 50, 80],
      outputRange: [130, -10, 170],
      extrapolate: 'clamp',
      useNativeDriver: true,
    });
  };

  _getIndexThumb = () => {
    const {scrollY} = this.state;
    return scrollY.interpolate({
      inputRange: [40, 50],
      outputRange: [1, -1],
      extrapolate: 'clamp',
      useNativeDriver: true,
    });
  };

  _getOpacityThumb = () => {
    const {scrollY} = this.state;
    return scrollY.interpolate({
      inputRange: [0, 90],
      outputRange: [1, 0],
      extrapolate: 'clamp',
      useNativeDriver: true,
    });
  };

  _getSlice = () => {
    const {scrollY} = this.state;
    return scrollY.interpolate({
      inputRange: [0, 80],
      outputRange: [15, 40],
      extrapolate: 'clamp',
      useNativeDriver: true,
    });
  };

  getToken = async () => {
    const _token = await AsyncStorage.getItem('_token');
    this.setState({
      _token,
      getToken: true,
    });
  };

  componentDidMount(){
    this.getToken();
  }
  handleTransaction = async e => {
    let st = '';
    this.setState({
      isLoading: true,
    });
    if (this.state.status === 1) {
      st = 0;
    } else {
      st = 1;
    }
    await transactionBook({status: st}, this.state.book.id)
      .then(response => {
        this.setState({
          status: st,
          isLoading: false,
        });
        this.props.addHistoryAction({
          id: response.data.data.id_history,
          status: st,
          id_book: this.state.book.id,
          title: this.state.book.title,
          created_at: new Date(),
        });
        this.props.addMyBookAction({
          ...this.state.book,
          status: this.state.status,
        });
        Alert.alert('Success', 'Book has been borrowed');
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
    const color = this._getColorTitle();
    const top = this._getTopThumb();
    const topTitle = this._getTopTitle();
    const leftTitle = this._getLeftTitle();
    const sizeTitle = this._getSizeTitle();
    const index = this._getIndexThumb();
    const opacity = this._getOpacityThumb();
    const {item} = this.props.route.params;
    const _token = this.state._token;
    const available = this.state.status === 0 ? 'orange' : 'green';
    return (
      <Container style={styles.bg}>
        <Header
          setHeight={90}
          scrollY={this.state.scrollY}
          renderContent={
            <HeaderContentDetail
              scrollY={this.state.scrollY}
              navigation={this.props.navigation}
            />
          }
          source={'http://192.168.43.67:3001/public/images/' + item.image}
        />
        <Animated.View
          style={[
            styles.thumbWrapper,
            {
              top: top,
              opacity: opacity,
              zIndex: index,
            },
          ]}>
          <Image
            style={[StyleSheet.absoluteFill, styles.thumb]}
            source={{
              uri: 'http://192.168.43.67:3001/public/images/' + item.image,
            }}
          />
        </Animated.View>
        <Animated.Text
          numberOfLines={1}
          style={[
            styles.title,
            {left: leftTitle, top: topTitle, fontSize: sizeTitle, color: color},
          ]}>
          {item.title.length >= 15
            ? item.title.slice(0, 15) + '...'
            : item.title}
        </Animated.Text>
        <Animated.ScrollView
          style={{backgroundColor: 'rgba(0,0,0,0.4)'}}
          overScrollMode={'never'}
          scrollEventThrottle={16}
          onScroll={Animated.event([
            {
              nativeEvent: {contentOffset: {y: this.state.scrollY}},
            },
          ])}>
          <SafeAreaView style={styles.wrapper}>
            <View style={styles.contentWrapper} />
            <Text style={[styles.fulllWidth, {color: available}]} note>
              {this.state.status === 0 ? 'Unavailable' : 'Available'}
            </Text>
            <Text style={[styles.fulllWidth, styles.mt]}>
              By{' '}
              {item.author_name.length >= 18
                ? item.author_name.slice(0, 18) + '...'
                : item.author_name}
            </Text>
            <Text style={styles.fulllWidth} note>
              {item.genre_name}
            </Text>
            <Text note style={styles.mt}>
              {item.description}
            </Text>
            {this.state.status === 1 && _token !== null ? (
              this.state.isLoading ? (
                <Spinner color="black" />
              ) : (
                <Button
                  dark
                  style={styles.button}
                  onPress={() => {
                    this.handleTransaction();
                  }}>
                  <Text> Borrow Books </Text>
                </Button>
              )
            ) : null}
          </SafeAreaView>
        </Animated.ScrollView>
      </Container>
    );
  }
}

const mapStateToProps = ({book}) => {
  const {responseAPI} = book;
  return {
    responseAPI,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addHistoryAction: body => {
      dispatch(addHistoryActionCreator(body));
    },
    addMyBookAction: body => {
      dispatch(addMyBookActionCreator(body));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Detail);
