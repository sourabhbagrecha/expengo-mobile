import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

const Loading = () => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
    },
    horizontal: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 10,
    },
  });
  return (
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator size="large" color="#13aa52" />
    </View>
  );
};

export default Loading;
