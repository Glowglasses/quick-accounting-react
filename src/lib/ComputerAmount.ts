import {Records} from '../hooks/useRecords';

const computerPayoutOrIncomeOrBalance = (records:[string, Records][],type: ('payout' | 'income' | 'balance')) => {
  let payout = 0;
  let income = 0;
  let balance = 0;
  records.forEach(item => {
    item[1].forEach(record => {
      switch (type) {
        case 'payout':
          payout += parseFloat(record.amount);
          break;
        case 'income':
          income += parseFloat(record.amount);
          break;
        case 'balance':
          balance += income - payout;
          break;
      }
    })
  })
  switch (type){
    case 'payout':
      return payout + '';
    case 'income':
     return income + '';
    case 'balance':
      return balance + '';
  }
}
export {computerPayoutOrIncomeOrBalance}