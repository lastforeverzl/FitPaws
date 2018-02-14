import React from 'react';
import { TabNavigator, TabBarTop } from 'react-navigation';
import DayTab from '../containers/DayTab';
import MonthTab from '../containers/MonthTab';
import YearTab from '../containers/YearTab';

const indicatorStyle = props => ({
  backgroundColor: props.activeTintColor,
});

const HistoryTab = TabNavigator({
  Day: { screen: DayTab },
  Month: { screen: MonthTab },
  Year: { screen: YearTab },
}, {
  tabBarComponent: props => <TabBarTop {...props} indicatorStyle={indicatorStyle(props)} />,
  tabBarPosition: 'top',
  animationEnabled: false,
  swipeEnabled: false,
  tabBarOptions: {
    initialRouteName: 'Day',
    labelStyle: {
      fontSize: 12,
    },
    showIcon: false,
    activeTintColor: '#ffffff',
    style: {
      backgroundColor: '#2C3E50',
    },
    tabStyle: {
      borderBottomColor: '#ffffff',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
});

export default HistoryTab;
