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
} from 'react-native';
import {TextInput, HelperText} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {blue, gray, lightGray, white} from '../assets/colors/index';
import {BoldFont, RegularFont} from '../assets/fonts/index';
import ButtonBox from '../components/Button';
import LoaderBox from '../components/LoaderBox';
import BackIcon from '../images/circleBack.svg';
import Envelope from '../images/Envelope.svg';
import config from '../Config';

export default class ForgetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      emailErr: false,
      emailErrTxt: 'Incorrect email format',
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
    if (reg.test(text) === false) {
      console.log('Email is Not Correct');
      this.setState({emailErr: true});
      return false;
    } else {
      this.setState({emailErr: false});
      console.log('Email is Correct');
    }
  }

  async ForgetPasswordHandler() {
    this.setState({
      showProgress: !this.state.showProgress,
    });
    try {
      const response = await fetch(config.DOMAIN + 'users/forgotpassword', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: this.state.email,
        }),
      });
      let res = await response.json();
      console.log(response.url);
      console.log('resnn', res);
      if (res.error) {
        this.setState({
          errorTxt: res.message,
          error: res.error,
          showProgress: !this.state.showProgress,
        });
      } else {
        this.setState({
          error: res.error,
          showProgress: !this.state.showProgress,
        });
        await AsyncStorage.setItem('@eKard:userId', res.id.toString());
        await AsyncStorage.setItem('@eKard:RestPass', '1');
        ToastAndroid.show(res.desc, ToastAndroid.LONG);
        this.props.navigation.navigate('Verification');
      }
    } catch (error) {
      console.log('error', error);
      this.setState({
        errorTxt: 'Maximum OTP attempts per user are exceeded.',
        error: !this.state.error,
        showProgress: !this.state.showProgress,
      });
    }
  }
  render() {
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
            <Text style={styles.title}>{'Forgot Password?'}</Text>
            <Text style={styles.termsTxt}>
              {'Enter your email to reset your password'}
            </Text>
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
                />
              </View>
              <HelperText
                type="error"
                visible={this.state.emailErr}
                style={styles.helperTxt}>
                {this.state.emailErrTxt}
              </HelperText>
              <HelperText
                type="error"
                visible={this.state.error}
                style={{fontFamily: RegularFont}}>
                {this.state.errorTxt}
              </HelperText>
            </View>

            <TouchableOpacity
              onPress={() => this.ForgetPasswordHandler()}
              disabled={
                this.state.emailErr == false &&
                this.state.email != '' &&
                this.state.showProgress == false
                  ? false
                  : true
              }>
              <ButtonBox
                text={'Continue'}
                txtColor={
                  this.state.emailErr == false && this.state.email != ''
                    ? white
                    : gray
                }
                backgroundColor={
                  this.state.emailErr == false && this.state.email != ''
                    ? blue
                    : lightGray
                }
                borderColor={
                  this.state.emailErr == false && this.state.email != ''
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
    paddingLeft: 10,
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
  helperTxt: {
    marginLeft: 10,
  },
  viewMargin: {
    marginVertical: width * 0.15,
    marginBottom: width * 0.8,
  },
  flex: {
    flex: 1,
  },
  backBtn: {
    alignSelf: 'flex-start',
  },
});
