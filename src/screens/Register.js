import React from 'react';

import {View} from 'react-native';
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
import {TouchableOpacity} from 'react-native-gesture-handler';

import {connect} from 'react-redux';
import {postRegisterActionCreator} from '../redux/actions/actionAuth';

class Register extends React.Component {
  state = {
    username: '',
    password: '',
    name: '',
    nameCheck: true,
    usernameCheck: true,
    passwordCheck: true,
    passwordError: '',
    usernameError: '',
    isLoading: false,
    isRequested: false,
    passwordSecure: true,
  };

  onChangeSecure = () => {
    this.setState({
      passwordSecure: !this.state.passwordSecure,
    });
  };

  handlerChange = (e, name) => {
    const key = name;
    if (key === 'password') {
      if (e.match(/^([a-zA-Z0-9!@#$%^&*]{8,})$/)) {
        if (e.match(/^(?=.*[0-9])(?=.*[a-z])([a-zA-Z0-9!@#$%^&*]{8,})$/)) {
          this.setState({passwordCheck: true});
        } else {
          this.setState({
            passwordCheck: false,
            passwordError:
              'Password at least 1 lowercase character and 1 number character',
          });
        }
      } else {
        this.setState({
          passwordCheck: false,
          passwordError:
            'Password must be a string or numbers or character:!@#$%^&*, min:8',
        });
      }
    }

    if (key === 'username') {
      if (e.indexOf(' ') >= 0) {
        this.setState({
          usernameCheck: false,
          usernameError: 'Username must be a string without spaces',
        });
      } else {
        this.setState({usernameCheck: true});
      }
    }

    this.setState({
      [key]: e,
    });
  };

  handlerSubmit = async e => {
    const {username, password, name, usernameCheck, passwordCheck} = this.state;
    if (username === '') {
      this.setState({
        usernameCheck: false,
        usernameError: 'Username is required',
      });
    }
    if (name === '') {
      this.setState({
        nameCheck: false,
      });
    }
    if (password === '') {
      this.setState({
        passwordCheck: false,
        passwordError: 'Password is required',
      });
    }
    if (
      usernameCheck &&
      passwordCheck &&
      username !== '' &&
      password !== '' &&
      name !== ''
    ) {
      this.setState({
        isLoading: true,
      });
      const {registerAction} = this.props;
      await registerAction({username, password, name});
    }
  };

  componentWillUpdate() {
    if (this.props.isLoading && this.state.isRequested) {
      this.setState({
        isRequested: false,
      });
    }
  }

  componentDidUpdate() {
    const {isRequested} = this.state;
    const {isRejected, responseAPI, isFulfilled} = this.props;
    if (isRejected && !isRequested) {
      if (responseAPI.status === 401) {
        this.setState({
          isRequested: true,
          isLoading: false,
          usernameCheck: false,
          usernameError: 'Username already exists',
        });
      }
    }

    if (isFulfilled && !isRequested) {
      this.props.navigation.navigate('Login');
    }
  }

  render() {
    const {
      nameCheck,
      usernameCheck,
      usernameError,
      passwordCheck,
      passwordError,
      passwordSecure,
    } = this.state;
    const {isLoading} = this.props;
    return (
      <Container style={{justifyContent: 'center'}}>
        <Content>
          <View
            style={{
              flex: 1,
              marginTop: 60,
              flexDirection: 'column',
              textAlignVertical: 'center',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'white',
            }}>
            <IconEntypo style={{fontSize: 60}} name="open-book" />
            <Text style={{fontSize: 30}}>GO-Read</Text>
            <Text note style={{fontSize: 18}}>
              Register
            </Text>
          </View>
          <Form style={{paddingLeft: 20, paddingRight: 30}}>
            <Item floatingLabel style={{paddingBottom: 10}} error={!nameCheck}>
              <Label>Name</Label>
              <Input
                onChangeText={e => {
                  this.handlerChange(e, 'name');
                }}
              />
            </Item>
            {!nameCheck ? (
              <Text note style={{marginLeft: 15, color: 'red', fontSize: 11}}>
                Name is required
              </Text>
            ) : null}
            <Item
              floatingLabel
              style={{paddingBottom: 10}}
              error={!usernameCheck}>
              <Label>Username</Label>
              <Input
                onChangeText={e => {
                  this.handlerChange(e, 'username');
                }}
              />
            </Item>
            {!usernameCheck ? (
              <Text note style={{marginLeft: 15, color: 'red', fontSize: 11}}>
                {usernameError}
              </Text>
            ) : null}
            <Item
              floatingLabel
              style={{paddingBottom: 10}}
              error={!passwordCheck}>
              <Label>Password</Label>
              <Input
                secureTextEntry={passwordSecure}
                onChangeText={e => {
                  this.handlerChange(e, 'password');
                }}
              />
              <Icon
                name={passwordSecure ? 'eye-off' : 'eye'}
                onPress={() => {
                  this.onChangeSecure();
                }}
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
                onPress={() => {
                  this.handlerSubmit();
                }}>
                <Text>Register now</Text>
              </Button>
            ) : (
              <Spinner color={'black'} />
            )}
          </Form>
          <Text style={{alignSelf: 'center', marginTop: 20}}>
            Already have an account?
          </Text>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('Login');
            }}>
            <Text
              style={{alignSelf: 'center', textDecorationLine: 'underline'}}>
              Login
            </Text>
          </TouchableOpacity>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = ({auth}) => {
  const {isLoading, isRejected, isFulfilled, responseAPI} = auth;
  return {
    isLoading,
    isRejected,
    isFulfilled,
    responseAPI,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    registerAction: body => {
      dispatch(postRegisterActionCreator(body));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Register);
