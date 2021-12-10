import React, {Component} from 'react';
import {StatusBar, ScrollView, View, Text, Dimensions} from 'react-native';
const {width: width, height: height} = Dimensions.get('window');
import {BoldFont, RegularFont} from '../assets/fonts/index';
import {blue, white} from '../assets/colors';

export default class SplashScreen extends Component {
  async UNSAFE_componentWillMount() {
    this.loginInterval = setInterval(() => {
      this.renderLoading();
    }, 1000);
  }

  async renderLoading() {
    // const userId = await AsyncStorage.getItem('@Rehab:userId');
    // if (userId == null) {
    redirectID = 'IntroductionScreen';
    // } else {
    //   redirectID = 'Home';
    // }
    clearInterval(this.loginInterval);
    this.props.navigation.navigate(redirectID);
  }

  render() {
    return (
      <ScrollView style={{backgroundColor: blue}}>
        <StatusBar backgroundColor={blue} barStyle="light-content" />
        <View
          style={{
            alignContent: 'center',
            alignItems: 'center',
            marginVertical: height * 0.4,
          }}>
          <Text
            style={{
              fontSize: 50,
              color: white,
              fontFamily: BoldFont,
              fontStyle: 'italic',
              fontWeight: 'bold',
            }}>
            {'eKard'}
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: white,
              fontFamily: RegularFont,
            }}>
            {'Contactless Digital Business Cards'}
          </Text>
        </View>
      </ScrollView>
    );
  }
}
