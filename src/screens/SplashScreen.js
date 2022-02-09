import React, {Component} from 'react';
import {
  StatusBar,
  ScrollView,
  View,
  Dimensions,
  ImageBackground,
  StyleSheet,
} from 'react-native';
const {width: width, height: height} = Dimensions.get('window');
export default class SplashScreen extends Component {
  async UNSAFE_componentWillMount() {
    this.loginInterval = setInterval(() => {
      this.renderLoading();
    }, 1000);
  }

  async renderLoading() {
    clearInterval(this.loginInterval);
    this.props.navigation.navigate('Home');
  }

  render() {
    return (
      <ScrollView>
        <StatusBar hidden />
        <View style={styles.container}>
          <ImageBackground
            source={require('../images/splash.jpeg')}
            resizeMode="center"
            style={styles.image}
          />
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    height: height,
    width: width,
  },
});
