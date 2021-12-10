import React, {Component} from 'react';
import {Image, StyleSheet} from 'react-native';

export default class LoaderBox extends Component {
  render() {
    return (
      <Image source={require('../images/spinner.gif')} style={styles.loader} />
    );
  }
}
const styles = StyleSheet.create({
  loader: {
    ...StyleSheet.absoluteFillObject,
    width: 70,
    height: 70,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    left: '50%',
    marginLeft: -35,
    top: '50%',
    bottom: 0,
    marginTop: -35,
    zIndex: 10,
  },
});
