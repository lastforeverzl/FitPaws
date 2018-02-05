import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import SingleColor from './SingleColor';

const list = [
  {
    id: 1,
    title: 'Brown',
    color: '#A56609',
  },
  {
    id: 2,
    title: 'Green',
    color: '#66BB66',
  },
  {
    id: 3,
    title: 'Yellow',
    color: '#E7CE13',
  },
  {
    id: 4,
    title: 'Red',
    color: '#D9534F',
  },
  {
    id: 5,
    title: 'Black',
    color: '#3B3B3B',
  },
];

class PoopColor extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selected: (new Map(): Map<number, boolean>),
    };
  }

  _onPressItem = (id: number) => {
    this.setState(() => {
      const selected = new Map();
      selected.set(id, !selected.get(id)); // toggle
      return { selected };
    });
  }

  renderItem = ({ item }) => (
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
          data={list}
          horizontal
          extraData={this.state.selected}
          keyExtractor={(item, index) => item.id}
          renderItem={this.renderItem}
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
