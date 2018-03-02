import React from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import { connect } from 'react-redux';
import HistoryHeader from '../components/HistoryHeader';
import HistoryItem from '../components/HistoryItem';

const initialTotal = {
  totalWalk: 0,
  totalMinutes: 0,
  totalMile: 0,
};
const initialAvg = {
  avgWalk: 1,
  avgMinutes: 0,
  avgMile: 0,
};

class DayTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      selectedIndex: 0,
      total: initialTotal,
      avg: initialAvg,
      data: [],
    };
  }

  componentDidMount() {
    this._calculate(this.props.historyData, this.state.date);
  }

  componentWillReceiveProps(nextProps) {
    this._calculate(nextProps.historyData, this.state.date);
  }

  _calculate = (historyData, date) => {
    const dayData = historyData.filter(item =>
      item.creationDate.toLocaleDateString() === date.toLocaleDateString());
    this.setState({ data: dayData });
    if (dayData.length > 0) {
      const sum = (acc, cur) => acc + cur;
      const totalWalk = dayData.length;
      const totalMinutes = dayData.map(item => item.time).reduce(sum);
      const totalDistance = dayData.map(item => item.distance).reduce(sum);
      const avgMinutes = Math.round(totalMinutes / totalWalk);
      const avgDistance = totalDistance / totalWalk;
      const total = {
        totalWalk,
        totalMinutes,
        totalMile: parseFloat(totalDistance).toFixed(1),
      };
      const avg = {
        avgWalk: 1,
        avgMinutes,
        avgMile: parseFloat(avgDistance).toFixed(1),
      };
      this.setState({ total });
      this.setState({ avg });
    } else {
      this.setState({ total: initialTotal });
      this.setState({ avg: initialAvg });
    }
  }

  _clickLeft = () => {
    const newDate = new Date(this.state.date);
    newDate.setDate(newDate.getDate() - 1);
    this.setState({ date: newDate });
    this._calculate(this.props.historyData, newDate);
  }

  _clickRight = () => {
    const newDate = new Date(this.state.date);
    newDate.setDate(newDate.getDate() + 1);
    this.setState({ date: newDate });
    this._calculate(this.props.historyData, newDate);
  }

  _pressItem = (item) => {
    this.props.screenProps.navigation.navigate('RecordDetail', {
      itemId: item.id,
      itemTime: item.time,
      itemDistance: item.distance,
      itemPoop: item.poop,
      itemPee: item.pee,
      itemRouteCoordinates: item.routeCoordinates,
      itemPoopShape: item.poopShape,
      itemPoopColor: item.poopColor,
      itemFeelScale: item.feelScale,
      itemCreationDate: item.creationDate,
    });
  }

  _renderItem = ({ item }) => (
    <View style={styles.item}>
      <HistoryItem
        item={item}
        onPressItem={() => this._pressItem(item)}
      />
    </View>
  )

  _renderHeader = () => {
    const { date } = this.state;
    return (
      <View style={styles.header}>
        <HistoryHeader
          date={date.toLocaleDateString()}
          leftArrow={this._clickLeft}
          rightArrow={this._clickRight}
          updateIndex={this._updateIndex}
          selectedIndex={this.state.selectedIndex}
          avgData={this.state.avg}
          totalData={this.state.total}
        />
      </View>
    );
  }

  _renderSeparator = () => (
    <View
      style={{
        height: 1,
        backgroundColor: '#E7E7EC',
        marginLeft: 13,
        marginRight: 13,
      }}
    />
  );

  _updateIndex = (selectedIndex) => {
    this.setState({ selectedIndex });
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.data}
          extraData={this.state}
          keyExtractor={item => item.id}
          renderItem={this._renderItem}
          ListHeaderComponent={this._renderHeader}
          ItemSeparatorComponent={this._renderSeparator}
          bounces={false}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#2C3E50',
    paddingVertical: 14,
  },
  item: {
    padding: 8,
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
  },
});

function mapStateToProps(state) {
  return {
    historyData: state.history.historyData,
  };
}

export default connect(mapStateToProps)(DayTab);
