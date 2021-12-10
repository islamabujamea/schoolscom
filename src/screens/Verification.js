/* eslint-disable react-native/no-inline-styles */
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
import {blue, gray, white, black} from '../assets/colors/index';
import {BoldFont, RegularFont} from '../assets/fonts/index';
import BackIcon from '../images/circleBack.svg';
import CodeInput from 'react-native-confirmation-code-input';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CountDown from 'react-native-countdown-component';
import config from '../Config';
import LoaderBox from '../components/LoaderBox';

export default class Verification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      backColor: '',
      codeSent: true,
      count: 0,
      countErr: '',
      codeIncorrect: '',
      showProgress: false,
    };
  }
  renderLoading() {
    if (this.state.showProgress) {
      return <LoaderBox />;
    }
  }
  async checkCode(code) {
    console.log('code ..', code);
    this.setState({
      showProgress: !this.state.showProgress,
    });
    var id = await AsyncStorage.getItem('@eKard:userId');
    try {
      const response = await fetch(
        config.DOMAIN + 'api/users/verify/' + id + '.json',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            code: code,
          }),
        },
      );
      let res = await response.json();
      console.log(response.url);
      console.log('resnn', res);
      this.setState({
        showProgress: !this.state.showProgress,
      });
      if (!res.error) {
        await AsyncStorage.setItem('@eKard:token', res.token);
        var RestPass = await AsyncStorage.getItem('@eKard:RestPass');
        console.log('REser', RestPass);
        if (RestPass != null) {
          await AsyncStorage.clear();
          this.props.navigation.navigate('ResetPassword');
        } else {
          this.props.navigation.navigate('Home');
        }
      } else {
        this.setState({
          backColor: 'red',
          codeIncorrect: res.desc,
          showProgress: !this.state.showProgress,
        });
        this.refs.codeInputRef.clear();
        setInterval(() => {
          this.setState({
            backColor: '',
            codeIncorrect: '',
          });
        }, 1500);
      }
    } catch (error) {
      this.setState({
        showProgress: !this.state.showProgress,
        backColor: 'red',
        codeIncorrect: 'Maximum OTP attempts per user are exceeded.',
      });
      this.refs.codeInputRef.clear();
      setInterval(() => {
        this.setState({
          backColor: '',
          codeIncorrect: '',
        });
      }, 2000);
    }
  }
  async ResendCode() {
    var id = await AsyncStorage.getItem('@eKard:userId');
    this.setState({
      showProgress: !this.state.showProgress,
    });
    try {
      const response = await fetch(
        config.DOMAIN + 'api/users/generatecode/' + id + '.json',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      );
      let res = await response.json();
      console.log(response.url);
      console.log('resnn', res);
      if (!res.message.error) {
        this.setState({
          codeIncorrect: res.message.desc,
          showProgress: !this.state.showProgress,
        });
      } else {
        this.setState({
          codeSent: !this.state.codeSent,
          showProgress: !this.state.showProgress,
        });
      }
    } catch (error) {
      this.setState({
        codeIncorrect: 'Maximum OTP attempts per user are exceeded.',
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
            <Text style={styles.title}>{'Verification'}</Text>
            <Text style={styles.termsTxt}>
              {'A verification code of 4 digits has been sent to your email'}
            </Text>

            <TouchableOpacity
              disabled={this.state.codeSent ? true : false}
              onPress={() => {
                this.ResendCode();
              }}>
              <View>
                {!this.state.codeSent && (
                  <Text style={styles.codeTxt}>{'Resend Code'}</Text>
                )}
                {this.state.codeSent && (
                  <Text style={[styles.codeTxt, {textDecorationLine: 'none'}]}>
                    {'Code sent to your registered email'}
                  </Text>
                )}
              </View>
            </TouchableOpacity>

            {this.state.codeSent && (
              <View
                style={{
                  flexDirection: 'row',
                  width: width * 0.9,
                  alignSelf: 'center',
                  alignItems: 'center',
                  paddingTop: 10,
                }}>
                <Text style={[styles.termsTxt, {paddingTop: 3}]}>
                  {'The code is valid for the next'}
                </Text>

                <CountDown
                  until={600}
                  onFinish={() => {
                    this.setState({codeSent: !this.state.codeSent});
                  }}
                  size={8}
                  digitStyle={{
                    backgroundColor: white,
                  }}
                  digitTxtStyle={{
                    fontSize: 14,
                    fontFamily: BoldFont,
                    color: black,
                  }}
                  timeToShow={['M', 'S']}
                  timeLabels={{m: null, s: null}}
                  showSeparator
                />
                <Text style={[styles.time, {paddingTop: 3}]}>{' mins'}</Text>
              </View>
            )}
            <View style={styles.viewMargin}>
              <CodeInput
                ref="codeInputRef"
                keyboardType="numeric"
                codeLength={4}
                className="border-circle"
                size={65}
                space={15}
                codeInputStyle={{
                  color:
                    this.state.backColor == '' ? blue : this.state.backColor,
                  fontSize: 22,
                  fontFamily: BoldFont,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderWidth: 1.5,
                }}
                inactiveColor={
                  this.state.backColor == ''
                    ? 'rgb(96, 96, 96)'
                    : this.state.backColor
                }
                activeColor={
                  this.state.backColor == ''
                    ? 'rgba(47, 128, 237, 1)'
                    : this.state.backColor
                }
                onFulfill={code => {
                  console.log(code);
                  this.checkCode(code);
                }}
              />
            </View>
            {this.state.countErr != '' && (
              <Text
                style={[styles.termsTxt, {color: 'red', textAlign: 'center'}]}>
                {this.state.countErr}
              </Text>
            )}
            {this.state.codeIncorrect != '' && (
              <Text
                style={[styles.termsTxt, {color: 'red', textAlign: 'center'}]}>
                {this.state.codeIncorrect}
              </Text>
            )}
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
  time: {
    fontSize: 14,
    fontFamily: BoldFont,
    // paddingLeft: 1,
  },
  termsTxt: {
    fontSize: 14,
    fontFamily: RegularFont,
    color: gray,
    paddingLeft: 10,
  },
  codeTxt: {
    fontSize: 15,
    fontFamily: BoldFont,
    color: blue,
    paddingLeft: 10,
    paddingTop: 20,
    textDecorationLine: 'underline',
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
    marginVertical: width * 0.15,
    width: width * 0.9,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  flex: {
    flex: 1,
  },
  backBtn: {
    alignSelf: 'flex-start',
  },
});
