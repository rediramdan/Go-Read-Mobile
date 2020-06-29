import React from 'react';

import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {
  Content,
  Text,
  Container,
  Form,
  Item,
  Input,
  Label,
  Button,
  Icon,
  Spinner,
} from 'native-base';
import IconEntypo from 'react-native-vector-icons/Entypo';
import {
  postLoginActionCreator,
  resetAuthActionCreator,
} from '../redux/actions/actionAuth';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    marginTop: 90,
    flexDirection: 'column',
    textAlignVertical: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  iconSize: {
    fontSize: 60,
  },
  brand: {
    fontSize: 30,
  },
  title: {
    fontSize: 18,
  },
  form: {
    paddingLeft: 20,
    paddingRight: 30,
  },
  item: {
    paddingBottom: 10,
  },
});

class Login extends React.Component {
  state = {
    username: '',
    usernameCheck: true,
    passwordCheck: true,
    usernameError: '',
    passwordError: '',
    password: '',
    isRequested: false,
    passwordSecure: true,
  };

  onChange = (val, name) => {
    const key = name;
    if (val !== '') {
      if (key === 'username') {
        this.setState({
          usernameCheck: true,
        });
      } else if (key === 'password') {
        this.setState({
          passwordCheck: true,
        });
      }
    }
    this.setState({
      [key]: val,
    });
  };

  handlerSubmit = async e => {
    e.preventDefault();
    const {username, password, usernameCheck, passwordCheck} = this.state;
    if (username === '') {
      this.setState({
        usernameCheck: false,
        usernameError: 'Username is required',
      });
    }

    if (password === '') {
      this.setState({
        passwordCheck: false,
        passwordError: 'Password is required',
      });
    }
    if (usernameCheck && passwordCheck && username !== '' && password !== '') {
      this.setState({
        isLoading: true,
      });
      const {postLoginAction} = this.props;
      await postLoginAction({username, password});
    }
  };

  onChangeSecure = () => {
    this.setState({
      passwordSecure: !this.state.passwordSecure,
    });
  };

  componentWillUpdate() {
    if (this.props.isLoading && this.state.isRequested) {
      this.setState({
        isRequested: false,
      });
    }
  }

  async componentDidUpdate() {
    const {isRequested} = this.state;
    const {isRejected, responseAPI, isFulfilled} = this.props;
    if (isRejected && !isRequested) {
      if (responseAPI.status === 401) {
        if (responseAPI.data.message === 'username not found') {
          this.setState({
            isRequested: true,
            usernameCheck: false,
            usernameError: 'Username not Found',
          });
        } else {
          this.setState({
            isRequested: true,
            passwordCheck: false,
            passwordError: 'Password Wrong',
          });
        }
      }
    }

    if (isFulfilled && !isRequested) {
      this.props.resetAuthAction();
      await AsyncStorage.setItem('_token', responseAPI.accessToken);
      this.props.navigation.navigate('Home');
    }
  }
  render() {
    const {
      username,
      password,
      passwordSecure,
      usernameCheck,
      usernameError,
      passwordCheck,
      passwordError,
    } = this.state;
    const {isLoading} = this.props;
    return (
      <Container>
        <Content>
          <View style={styles.wrapper}>
            <IconEntypo style={styles.iconSize} name="open-book" />
            <Text style={styles.brand}>GO-Read</Text>
            <Text note style={styles.title}>
              Login
            </Text>
          </View>
          <Form style={styles.form}>
            <Item floatingLabel style={styles.item} error={!usernameCheck}>
              <Label>Username</Label>
              <Input
                onChangeText={e => {
                  this.onChange(e, 'username');
                }}
                value={username}
              />
            </Item>
            {!usernameCheck ? (
              <Text note style={{marginLeft: 15, color: 'red', fontSize: 11}}>
                {usernameError}
              </Text>
            ) : null}
            <Item floatingLabel style={styles.item} error={!passwordCheck}>
              <Label>Password</Label>
              <Input
                secureTextEntry={passwordSecure}
                onChangeText={e => {
                  this.onChange(e, 'password');
                }}
                value={password}
              />
              <Icon
                name={passwordSecure ? 'eye-off' : 'eye'}
                onPress={this.onChangeSecure}
              />
            </Item>
            {!passwordCheck ? (
              <Text note style={{marginLeft: 15, color: 'red', fontSize: 11}}>
                {passwordError}
              </Text>
            ) : null}
            {!isLoading ? (
              <Button
                dark
                style={{
                  borderRadius: 10,
                  justifyContent: 'center',
                  marginTop: 20,
                  marginLeft: 10,
                }}
                onPress={this.handlerSubmit}>
                <Text>Login</Text>
              </Button>
            ) : (
              <Spinner color={'black'} />
            )}
          </Form>
          <Text style={{alignSelf: 'center', marginTop: 20}}>
            Don't have an account?
          </Text>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('Register');
            }}>
            <Text
              style={{alignSelf: 'center', textDecorationLine: 'underline'}}>
              Register now
            </Text>
          </TouchableOpacity>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = ({auth}) => {
  const {isLoading, isRejected, responseAPI, isFulfilled} = auth;
  return {
    isFulfilled,
    isLoading,
    isRejected,
    responseAPI,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    postLoginAction: body => {
      dispatch(postLoginActionCreator(body));
    },
    resetAuthAction: () => {
      dispatch(resetAuthActionCreator());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
