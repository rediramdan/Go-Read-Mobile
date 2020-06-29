import React from 'react';
import {connect} from 'react-redux';
import {getUserActionCreator} from '../redux/actions/actionBook';
import {getNewBooksActionCreator} from '../redux/actions/actionBook';
import {getMyBooksActionCreator} from '../redux/actions/actionBook';
import {getHistoryActionCreator} from '../redux/actions/actionBook';
import {getAllGenreActionCreator} from '../redux/actions/actionGenre';

import {View} from 'react-native';
import {Content, Text, Container, Spinner} from 'native-base';
import Icon from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-community/async-storage';

class Splash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      sort: 'created_at',
      asc: false,
      isLoading: true,
      requestPage: 1,
      limit: 2,
      openSnackbar: false,
      messageSnackbar: '',
    };
  }

  getData = async () => {
    const _token = await AsyncStorage.getItem('_token');
    if (_token !== null) {
      await this.props.getMyBooksAction(this.state);
      await this.props.getHistoryAction({requestPage: 1, limit: 20});
    }
    await this.props.getUserAction(this.state);
    await this.props.getGenreAction();
    await this.props.getNewBooksAction(this.state);
  };

  componentDidMount() {
    this.getData();
  }

  async componentDidUpdate() {
    if (
      this.props.discoverNew.length > 0 &&
      this.props.responseAPI.length > 0 &&
      this.state.isLoading
    ) {
      const _token = await AsyncStorage.getItem('_token');
      if (_token !== null) {
        this.setState({
          isLoading: false,
        });
        this.props.navigation.navigate('Home');
      } else {
        this.setState({
          isLoading: false,
        });
        console.log('ooooooooookkkkkkkeeeeeeeeeeeee');
        this.props.navigation.navigate('LandingOne');
      }
    }

    if (this.props.myBooks === 401) {
      this.setState({
        isLoading: false,
      });
      await AsyncStorage.removeItem('_token');
    }
  }

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
        <Icon style={{fontSize: 60}} name="open-book" />
        <Text style={{fontSize: 30}}>GO-Read</Text>
        <Spinner color="black" />
      </View>
    );
  }
}

const mapStateToProps = ({book}) => {
  const {
    responseAPI,
    pagination,
    isLoading,
    isRejected,
    bookHistory,
    myBooks,
    url,
    discoverNew,
  } = book;
  return {
    url,
    isLoading,
    myBooks,
    isRejected,
    discoverNew,
    bookHistory,
    responseAPI,
    pagination,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUserAction: body => {
      dispatch(getUserActionCreator(body));
    },
    getNewBooksAction: body => {
      dispatch(getNewBooksActionCreator(body));
    },
    getMyBooksAction: body => {
      dispatch(getMyBooksActionCreator(body));
    },
    getHistoryAction: body => {
      dispatch(getHistoryActionCreator(body));
    },
    getGenreAction: body => {
      dispatch(getAllGenreActionCreator(body));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Splash);
