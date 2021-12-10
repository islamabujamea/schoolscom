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
import BackIcon from '../images/circleBack.svg';
import Lock from '../images/lock.svg';
import ButtonBox from '../components/Button';
import config from '../Config';
import LoaderBox from '../components/LoaderBox';

export default class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      passErr: false,
      passErrTxt: 'Password must be have at least 6 characters long',
      showEye: false,
      confirmPassword: '',
      passErr2: false,
      passErrTxt2: 'Password must be have at least 6 characters long',
      showEye2: false,
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
  validatePassword(mode) {
    var text = mode == 1 ? this.state.password : this.state.confirmPassword;
    if (text.length >= 6) {
      if (mode == 1) {
        this.setState({passErr: false});
      } else {
        this.setState({passErr2: false});
      }
      return false;
    } else {
      if (mode == 1) {
        this.setState({passErr: true});
      } else {
        this.setState({passErr2: true});
      }
    }
  }
  async ResetPasswordHandler() {
    var id = await AsyncStorage.getItem('@eKard:userId');
    var token = await AsyncStorage.getItem('@eKard:token');
    this.setState({
      showProgress: !this.state.showProgress,
    });
    try {
      const response = await fetch(
        config.DOMAIN + 'api/users/edit/' + id + '.json',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
          body: JSON.stringify({
            password: this.state.password,
          }),
        },
      );
      let res = await response.json();
      console.log(response.url);
      console.log('resnn', res);
      if (res.message.error) {
        this.setState({
          errorTxt: res.message.desc,
          error: !this.state.error,
          showProgress: !this.state.showProgress,
        });
      } else {
        this.setState({
          showProgress: !this.state.showProgress,
        });
        this.props.navigation.navigate('ResetPasswordDone');
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
            <Text style={styles.title}>{'Reset password'}</Text>
            <Text style={styles.termsTxt}>{'Enter new password'}</Text>
            <View style={styles.viewMargin}>
              <View style={styles.InputView}>
                <Lock style={styles.Icon} />
                <TextInput
                  label="New Password"
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
                  onBlur={text => this.validatePassword(1)}
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
            </View>
            <View
              style={[
                styles.viewMargin,
                {marginTop: width * 0.05, marginBottom: width * 0.1},
              ]}>
              <View style={styles.InputView}>
                <Lock style={styles.Icon} />
                <TextInput
                  label="Confirm new password"
                  value={this.state.confirmPassword}
                  onChangeText={text =>
                    this.setState({
                      confirmPassword: text,
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
                  onBlur={text => this.validatePassword(2)}
                  error={this.state.passErr2}
                  secureTextEntry={this.state.showEye2 ? false : true}
                  right={
                    <TextInput.Icon
                      name={!this.state.showEye2 ? 'eye-off' : 'eye'}
                      onPress={() => {
                        this.setState({showEye2: !this.state.showEye2});
                      }}
                      color={blue}
                    />
                  }
                />
              </View>
              <HelperText
                type="error"
                visible={this.state.passErr2}
                style={styles.helperTxt}>
                {this.state.passErrTxt2}
              </HelperText>
              <HelperText
                type="error"
                visible={this.state.error}
                style={{fontFamily: RegularFont}}>
                {this.state.errorTxt}
              </HelperText>
            </View>

            <TouchableOpacity
              onPress={() => this.ResetPasswordHandler()}
              disabled={
                this.state.passErr2 == false &&
                this.state.passErr == false &&
                this.state.password == this.state.confirmPassword &&
                this.state.password != '' &&
                this.state.confirmPassword != ''
                  ? false
                  : true
              }>
              <ButtonBox
                text={'Save'}
                txtColor={
                  this.state.passErr2 == false &&
                  this.state.passErr == false &&
                  this.state.password == this.state.confirmPassword &&
                  this.state.password != '' &&
                  this.state.confirmPassword != ''
                    ? white
                    : gray
                }
                backgroundColor={
                  this.state.passErr2 == false &&
                  this.state.passErr == false &&
                  this.state.password == this.state.confirmPassword &&
                  this.state.password != '' &&
                  this.state.confirmPassword != ''
                    ? blue
                    : lightGray
                }
                borderColor={
                  this.state.passErr2 == false &&
                  this.state.passErr == false &&
                  this.state.password == this.state.confirmPassword &&
                  this.state.password != '' &&
                  this.state.confirmPassword != ''
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
    fontSize: 14,
    fontFamily: RegularFont,
    color: gray,
    paddingLeft: 10,
  },
  codeTxt: {
    fontSize: 15,
    fontFamily: BoldFont,

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
  helperTxt: {
    marginLeft: 10,
  },
  viewMargin: {
    marginTop: width * 0.1,
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
