import { TabNavigator, StackNavigator } from 'react-navigation';
import Profile from '../components/Profile';
import History from '../components/History';
import Record from '../components/Record';
import Track from '../components/Track';

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
  headerMode: 'none',
});

export default Root;
