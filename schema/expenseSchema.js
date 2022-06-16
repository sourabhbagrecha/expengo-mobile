export const expenseSchema = {
  name: 'expense',
  properties: {
    _id: 'objectId?',
    amount: 'int?',
    author: 'objectId?',
    category: 'string?',
    createdAt: 'date?',
    mode: 'string?',
    title: 'string?',
  },
  primaryKey: '_id',
};
