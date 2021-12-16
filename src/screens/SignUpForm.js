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
  ToastAndroid,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {TextInput, HelperText} from 'react-native-paper';
import {CheckBox} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceInfo from 'react-native-device-info';
import {blue, gray, lightGray, white} from '../assets/colors/index';
import {BoldFont, RegularFont} from '../assets/fonts/index';
import ButtonBox from '../components/Button';
import LoaderBox from '../components/LoaderBox';
import BackIcon from '../images/circleBack.svg';
import Envelope from '../images/Envelope.svg';
import User from '../images/user.svg';
import Lock from '../images/lock.svg';
import UnCheck from '../images/unCheck.svg';
import Check from '../images/check.svg';
import config from '../Config';

export default class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      emailErr: false,
      emailErrTxt: 'Incorrect email format',
      name: '',
      nameErr: false,
      nameErrTxt: 'Full name must be at least 2 characters',
      password: '',
      passErr: false,
      passErrTxt: 'Password must be have at least 6 characters long',
      showEye: false,
      checked: false,
      error: false,
      showProgress: false,
      errorTxt: '',
      profile_pic: '',
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
    }
  }

  validateName() {
    var text = this.state.name;
    console.log(text.length);
    if (text != '') {
      if (text.length >= 2 && text.length < 50) {
        this.setState({nameErr: false});
        return false;
      } else {
        this.setState({nameErr: true});
      }
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
    }
  }
  async SignUpHandler() {
    this.setState({
      showProgress: !this.state.showProgress,
    });
    try {
      const response = await fetch(config.DOMAIN + 'api/users.json', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: this.state.name,
          email: this.state.email,
          password: this.state.password,
          deviceid: DeviceInfo.getUniqueId(),
          profile_pic: this.state.profile_pic,
        }),
      });
      let res = await response.json();
      console.log(response.url);
      console.log('resnn', res);
      if (res.message.error) {
        this.setState({
          showProgress: !this.state.showProgress,
          errorTxt: res.message.desc,
          error: res.message.error,
        });
      } else {
        this.setState({
          showProgress: !this.state.showProgress,
          error: res.message.error,
        });
        await AsyncStorage.setItem('@eKard:userId', res.user.id.toString());
        ToastAndroid.show(res.message.desc, ToastAndroid.LONG);
        this.props.navigation.navigate('Verification');
      }
    } catch (error) {
      this.setState({
        errorTxt: 'Maximum OTP attempts per user are exceeded.',
        error: !this.state.error,
        showProgress: !this.state.showProgress,
      });
    }
  }
  render() {
    console.log(DeviceInfo.getUniqueId());
    return (
      <ScrollView
        style={{backgroundColor: white}}
        // keyboardShouldPersistTaps="always"
      >
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />
        {this.renderLoading()}

        <SafeAreaView style={styles.flex}>
          <View style={styles.mainView}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
              <BackIcon style={styles.backBtn} />
            </TouchableOpacity>
            <Text style={styles.title}>{'Let’s get started'}</Text>

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
                  selectionColor={blue}
                  underlineColor={gray}
                  activeUnderlineColor={blue}
                  onBlur={text => this.validateEmail()}
                  error={this.state.emailErr}
                  onSubmitEditing={() => {
                    this.nameInput.focus();
                  }}
                  blurOnSubmit={false}
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
                <User style={styles.Icon} />
                <TextInput
                  keyboardType="name-phone-pad"
                  label="Full Name"
                  ref={input => {
                    this.nameInput = input;
                  }}
                  onSubmitEditing={() => {
                    this.passInput.focus();
                  }}
                  blurOnSubmit={false}
                  value={this.state.name}
                  onChangeText={text => this.setState({name: text})}
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
                  onBlur={text => this.validateName()}
                  error={this.state.nameErr}
                />
              </View>
              <HelperText
                type="error"
                visible={this.state.nameErr}
                style={styles.helperTxt}>
                {this.state.nameErrTxt}
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
            <View style={styles.checkView}>
              <CheckBox
                checkedIcon={<Check style={{}} />}
                uncheckedIcon={<UnCheck />}
                checked={this.state.checked}
                onPress={() => this.setState({checked: !this.state.checked})}
              />
              <View style={styles.checkTxt}>
                <Text style={styles.termsTxt}>
                  {
                    'By creating an account you agree to our Terms of Service and Privacy Policy'
                  }
                </Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => this.SignUpHandler()}
              disabled={
                this.state.emailErr == false &&
                this.state.nameErr == false &&
                this.state.passErr == false &&
                this.state.email != '' &&
                this.state.name != '' &&
                this.state.password != '' &&
                this.state.checked == true &&
                this.state.showProgress == false
                  ? false
                  : true
              }>
              <ButtonBox
                text={'Sign Up'}
                txtColor={
                  this.state.emailErr == false &&
                  this.state.nameErr == false &&
                  this.state.passErr == false &&
                  this.state.email != '' &&
                  this.state.name != '' &&
                  this.state.password != '' &&
                  this.state.checked == true
                    ? white
                    : gray
                }
                backgroundColor={
                  this.state.emailErr == false &&
                  this.state.nameErr == false &&
                  this.state.passErr == false &&
                  this.state.email != '' &&
                  this.state.name != '' &&
                  this.state.password != '' &&
                  this.state.checked == true
                    ? blue
                    : lightGray
                }
                borderColor={
                  this.state.emailErr == false &&
                  this.state.nameErr == false &&
                  this.state.passErr == false &&
                  this.state.email != '' &&
                  this.state.name != '' &&
                  this.state.password != '' &&
                  this.state.checked == true
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
    color: gray,
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
    flexShrink: 1,
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
    fontFamily: RegularFont,
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
