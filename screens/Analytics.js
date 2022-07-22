import React, {useCallback, useMemo} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useQuery} from '../contexts/RealmContext';
import {aggregate} from 'realm-aggregate';

const Analytics = () => {
  // const realm = useRealm();
  const expenses = useQuery('expense');

  const groupExpensesOnBasisOfModes = useCallback(() => {
    return aggregate(
      [
        {$group: {_id: '$mode', totalAmount: {$sum: '$amount'}}},
        {$project: {mode: '$_id', totalAmount: '$totalAmount'}},
      ],
      expenses,
    );
  }, [expenses]);

  const modeAnalytics = useMemo(() => {
    return groupExpensesOnBasisOfModes();
    // modesData=
    // [
    //   {mode: 'Cash', totalAmount: 320},
    //   {mode: 'Credit Card', totalAmount: 1280},
    //   {mode: 'Axis Savings A/c', totalAmount: 900},
    //   {mode: 'UPI', totalAmount: 1390},
    //   {mode: 'Demo', totalAmount: 2},
    //   {mode: 'Axis CC', totalAmount: 1200},
    //   {mode: 'Cheque', totalAmount: 3000},
    // ];
  }, [groupExpensesOnBasisOfModes]);

  const ModeData = ({mode, totalAmount}) => {
    return (
      <View style={styles.modeData}>
        <Text>
          {mode}: {totalAmount}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, styles.horizontal]}>
      <View>
        <Text style={styles.screenTitle}>Analytics</Text>
      </View>
      <FlatList
        data={modeAnalytics}
        renderItem={({item: {mode, totalAmount}}) => {
          return <ModeData mode={mode} totalAmount={totalAmount} key={mode} />;
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screenTitle: {
    fontSize: 40,
    padding: 10,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    justifyContent: 'space-around',
    padding: 10,
  },
  modeData: {
    padding: 10,
  },
});

export default Analytics;
