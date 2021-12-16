/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Dimensions,
  StyleSheet,
  StatusBar,
  ScrollView,
  SafeAreaView,
  View,
  TouchableOpacity,
  Text,
  Platform,
} from 'react-native';
import LinkedInModal from 'react-native-linkedin';
const {width: width, height: height} = Dimensions.get('window');
import {black, blue, lightBlue} from '../assets/colors/index';
import {BoldFont, RegularFont} from '../assets/fonts/index';
import ButtonBox from '../components/Button';
import SignInImg from '../images/SignIn.svg';
import BackIcon from '../images/circleBack.svg';

export default class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  LinkedinLogin() {
    return (
      <LinkedInModal
        shouldGetAccessToken={false}
        clientSecret={'TzhACuWkhfwxz9yX'}
        clientID={'77lwv1s9ddrx5t'}
        redirectUri={'https://www.linkedin.com/developer/apps'}
        // redirectUri="http://usamamoin.com/auth"
        onSuccess={authentication_code =>
          console.log('Post this to your server.' + authentication_code)
        }
      />
    );
  }
  render() {
    return (
      <ScrollView style={{backgroundColor: '#fff'}}>
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />
        <SafeAreaView style={{flex: 1}}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <View
              style={{
                width: width * 0.9,
                alignSelf: 'center',
                paddingTop: 20,
              }}>
              <BackIcon style={{alignSelf: 'flex-start'}} />
            </View>
          </TouchableOpacity>
          {Platform.OS == 'ios' && (
            <SignInImg
              width={width * 0.9}
              style={{alignSelf: 'center', transform: [{rotate: '180deg'}]}}
            />
          )}
          {Platform.OS !== 'ios' && (
            <SignInImg width={width * 0.9} style={{alignSelf: 'center'}} />
          )}
          {/* //read more about it  */}
          <View style={styles.container}>
            <LinkedInModal
              ref={this.linkedRef}
              clientSecret={'TzhACuWkhfwxz9yX'}
              clientID={'77lwv1s9ddrx5t'}
              redirectUri={'https://oauth.pstmn.io/v1/callback'}
              onSuccess={token => console.log(token)}
            />
          </View>
          <View
            style={{
              width: width * 0.8,
              alignSelf: 'flex-start',
              padding: 20,
              justifyContent: 'flex-start',
            }}>
            <Text
              style={{
                fontSize: 48,
                fontFamily: BoldFont,
                fontStyle: 'italic',
                fontWeight: 'bold',
              }}>
              {'Sign In'}
            </Text>
            <Text
              style={{
                fontSize: 22,
                fontFamily: BoldFont,
              }}>
              {'Embrace the newest digital version'}
            </Text>
          </View>
          <ButtonBox
            text={'Continue with email'}
            txtColor="#fff"
            backgroundColor={blue}
            borderColor={blue}
            nav={this.props.navigation}
            goTo="SignInForm"
          />
          <TouchableOpacity onPress={() => this.LinkedinLogin()}>
            <ButtonBox
              text={'Continue with LinkedIn'}
              txtColor={black}
              backgroundColor={'#fff'}
              borderColor={black}
              nav={this.props.navigation}
              mode={1}
            />
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              width: width,
              justifyContent: 'center',
              padding: 20,
            }}>
            <Text style={{fontFamily: RegularFont, fontSize: 14}}>
              {'Don’t have an account? '}
            </Text>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('SignUp')}>
              <Text
                style={{
                  fontFamily: RegularFont,
                  fontSize: 14,
                  color: blue,
                  fontWeight: 'bold',
                  textDecorationLine: 'underline',
                }}>
                {'Register here'}
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
