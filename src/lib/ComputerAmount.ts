import {Records} from '../hooks/useRecords';

const computerPayoutOrIncomeOrBalance = (records: [string, Records][], type: ('payout' | 'income' | 'balance')) => {
  let payout = 0;
  let income = 0;
  let balance = 0;
  records.forEach(item => {
    item[1].forEach(record => {
      if (record.category === '-') {
        payout += parseFloat(record.amount);
      } else if (record.category === '+') {
        income += parseFloat(record.amount);
      }
    });
  });
  balance = income - payout;
  switch (type) {
    case 'payout':
      return payout + '';
    case 'income':
      return income + '';
    case 'balance':
      return balance + '';
  }
};
export {computerPayoutOrIncomeOrBalance};