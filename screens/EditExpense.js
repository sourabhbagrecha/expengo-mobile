import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native';
import {useExpenses} from '../contexts/ExpenseContext';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import {useNavigation, useRoute} from '@react-navigation/native';

const EditExpense = () => {
  const {
    params: {_id},
  } = useRoute();
  const nav = useNavigation();
  const {getExpenseById, updateExpense} = useExpenses();

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [mode, setMode] = useState('');
  const [createdAt, setCreatedAt] = useState(new Date());

  const onDateChange = (_, x) => {
    setCreatedAt(x);
  };

  const loadCurrentStateOfExpense = async () => {
    try {
      const currentStateOfExpense = await getExpenseById(_id);
      setTitle(currentStateOfExpense.title);
      setAmount(currentStateOfExpense.amount.toString());
      setCategory(currentStateOfExpense.category);
      setMode(currentStateOfExpense.mode);
      setCreatedAt(currentStateOfExpense.createdAt);
    } catch (error) {
      console.log(error);
    }
  };

  const onExpenseSubmit = async () => {
    try {
      await updateExpense(_id, {
        _id,
        title,
        amount: Number(amount),
        category,
        mode,
        createdAt: new Date(createdAt),
      });
      nav.navigate('Home');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadCurrentStateOfExpense();
  }, []);

  return (
    <View style={styles.screen}>
      <TextInput
        placeholder="Title"
        style={styles.input}
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        placeholder="Amount"
        style={styles.input}
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Category"
        style={styles.input}
        value={category}
        onChangeText={setCategory}
      />
      <TextInput
        placeholder="Mode"
        style={styles.input}
        value={mode}
        onChangeText={setMode}
      />
      <RNDateTimePicker
        value={createdAt}
        onChange={onDateChange}
        display="spinner"
      />
      <TouchableOpacity style={styles.button} onPress={onExpenseSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    padding: 10,
  },
  button: {backgroundColor: '#77f', padding: 10, borderRadius: 7},
  buttonText: {fontWeight: 'bold', color: '#fff', textAlign: 'center'},
  input: {
    height: 50,
    margin: 10,
    borderColor: '#000',
    borderWidth: 0.5,
    borderStyle: 'solid',
    paddingHorizontal: 10,
    borderRadius: 7,
    fontSize: 20,
  },
});

export default EditExpense;
