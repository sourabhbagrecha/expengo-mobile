import React, {useContext} from 'react';
import {ObjectId} from 'bson';
import {createContext, useEffect, useState} from 'react';
import Realm from 'realm';
import {expenseSchema} from '../schema';
import {useAuth} from './AuthContext';

const ExpenseContext = createContext();

const ExpenseProvider = ({children}) => {
  const [expenses, setExpenses] = useState([]);
  const {user, realmRef} = useAuth();

  useEffect(() => {
    if (!user) {
      return;
    }

    const OpenRealmBehaviorConfiguration = {
      type: 'openImmediately',
    };

    const config = {
      sync: {
        user,
        partitionValue: ObjectId(user.id),
        newRealmFileBehavior: OpenRealmBehaviorConfiguration,
        existingRealmFileBehavior: OpenRealmBehaviorConfiguration,
      },
      schema: [expenseSchema],
    };

    Realm.open(config)
      .then(userRealm => {
        realmRef.current = userRealm;
        const loadedExpenses = userRealm.objects('expense');
        console.log(
          {loadedExpenses},
          loadedExpenses[loadedExpenses.length - 1],
        );
        setExpenses(loadedExpenses);
      })
      .catch(err => {
        console.log(err);
      });

    return () => {
      const userRealm = realmRef.current;
      if (userRealm) {
        userRealm.syncSession
          .uploadAllLocalChanges()
          .then(r => {
            console.log({r});
            setExpenses([]);
            realmRef.current.close();
            realmRef.current = null;
          })
          .catch(err => {
            console.log(err);
          });
      }
    };
  }, [user, realmRef]);

  const insertExpense = async expense => {
    const realm = realmRef.current;
    try {
      realm.write(() => {
        realm.create('expense', {
          ...expense,
          _id: new ObjectId(),
          author: ObjectId(user.id),
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getExpenseById = async _id => {
    const realm = realmRef.current;
    try {
      return realm.objects('expense').filtered('_id == $0', ObjectId(_id))[0];
    } catch (error) {
      console.log(error);
    }
  };

  const updateExpense = async (_id, updatedExpense) => {
    const realm = realmRef.current;
    try {
      realm.write(() => {
        let oldExpense = realm
          .objects('expense')
          .filtered('_id == $0', ObjectId(_id))[0];
        oldExpense = updatedExpense;
        oldExpense.title = updatedExpense.title;
        oldExpense.amount = updatedExpense.amount;
        oldExpense.category = updatedExpense.category;
        oldExpense.mode = updatedExpense.mode;
        oldExpense.createdAt = updatedExpense.createdAt;
        console.log('wbn', {oldExpense});
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteExpense = () => {
    const realm = realmRef.current;
  };

  return (
    <ExpenseContext.Provider
      value={{expenses, insertExpense, getExpenseById, updateExpense}}>
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
