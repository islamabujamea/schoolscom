import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {BoldFont, RegularFont} from '../assets/fonts/index';

export default class Button extends Component {
  render() {
    return (
      <View>
        {this.props.mode == 1 ? (
          <View
            style={[
              styles.btnView,
              {
                borderColor: this.props.borderColor,
                backgroundColor: this.props.backgroundColor,
              },
            ]}>
            <Text style={[styles.btnTxt, {color: this.props.txtColor}]}>
              {this.props.text}
            </Text>
          </View>
        ) : (
          <TouchableOpacity
            onPress={() => this.props.nav.navigate(this.props.goTo)}>
            <View
              style={[
                styles.btnView,
                {
                  borderColor: this.props.borderColor,
                  backgroundColor: this.props.backgroundColor,
                },
              ]}>
              <Text style={[styles.btnTxt, {color: this.props.txtColor}]}>
                {this.props.text}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}
// Constants
const {width: width} = Dimensions.get('window');
const styles = StyleSheet.create({
  btnTxt: {
    fontFamily: BoldFont,
    fontSize: 16,
    textAlign: 'center',
  },
  btnView: {
    width: width * 0.8,
    alignSelf: 'center',
    padding: 15,
    borderRadius: 50,
    borderWidth: 1,
    marginVertical: 7,
  },
});
