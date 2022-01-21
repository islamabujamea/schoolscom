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
  Platform,
} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
const {width: width, height: height} = Dimensions.get('window');
import {black, blue, lightBlue} from '../assets/colors/index';
import {BoldFont, RegularFont} from '../assets/fonts/index';
import ButtonBox from '../components/Button';
import slider1 from '../images/slider1.svg';
import slider2 from '../images/slider2.svg';
import slider3 from '../images/slider3.svg';
import slider4 from '../images/slider4.svg';
import slider5 from '../images/slider5.svg';

export default class IntroductionScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeIndex: 0,
      carouselItems: [
        {
          title: 'Contactless digital business cards',
          text:
            'No need to carry physical business cards anymore, carry your business card in your smart phone eKard app. eKard gives you free contactless digital business cards that have all your information in one place.',
          image: slider1,
        },
        {
          title: 'Never run out of digital business cards',
          text:
            'Share as many cards as you want anytime. Create digital business cards in different layouts whether for professional or personal use.',
          image: slider2,
        },
        {
          title: 'Easily connect with your digital business card',
          text:
            'Simply share your digital business card in person, over email, or via social networks. Your eKard digital business card will always be updated in your contacts eKard wallets.',
          image: slider3,
        },
        {
          title: 'Quickly access your contacts info from eKard wallet',
          text:
            'Easily search your contacts in your eKard wallet, get instant access to your contacts’ email, phone, LinkedIn, WhatsApp, etc.',
          image: slider4,
        },
        {
          title: 'Save cost and go green',
          text:
            'Save printing/reprinting cost for paper-based business cards. Go Digital!',
          image: slider5,
        },
      ],
    };
  }

  _renderItem({item, index}) {
    return (
      <View style={{marginTop: width * 0.1}}>
        {Platform.OS == 'ios' && (
          <item.image
            width={width * 0.85}
            style={{transform: [{rotate: '180deg'}], alignSelf: 'center'}}
          />
        )}
        {Platform.OS !== 'ios' && (
          <item.image width={width * 0.85} style={{alignSelf: 'center'}} />
        )}
        <View
          style={{
            width: width * 0.85,
            // backgroundColor: 'red',
            alignSelf: 'center',
            paddingTop: 10,
          }}>
          <Text
            style={{
              fontSize: 22,
              fontFamily: BoldFont,
            }}>
            {item.title}
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontFamily: RegularFont,
            }}>
            {item.text}
          </Text>
        </View>
      </View>
    );
  }
  get pagination() {
    //const { entries, activeSlide } = this.state;
    return (
      <Pagination
        dotsLength={this.state.carouselItems.length}
        activeDotIndex={this.state.activeIndex}
        containerStyle={{
          alignSelf: 'flex-start',
          width: width * 0.25,
          justifyContent: 'space-around',
          marginHorizontal: 10,
        }}
        dotStyle={{
          width: 18,
          height: 8,
          borderRadius: 10 / 2,
          backgroundColor: blue,
        }}
        inactiveDotStyle={{
          width: 10,
          height: 10,
          borderRadius: 10 / 2,
          backgroundColor: lightBlue,
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    );
  }
  render() {
    return (
      <ScrollView style={{backgroundColor: '#fff'}}>
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />

        <SafeAreaView style={{flex: 1}}>
          {/* {this.state.activeIndex != 0 && (
            <TouchableOpacity
              onPress={() => {
                this.setState({
                  activeIndex: this.state.activeIndex - 1,
                });
                this._renderItem();
              }}>
              <View
                style={{
                  width: width * 0.9,
                  alignSelf: 'center',
                  paddingTop: 20,
                }}>
                <BackIcon style={{alignSelf: 'flex-start'}} />
              </View>
            </TouchableOpacity>
          )} */}
          {/* {this.state.activeIndex == 0 && (
            <View
              style={{
                width: width * 0.9,
                alignSelf: 'center',
                paddingTop: 20,
              }}>
              <BackIcon2 style={{alignSelf: 'flex-start'}} />
            </View>
          )} */}
          <View style={{flexDirection: 'row'}}>
            <Carousel
              layout={'default'}
              ref={ref => (this.carousel = ref)}
              data={this.state.carouselItems}
              sliderWidth={width}
              itemWidth={width}
              renderItem={this._renderItem}
              onSnapToItem={index => this.setState({activeIndex: index})}
            />
          </View>
          <View
            style={{
              width: width,
              alignSelf: 'center',
            }}>
            {this.pagination}
          </View>
          <ButtonBox
            text={'Sign up'}
            txtColor="#fff"
            backgroundColor={blue}
            borderColor={blue}
            nav={this.props.navigation}
            goTo="SignUp"
          />
          <ButtonBox
            text={'Sign in'}
            txtColor={black}
            backgroundColor={'#fff'}
            borderColor={black}
            nav={this.props.navigation}
            goTo="SignIn"
          />
        </SafeAreaView>
      </ScrollView>
    );
  }
}
