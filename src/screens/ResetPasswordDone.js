import React, {Component} from 'react';
import {
  Dimensions,
  StatusBar,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Text,
} from 'react-native';
import {blue, white} from '../assets/colors/index';
import {RegularFont} from '../assets/fonts/index';
import Done from '../images/done.svg';
import ButtonBox from '../components/Button';

export default class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <ScrollView style={{backgroundColor: white}}>
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />
        <SafeAreaView style={styles.flex}>
          <Done style={{marginTop: width * 0.5}} />
          <Text style={styles.title}>{'Password changed successfully'}</Text>
          <ButtonBox
            text={'Continue'}
            txtColor={white}
            backgroundColor={blue}
            borderColor={blue}
            nav={this.props.navigation}
            goTo="SignInForm"
          />
        </SafeAreaView>
      </ScrollView>
    );
  }
}
const {width: width} = Dimensions.get('window');
const styles = StyleSheet.create({
  title: {
    fontSize: 14,
    fontFamily: RegularFont,
    padding: 20,
    marginBottom: width * 0.5,
  },
  flex: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
});
