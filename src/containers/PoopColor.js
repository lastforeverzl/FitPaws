import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import SingleColor from './SingleColor';
import { POOP_COLOR } from '../config/constants';

class PoopColor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: (new Map(): Map<string, boolean>),
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.collapse === true) {
      this.setState({
        selected: (new Map(): Map<string, boolean>),
      });
    }
  }

  _onPressItem = (id: string) => {
    this.setState(() => {
      const selected = new Map();
      selected.set(id, !selected.get(id)); // toggle
      return { selected };
    });
  }

  _renderItem = ({ item }) => (
    <SingleColor
      id={item.id}
      color={item.color}
      title={item.title}
      onPressItem={this._onPressItem}
      selected={!!this.state.selected.get(item.id)}
    />
  );

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={POOP_COLOR}
          horizontal
          extraData={this.state}
          keyExtractor={item => item.id}
          renderItem={this._renderItem}
          showsHorizontalScrollIndicator={false}
          removeClippedSubviews={false}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 10,
  },
});

export default PoopColor;
