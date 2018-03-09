import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import Profile from '../containers/Profile';
import History from '../containers/History';
import Record from '../containers/Record';
import Track from '../containers/Track';
import RecordDetail from '../containers/RecordDetail';
import EditProfile from '../containers/EditProfile';

export const ProfileStack = StackNavigator({
  Profile: {
    screen: Profile,
  },
  EditProfile: {
    screen: EditProfile,
  },
}, {
  headerMode: 'none',
});

export const Tabs = TabNavigator({
  History: { screen: History },
  Record: { screen: Record },
  Profile: { screen: ProfileStack },
}, {
  initialRouteName: 'Record',
  tabBarPosition: 'bottom',
  animationEnabled: true,
  swipeEnabled: true,
  tabBarOptions: {
    labelStyle: {
      fontSize: 10,
    },
    activeTintColor: '#2C3E50',
  },
  lazy: false,
  navigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ tintColor }) => {
      const { routeName } = navigation.state;
      let iconName;
      if (routeName === 'Profile') {
        iconName = 'account-circle';
      } else if (routeName === 'History') {
        iconName = 'history';
      } else if (routeName === 'Record') {
        iconName = 'album';
      }
      return <Icon name={iconName} type="MaterialCommunityIcons" size={32} color={tintColor} />;
    },
  }),
});

const Root = StackNavigator({
  Tabs: {
    screen: Tabs,
  },
  Track: {
    screen: Track,
  },
  RecordDetail: {
    screen: RecordDetail,
  },
}, {
  headerMode: 'none',
});

export default Root;
