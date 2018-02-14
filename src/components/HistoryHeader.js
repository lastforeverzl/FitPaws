import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Icon, ButtonGroup } from 'react-native-elements';

const changeMinToHr = time => (time > 600 ? parseFloat(time / 60).toFixed(1) : time);
const changeUnit = time => (time > 600 ? 'hr' : 'min');

const HistoryHeader = props => (
  <View>
    <View style={styles.carousel}>
      <View style={{ flex: 1 }}>
        <TouchableOpacity onPress={props.leftArrow}>
          <Icon
            name="ios-arrow-dropleft-outline"
            type="ionicon"
            color="#FFFFFF"
          />
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.dateText}>{props.date}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <TouchableOpacity onPress={props.rightArrow}>
          <Icon
            name="ios-arrow-dropright-outline"
            type="ionicon"
            color="#FFFFFF"
          />
        </TouchableOpacity>
      </View>
    </View>
    <View style={styles.buttonGroup}>
      <ButtonGroup
        onPress={props.updateIndex}
        selectedIndex={props.selectedIndex}
        buttons={['TOTAL', 'AVG']}
        containerStyle={styles.buttonBorder}
        buttonStyle={{ backgroundColor: '#2C3E50' }}
        innerBorderStyle={{ color: '#2C3E50' }}
        textStyle={styles.buttonGroupText}
        selectedTextStyle={[styles.buttonGroupText, { fontWeight: '800' }]}
      />
    </View>
    <View style={styles.infoContainer}>
      <View style={styles.info}>
        <Text style={styles.infoText}>
          {props.selectedIndex ? props.avgData.avgWalk : props.totalData.totalWalk}
        </Text>
        <Text style={[styles.infoText, { fontSize: 14 }]}>walk</Text>
      </View>
      { props.selectedIndex ?
        <View style={styles.info}>
          <Text style={styles.infoText}>{changeMinToHr(props.avgData.avgMinutes)}</Text>
          <Text style={[styles.infoText, { fontSize: 14 }]}>
            {changeUnit(props.avgData.avgMinutes)}
          </Text>
        </View> :
        <View style={styles.info}>
          <Text style={styles.infoText}>{changeMinToHr(props.totalData.totalMinutes)}</Text>
          <Text style={[styles.infoText, { fontSize: 14 }]}>
            {changeUnit(props.totalData.totalMinutes)}
          </Text>
        </View>
      }
      <View style={styles.info}>
        <Text style={styles.infoText}>
          {props.selectedIndex ? props.avgData.avgMile : props.totalData.totalMile}
        </Text>
        <Text style={[styles.infoText, { fontSize: 14 }]}>mile</Text>
      </View>
    </View>
  </View>
);

const fontFamily = Platform.OS === 'ios' ? 'HelveticaNeue-Medium' : 'monospace';

const styles = StyleSheet.create({
  carousel: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  dateText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '500',
    textAlign: 'center',
    fontFamily,
  },
  buttonGroup: {
    alignItems: 'center',
    margin: 15,
  },
  buttonBorder: {
    borderWidth: 0,
    height: 20,
    width: 100,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 15,
  },
  info: {
    flex: 1,
    flexDirection: 'column',
  },
  infoText: {
    fontSize: 28,
    color: '#ffffff',
    fontWeight: '500',
    textAlign: 'center',
    fontFamily,
  },
  buttonGroupText: {
    fontSize: 13,
    color: '#ffffff',
    fontWeight: '300',
    fontFamily,
  },
});

export default HistoryHeader;
