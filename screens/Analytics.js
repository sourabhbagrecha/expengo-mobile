import React, {useCallback, useMemo} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useQuery} from '../contexts/RealmContext';
import {aggregate} from 'realm-aggregate';

const Analytics = () => {
  // const realm = useRealm();
  const expenses = useQuery('expense');

  const groupExpensesOnBasisOfModes = useCallback(() => {
    const pipeline = [
      {$group: {_id: '$mode', totalAmount: {$sum: '$amount'}}},
      {$project: {mode: '$_id', totalAmount: '$totalAmount'}},
      {$sort: {totalAmount: -1}},
    ];
    return aggregate(pipeline, expenses);
  }, [expenses]);

  const modeAnalytics = useMemo(() => {
    return groupExpensesOnBasisOfModes();
    // modesData=
    // [
    //   {mode: 'Cheque', totalAmount: 3000},
    //   {mode: 'UPI', totalAmount: 1390},
    //   {mode: 'Credit Card', totalAmount: 1280},
    //   {mode: 'Axis CC', totalAmount: 1200},
    //   {mode: 'Axis Savings A/c', totalAmount: 900},
    //   {mode: 'Cash', totalAmount: 320},
    //   {mode: 'Demo', totalAmount: 2},
    // ];
  }, [groupExpensesOnBasisOfModes]);

  const ModeData = ({mode, totalAmount}) => {
    return (
      <View style={styles.modeDataRow}>
        <Text style={[styles.modeDataLeft]}>{mode}: </Text>
        <Text style={[styles.modeDataRight]}>₹{totalAmount}/-</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, styles.horizontal]}>
      <View>
        <Text style={styles.screenTitle}>Mode Analytics</Text>
      </View>
      <View>
        <Text style={styles.modeDataTitle}>Mode Type: Total Amount</Text>
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
    fontSize: 45,
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
  modeDataRow: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modeDataLeft: {
    fontSize: 20,
    paddingVertical: 5,
  },
  modeDataRight: {
    fontSize: 20,
    paddingVertical: 5,
  },
  modeDataTitle: {
    paddingTop: 10,
    paddingHorizontal: 20,
    fontWeight: '700',
    fontSize: 25,
  },
});

export default Analytics;
