import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {formatDistanceToNow} from 'date-fns';
import {FlatList, StyleSheet, View, Text, Pressable, Alert} from 'react-native';
import {useQuery} from '../contexts/RealmContext';
import {useExpenses} from '../contexts/ExpenseContext';

const ExpenseCard = ({exp}) => {
  const nav = useNavigation();
  const {deleteExpenseById} = useExpenses();
  const navigateToEditExpense = () => {
    nav.navigate('Edit', {_id: exp._id.toString()});
  };
  const deleteConfirmed = () => deleteExpenseById(exp._id);
  const onDelete = () => {
    Alert.alert(
      `Delete ${exp.title}?`,
      'Are you sure you want to delete this expense?',
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Delete', onPress: deleteConfirmed, style: 'destructive'},
      ],
    );
  };

  return (
    <View style={styles.card}>
      <View style={styles.cardRow}>
        <View>
          <Text style={styles.cardTitle}>{exp.title}</Text>
          <Text style={styles.cardCategory}>{exp.category}</Text>
        </View>
        <View>
          <Text style={styles.cardMode}>{exp.mode}</Text>
          <Text style={styles.cardAmount}>₹{exp.amount}/-</Text>
        </View>
      </View>
      <View style={styles.cardRow}>
        <View style={styles.cardButtonRow}>
          <Text>{formatDistanceToNow(new Date(exp.createdAt))}</Text>
        </View>
        <View style={styles.cardButtonRow}>
          <Pressable style={styles.editButton} onPress={navigateToEditExpense}>
            <Text style={styles.editText}>Edit</Text>
          </Pressable>
          <Pressable onPress={onDelete}>
            <Text style={styles.deleteText}>Delete</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default function Home() {
  const expenses = useQuery('expense');
  const nav = useNavigation();
  const navigateToNew = () => {
    nav.navigate('New');
  };

  return (
    <View style={styles.screen}>
      <View style={styles.screenTitleRow}>
        <Text style={styles.screenTitle}>All Expenses</Text>
        <Pressable style={styles.addButton} onPress={navigateToNew}>
          <Text style={styles.addButtonText}>+ ADD</Text>
        </Pressable>
      </View>
      <FlatList
        data={expenses}
        renderItem={({item}) => <ExpenseCard exp={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {marginBottom: 100},
  screenTitleRow: {flexDirection: 'row', alignItems: 'center'},
  screenTitle: {
    fontSize: 40,
    padding: 20,
    fontWeight: 'bold',
  },
  addButton: ({pressed}) => ({
    backgroundColor: '#77f',
    padding: 10,
    borderRadius: 7,
    opacity: pressed ? 0.5 : 1,
  }),
  addButtonText: {fontWeight: 'bold'},
  card: {
    margin: 10,
    padding: 10,
    elevation: 20,
    backgroundColor: '#fff',
  },
  cardRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardButtonRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  editButton: {
    marginHorizontal: 15,
  },
  editText: {
    color: 'blue',
  },
  deleteText: {
    color: 'red',
  },
  cardTitle: {fontWeight: '500', fontSize: 25},
  cardCategory: {fontWeight: '400', fontSize: 15},
  cardMode: {
    fontWeight: '400',
    fontSize: 15,
    textAlign: 'right',
  },
  cardAmount: {
    fontWeight: '600',
    fontSize: 20,
    textAlign: 'right',
  },
});
