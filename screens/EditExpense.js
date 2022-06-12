import React, {useState} from 'react';
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
import {useObject} from '../contexts/RealmContext';
import {ObjectId} from 'bson';

const EditExpense = () => {
  const {
    params: {_id},
  } = useRoute();
  const nav = useNavigation();
  const {updateExpenseById} = useExpenses();

  const currentStateOfExpense = useObject('expense', ObjectId(_id));

  const [title, setTitle] = useState(currentStateOfExpense.title);
  const [amount, setAmount] = useState(currentStateOfExpense.amount.toString());
  const [category, setCategory] = useState(currentStateOfExpense.category);
  const [mode, setMode] = useState(currentStateOfExpense.mode);
  const [createdAt, setCreatedAt] = useState(currentStateOfExpense.createdAt);

  const onDateChange = (_, x) => {
    setCreatedAt(x);
  };

  const onExpenseSubmit = async () => {
    try {
      await updateExpenseById(_id, {
        _id,
        title,
        amount: Number(amount),
        category,
        mode,
        createdAt: new Date(createdAt),
      });
      nav.navigate('Home');
    } catch (error) {
      console.error(error);
    }
  };

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
