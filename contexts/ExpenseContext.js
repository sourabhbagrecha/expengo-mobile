import React, {useContext} from 'react';
import {ObjectId} from 'bson';
import {createContext} from 'react';
import {useRealm} from './RealmContext';
import {useUser} from '@realm/react';

const ExpenseContext = createContext();

const ExpenseProvider = ({children}) => {
  const user = useUser();

  const realm = useRealm();

  const insertExpense = async expense => {
    try {
      realm.write(() => {
        realm.create('expense', {
          ...expense,
          _id: new ObjectId(),
          author: ObjectId(user.id),
        });
      });
    } catch (error) {
      console.error(error);
    }
  };

  const getExpenseById = async _id => {
    try {
      return realm.objects('expense').filtered('_id == $0', ObjectId(_id))[0];
    } catch (error) {
      console.error(error);
    }
  };

  const updateExpenseById = async (_id, updatedExpense) => {
    try {
      realm.write(() => {
        let oldExpense = realm
          .objects('expense')
          .filtered('_id == $0', ObjectId(_id))[0];
        oldExpense.title = updatedExpense.title;
        oldExpense.amount = updatedExpense.amount;
        oldExpense.category = updatedExpense.category;
        oldExpense.mode = updatedExpense.mode;
        oldExpense.createdAt = updatedExpense.createdAt;
      });
    } catch (error) {
      console.error(error);
    }
  };

  const deleteExpenseById = _id => {
    realm.write(() => {
      let expense = realm.objectForPrimaryKey('expense', ObjectId(_id));
      realm.delete(expense);
    });
  };

  const getExpenses = () => {
    return realm.objects('expense');
  };

  return (
    <ExpenseContext.Provider
      value={{
        getExpenses,
        insertExpense,
        getExpenseById,
        updateExpenseById,
        deleteExpenseById,
      }}>
      {children}
    </ExpenseContext.Provider>
  );
};

const useExpenses = () => {
  const expenseCtx = useContext(ExpenseContext);
  if (!expenseCtx) {
    throw new Error('useExpenses must be used within the ExpenseProvider.');
  }
  return expenseCtx;
};

export {useExpenses, ExpenseProvider};
