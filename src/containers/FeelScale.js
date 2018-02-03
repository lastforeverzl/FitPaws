import React from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Icon } from 'react-native-elements';
import * as Actions from '../redux/actions';


const choose = '#34495E';
const unChoose = '#DDDDDD';
const initialColor = {
  deadColor: unChoose,
  sadColor: unChoose,
  neutralColor: unChoose,
  happyColor: unChoose,
  excitedColor: unChoose,
};

class FeelScale extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialColor;
  }
  chooseFeel = (number) => {
    const { actions } = this.props;
    this.setState(initialColor);
    switch (number) {
      case 1:
        this.setState({ deadColor: choose });
        actions.updateFeelScale(1);
        break;
      case 2:
        this.setState({ sadColor: choose });
        actions.updateFeelScale(2);
        break;
      case 3:
        this.setState({ neutralColor: choose });
        actions.updateFeelScale(3);
        break;
      case 4:
        this.setState({ happyColor: choose });
        actions.updateFeelScale(4);
        break;
      case 5:
        this.setState({ excitedColor: choose });
        actions.updateFeelScale(5);
        break;
      default:
        break;
    }
  };

  render() {
    console.log(this.props.feelScale);
    return (
      <View style={styles.container}>
        <Icon
          name="emoticon-dead"
          type="material-community"
          size={40}
          color={this.state.deadColor}
          onPress={() => this.chooseFeel(1)}
        />
        <Icon
          name="emoticon-sad"
          type="material-community"
          size={40}
          color={this.state.sadColor}
          onPress={() => this.chooseFeel(2)}
        />
        <Icon
          name="emoticon-neutral"
          type="material-community"
          size={40}
          color={this.state.neutralColor}
          onPress={() => this.chooseFeel(3)}
        />
        <Icon
          name="emoticon-happy"
          type="material-community"
          size={40}
          color={this.state.happyColor}
          onPress={() => this.chooseFeel(4)}
        />
        <Icon
          name="emoticon-excited"
          type="material-community"
          size={40}
          color={this.state.excitedColor}
          onPress={() => this.chooseFeel(5)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
});

function mapStateToProps(state) {
  return {
    feelScale: state.record.feelScale,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FeelScale);
