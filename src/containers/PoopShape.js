import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import SingleShape from './SingleShape';

const list = [
  {
    id: 1,
    title: 'Separate hard lumps',
    icon: 'poop-1',
  },
  {
    id: 2,
    title: 'Lumpy log with segments',
    icon: 'poop-2',
  },
  {
    id: 3,
    title: 'Smooth log no visible segments',
    icon: 'poop-3',
  },
  {
    id: 4,
    title: 'Very moist distinct logs',
    icon: 'poop-4',
  },
  {
    id: 5,
    title: 'Very moist pile distinct shape',
    icon: 'poop-5',
  },
  {
    id: 6,
    title: 'Piles with texture no shape',
    icon: 'poop-6',
  },
  {
    id: 7,
    title: 'Watery no texture flat',
    icon: 'poop-7',
  },
];

class PoopShape extends React.PureComponent {
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
    <SingleShape
      id={item.id}
      icon={item.icon}
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

export default PoopShape;
