import React from 'react';
import { Text, View, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import CustomIcon from '../config/CustomIcon';
import { FEEL_SCALE, POOP_SHAPE, POOP_COLOR } from '../config/constants';

const HistoryItem = props => (
  <TouchableOpacity activeOpacity={0.5} onPress={props.onPressItem}>
    <View style={styles.row}>
      <Text style={[styles.text, { color: '#97A6A7' }]}>
        {props.item.creationDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
      </Text>
      <Text style={[styles.text, { color: '#97A6A7', marginLeft: 10 }]}>
        {props.item.creationDate.toLocaleTimeString('en-US', { hour12: true, hour: 'numeric', minute: 'numeric' })}
      </Text>
    </View>
    <View style={styles.row}>
      <View style={styles.iconTextContainer}>
        <Icon
          name="md-time"
          type="ionicon"
          size={14}
          color="#2C3E50"
        />
        <Text style={[styles.text, { marginLeft: 5, fontSize: 14 }]}>{props.item.time} minute</Text>
      </View>
      <View style={styles.iconTextContainer}>
        <Icon
          name="md-speedometer"
          type="ionicon"
          size={14}
          color="#2C3E50"
        />
        <Text style={[styles.text, { marginLeft: 5, fontSize: 14 }]}>
          {parseFloat(props.item.distance).toFixed(2)} mile
        </Text>
      </View>
      <View style={styles.iconTextContainer}>
        <Icon
          name={FEEL_SCALE[props.item.feelScale - 1].icon}
          type="material-community"
          size={14}
          color="#2C3E50"
        />
        <Text style={[styles.text, { marginLeft: 5, fontSize: 14 }]}>
          {FEEL_SCALE[props.item.feelScale - 1].feel}
        </Text>
      </View>
    </View>
    <View style={styles.row}>
      <CustomIcon name="poopIcon" size={12} color="#34495E" />
      {
        props.item.poop ?
          <View style={[styles.row, { marginLeft: 15 }]}>
            {
              props.item.poopShape > 0 ?
                <View style={styles.iconTextContainer}>
                  <CustomIcon
                    name={POOP_SHAPE[props.item.poopShape - 1].icon}
                    size={12}
                    color="#34495E"
                  />
                  <Text style={[styles.text, { marginLeft: 5 }]}>
                    {POOP_SHAPE[props.item.poopShape - 1].title}
                  </Text>
                </View> :
                <View style={styles.iconTextContainer}>
                  <Text style={styles.text}>pooped</Text>
                </View>
            }
            {
              props.item.poopColor > 0 ?
                <View style={styles.iconTextContainer}>
                  <View
                    style={[styles.poopColor, { backgroundColor: POOP_COLOR[props.item.poopColor - 1].color }]}
                  />
                  <Text style={[styles.text, { marginLeft: 5 }]} >
                    {POOP_COLOR[props.item.poopColor - 1].title}
                  </Text>
                </View> :
                <View />
            }
          </View> :
          <View style={{ marginRight: 15 }}>
            <Text style={styles.text}>no poop</Text>
          </View>
      }
    </View>
    <View style={styles.row}>
      <CustomIcon name="peeIcon" size={12} color="#34495E" />
      <View style={{ marginLeft: 15 }}>
        <Text style={styles.text}>{props.item.pee ? 'peed' : 'no pee'}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const fontFamily = Platform.OS === 'ios' ? 'HelveticaNeue-Medium' : 'monospace';

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: 5,
  },
  text: {
    color: '#2C3E50',
    fontSize: 12,
    fontWeight: 'normal',
    fontFamily,
    textAlign: 'center',
  },
  poopColor: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  iconTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
});

export default HistoryItem;
