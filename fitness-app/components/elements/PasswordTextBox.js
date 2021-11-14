import React from 'react';
import {TextInput, View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

// TODO: better UI for login and password input
/** 
 * TextInput component that can hide and show password input.
 */
export default function Password({onChange, icon, label, height}) {
  const [value, onChangeText] = React.useState(onChange.value);
  const [visible, setVisibility] = React.useState(false);
  const [errorStatus, displayErrors] = React.useState(false);

  const _icon = !visible ? 'eye-slash' : 'eye';
  const _height = (height);

  return (
      <View style={styles.container}>
        <TextInput
          style={{
            height: _height,
            flex: 1,
            alignSelf: 'stretch',
            paddingHorizontal: (10),
          }}
          onChangeText={text => {
            onChangeText(text);
            onChange(text);
          }}
          onBlur={() => {
            displayErrors(true);
          }}
          value={value}
          placeholder={label}
          secureTextEntry={!visible}
        />
        <Icon
          name={_icon}
          color={'#9e9e9e'}
          onPress={() => setVisibility(!visible)}
          style={[styles.icons, {height: _height, width: _height}]}
        />
      </View>

  );
};

Password.defaultProps = {
  label: '',
  height: (20),
};
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    borderColor: '#e3e3e3',
    borderWidth: 1,
    borderRadius: 4,
  },
  icons: {
    backgroundColor: '#e3e3e3',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});