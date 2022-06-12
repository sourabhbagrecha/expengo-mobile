import React from 'react';
import {createRealmContext, useUser} from '@realm/react';
import {ObjectId} from 'bson';
import {expenseSchema} from '../schema';

const {RealmProvider, useRealm, useQuery, useObject} = createRealmContext({
  schema: [expenseSchema],
});

const CustomRealmProvider = ({children}) => {
  const user = useUser();

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
