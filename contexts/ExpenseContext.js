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
    try {
      realmRef.current.write(() => {
        realmRef.current.create('expense', {
          ...expense,
          _id: new ObjectId(),
          author: ObjectId(user.id),
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ExpenseContext.Provider value={{expenses, insertExpense}}>
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
