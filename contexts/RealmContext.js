import React from 'react';
import {createRealmContext} from '@realm/react';
import {ObjectId} from 'bson';
import {expenseSchema} from '../schema';
import {useAuth} from './AuthContext';

const {RealmProvider, useRealm, useQuery, useObject} = createRealmContext({
  schema: [expenseSchema],
});

const CustomRealmProvider = ({children}) => {
  const {user} = useAuth();

  const OpenRealmBehaviorConfiguration = {
    type: 'openImmediately',
  };

  return (
    <RealmProvider
      sync={{
        user,
        partitionValue: ObjectId(user.id),
        newRealmFileBehavior: OpenRealmBehaviorConfiguration,
        existingRealmFileBehavior: OpenRealmBehaviorConfiguration,
      }}>
      {children}
    </RealmProvider>
  );
};

export {CustomRealmProvider, useRealm, useQuery, useObject};
