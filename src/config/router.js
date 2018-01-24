import { TabNavigator, StackNavigator } from 'react-navigation';
import Profile from '../containers/Profile';
import History from '../containers/History';
import Record from '../containers/Record';
import Track from '../containers/Track';

export const Tabs = TabNavigator({
  History: { screen: History },
  Record: { screen: Record },
  Profile: { screen: Profile },
}, {
  initialRouteName: 'Record',
  tabBarPosition: 'bottom',
  animationEnabled: true,
  swipeEnabled: true,
  tabBarOptions: {
    labelStyle: {
      fontSize: 10,
    },
    activeTintColor: '#000000',
  },
});

const Root = StackNavigator({
  Tabs: {
    screen: Tabs,
  },
  Track: {
    screen: Track,
  },
}, {
  mode: 'modal',
  headerMode: 'none',
});

export default Root;
