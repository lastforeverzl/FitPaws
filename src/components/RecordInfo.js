import React from 'react';
import { Text, View, StyleSheet, Platform } from 'react-native';
import { ButtonGroup } from 'react-native-elements';

const changeMinToHr = time => (time > 600 ? parseFloat(time / 60).toFixed(1) : time);
const changeUnit = time => (time > 600 ? 'hr' : 'min');

const RecordInfo = props => (
  <View>
    <View style={styles.buttonGroup}>
      <ButtonGroup
        onPress={props.updateIndex}
        selectedIndex={props.selectedIndex}
        buttons={['TOTAL', 'AVG']}
        containerStyle={styles.buttonBorder}
        buttonStyle={{ backgroundColor: 'transparent' }}
        selectedButtonStyle={{ backgroundColor: '#2C3E50' }}
        innerBorderStyle={{ color: '#2C3E50' }}
        textStyle={styles.buttonGroupText}
        selectedTextStyle={[styles.buttonGroupText, { fontWeight: '800' }]}
      />
    </View>
    <View style={styles.infoContainer}>
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
  buttonGroup: {
    alignItems: 'center',
  },
  buttonBorder: {
    borderWidth: 0,
    height: 20,
    width: 100,
    backgroundColor: 'transparent',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 250,
    marginTop: 10,
    marginBottom: 10,
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

export default RecordInfo;
