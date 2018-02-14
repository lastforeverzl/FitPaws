import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import SingleButton from './SingleButton';

const buttons = [{ id: '1', title: 'YES' }, { id: '2', title: 'NO' }];

class ToggleButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: (new Map(): Map<string, boolean>),
    };
  }

  _onPressItem = (id: string) => {
    console.log(typeof id);
    this.setState(() => {
      const selected = new Map();
      selected.set(id, !selected.get(id)); // toggle
      return { selected };
    });
    this.props.onPressButton(id === '1');
  }

  _renderItem = ({ item }) => (
    <SingleButton
      id={item.id}
      title={item.title}
      onPressItem={this._onPressItem}
      selected={!!this.state.selected.get(item.id)}
    />
  );

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={buttons}
          extraData={this.state}
          horizontal
          keyExtractor={item => item.id}
          removeClippedSubviews={false}
          renderItem={this._renderItem}
          showsHorizontalScrollIndicator={false}
          scrollEnabled={false}
          contentContainerStyle={{ flex: 1, justifyContent: 'space-around' }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 36,
    marginTop: 10,
    marginBottom: 10,
  },
});

export default ToggleButton;
