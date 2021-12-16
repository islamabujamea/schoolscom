import React, {Component} from 'react';
import {
  Dimensions,
  StatusBar,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {TextInput, HelperText} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {blue, gray, lightGray, white} from '../assets/colors/index';
import {BoldFont, RegularFont} from '../assets/fonts/index';
import ButtonBox from '../components/Button';
import LoaderBox from '../components/LoaderBox';
import BackIcon from '../images/circleBack.svg';
import Envelope from '../images/Envelope.svg';
import Lock from '../images/lock.svg';
import config from '../Config';

export default class SignInForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      emailErr: false,
      emailErrTxt: 'Incorrect email format',
      password: '',
      passErr: false,
      passErrTxt: 'Password must be have at least 6 characters long',
      error: false,
      errorTxt: '',
      showProgress: false,
    };
  }
  renderLoading() {
    if (this.state.showProgress) {
      return <LoaderBox />;
    }
  }
  validateEmail() {
    var text = this.state.email;
    console.log(text);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (text != '') {
      if (reg.test(text) === false) {
        console.log('Email is Not Correct');
        this.setState({emailErr: true});
        return false;
      } else {
        this.setState({emailErr: false});
        console.log('Email is Correct');
      }
    } else {
      this.setState({
        emailErr: true,
        emailErrTxt: 'Email cannot be blank',
      });
    }
  }
  validatePassword() {
    var text = this.state.password;
    if (text != '') {
      if (text.length >= 6) {
        this.setState({passErr: false});
        return false;
      } else {
        this.setState({
          passErr: true,
        });
      }
    } else {
      this.setState({
        passErr: true,
        passErrTxt: 'Password cannot be blank',
      });
    }
  }
  async SignInHandler() {
    this.setState({
      showProgress: !this.state.showProgress,
    });
    try {
      const response = await fetch(config.DOMAIN + 'users/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password,
        }),
      });
      let res = await response.json();
      console.log(response.url);
      console.log('resnn', res);
      if (res.message.error) {
        this.setState({
          errorTxt: res.message.desc,
          error: res.message.error,
          showProgress: !this.state.showProgress,
        });
      } else {
        this.setState({
          error: res.message.error,
          showProgress: !this.state.showProgress,
        });
        await AsyncStorage.setItem('@eKard:userId', res.json.id.toString());
        await AsyncStorage.setItem('@eKard:token', res.json.token);
        this.props.navigation.navigate('Home');
      }
    } catch (error) {
      this.setState({
        errorTxt:
          'Oops! There was a problem connecting to the server. The server may not exist or it is unavailable at this time',
        error: !this.state.error,
        showProgress: !this.state.showProgress,
      });
    }
  }
  render() {
    return (
      <ScrollView
        style={{backgroundColor: white}}
        keyboardShouldPersistTaps="always">
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />
        {this.renderLoading()}
        <SafeAreaView style={styles.flex}>
          <View style={styles.mainView}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <BackIcon style={styles.backBtn} />
            </TouchableOpacity>
            <Text style={styles.title}>{'Welcome back'}</Text>
            <View style={styles.viewMargin}>
              <View style={styles.InputView}>
                <Envelope style={styles.Icon} />
                <TextInput
                  keyboardType="email-address"
                  label="Email"
                  value={this.state.email}
                  onChangeText={text => this.setState({email: text})}
                  style={styles.TextInput}
                  theme={{
                    fonts: {
                      regular: {
                        fontFamily: 'Poppins-Regular',
                        fontSize: 16,
                      },
                    },
                  }}
                  onSubmitEditing={() => {
                    this.passInput.focus();
                  }}
                  blurOnSubmit={false}
                  selectionColor={blue}
                  underlineColor={gray}
                  activeUnderlineColor={blue}
                  onBlur={text => this.validateEmail()}
                  error={this.state.emailErr}
                />
              </View>
              <HelperText
                type="error"
                visible={this.state.emailErr}
                style={styles.helperTxt}>
                {this.state.emailErrTxt}
              </HelperText>
            </View>
            <View style={styles.viewMargin}>
              <View style={styles.InputView}>
                <Lock style={styles.Icon} />
                <TextInput
                  label="Password"
                  ref={input => {
                    this.passInput = input;
                  }}
                  value={this.state.password}
                  onChangeText={text =>
                    this.setState({
                      password: text,
                    })
                  }
                  style={styles.TextInput}
                  theme={{
                    fonts: {
                      regular: {
                        fontFamily: 'Poppins-Regular',
                        fontSize: 16,
                      },
                    },
                  }}
                  selectionColor={blue}
                  underlineColor={gray}
                  activeUnderlineColor={blue}
                  onBlur={text => this.validatePassword()}
                  error={this.state.passErr}
                  secureTextEntry={this.state.showEye ? false : true}
                  right={
                    <TextInput.Icon
                      name={!this.state.showEye ? 'eye-off' : 'eye'}
                      onPress={() => {
                        this.setState({showEye: !this.state.showEye});
                      }}
                      color={blue}
                    />
                  }
                />
              </View>
              <HelperText
                type="error"
                visible={this.state.passErr}
                style={styles.helperTxt}>
                {this.state.passErrTxt}
              </HelperText>
              <HelperText
                type="error"
                visible={this.state.error}
                style={{fontFamily: RegularFont}}>
                {this.state.errorTxt}
              </HelperText>
            </View>

            <View style={styles.checkTxt}>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('ForgetPassword')
                }>
                <Text style={styles.termsTxt}>{'Forgot Password?'}</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={() => this.SignInHandler()}
              disabled={
                this.state.emailErr == false &&
                this.state.passErr == false &&
                this.state.email != '' &&
                this.state.password != '' &&
                this.state.showProgress == false
                  ? false
                  : true
              }>
              <ButtonBox
                text={'Sign in'}
                txtColor={
                  this.state.emailErr == false &&
                  this.state.passErr == false &&
                  this.state.email != '' &&
                  this.state.password != ''
                    ? white
                    : gray
                }
                backgroundColor={
                  this.state.emailErr == false &&
                  this.state.passErr == false &&
                  this.state.email != '' &&
                  this.state.password != ''
                    ? blue
                    : lightGray
                }
                borderColor={
                  this.state.emailErr == false &&
                  this.state.passErr == false &&
                  this.state.email != '' &&
                  this.state.password != ''
                    ? blue
                    : gray
                }
                nav={this.props.navigation}
                mode={1}
              />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </ScrollView>
    );
  }
}
const {width: width} = Dimensions.get('window');
const styles = StyleSheet.create({
  mainView: {
    width: width * 0.9,
    alignSelf: 'center',
    paddingTop: 20,
  },
  title: {
    fontSize: 22,
    fontFamily: BoldFont,
    padding: 10,
  },
  termsTxt: {
    fontSize: 10,
    fontFamily: RegularFont,
    color: blue,
  },
  InputView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Icon: {
    marginTop: 5,
  },
  TextInput: {
    backgroundColor: white,
    flex: 1,
    fontSize: 16,
    width: '100%',
  },
  checkTxt: {
    padding: 10,
    marginBottom: width * 0.66,
  },
  checkView: {
    width: width * 0.95,
    marginTop: width * 0.4,
    alignSelf: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
  },
  helperTxt: {
    marginLeft: 10,
  },
  viewMargin: {
    marginVertical: 3,
  },
  flex: {
    flex: 1,
  },
  backBtn: {
    alignSelf: 'flex-start',
  },
});
