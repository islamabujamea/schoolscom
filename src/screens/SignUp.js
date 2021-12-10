/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Dimensions,
  StyleSheet,
  StatusBar,
  ScrollView,
  SafeAreaView,
  View,
  Text,
} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
const {width: width, height: height} = Dimensions.get('window');
import {black, blue, lightBlue} from '../assets/colors/index';
import {BoldFont, RegularFont} from '../assets/fonts/index';
import ButtonBox from '../components/Button';
import SignUpImg from '../images/SignUp.svg';

import BackIcon from '../images/circleBack.svg';
import BackIcon2 from '../images/back.svg';
import {TouchableOpacity} from 'react-native';

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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
          <SignUpImg
            width={width * 0.9}
            style={{alignSelf: 'center', transform: [{rotate: '180deg'}]}}
          />
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
              {'Sign Up'}
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
            goTo="SignUpForm"
          />
          <ButtonBox
            text={'Continue with LinkedIn'}
            txtColor={black}
            backgroundColor={'#fff'}
            borderColor={black}
            nav={this.props.navigation}
            goTo=""
          />
          <View
            style={{
              flexDirection: 'row',
              width: width,
              justifyContent: 'center',
              padding: 20,
            }}>
            <Text style={{fontFamily: RegularFont, fontSize: 14}}>
              {'Already have an account? '}
            </Text>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('SignIn')}>
              <Text
                style={{
                  fontFamily: RegularFont,
                  fontSize: 14,
                  color: blue,
                  fontWeight: 'bold',
                  textDecorationLine: 'underline',
                }}>
                {'Login here'}
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </ScrollView>
    );
  }
}
