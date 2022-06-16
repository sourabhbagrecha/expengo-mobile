import React from 'react';
import {createRealmContext, useUser} from '@realm/react';
import {expenseSchema} from '../schema/expenseSchema';
import Loading from '../screens/Loading';

const {RealmProvider, useRealm, useQuery, useObject} = createRealmContext({
  schema: [expenseSchema],
});

const CustomRealmProvider = ({children}) => {
  const user = useUser();

  const handleSyncError = (_session, err) => {
    console.error(err.message);
  };

  return (
    <RealmProvider
      fallback={Loading}
      sync={{
        user,
        flexible: true,
        initialSubscriptions: {
          update: (subs, realm) => {
            subs.add(realm.objects('expense'));
          },
          rerunOnOpen: true,
        },
        error: handleSyncError,
      }}>
      {children}
    </RealmProvider>
  );
};

export {CustomRealmProvider, useRealm, useQuery, useObject};
