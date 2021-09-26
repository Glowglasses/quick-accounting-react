function formatDecimal(value: number) {
  const pointIndex = String(value).indexOf('.');
  if (pointIndex >= 0) {
    if (String(value).slice(pointIndex).length > 2) {
      return value.toFixed(2);
    }
  }
  return value;
}

function computer(accountValue: string, inputValue: string) {
  let first = 0;
  let second = 0;
  let frontPartArray;
  let backPartArray;
  let computerType;
  let firstIsNegative = false;
  let outputValue = '';
  if (accountValue[0] === '-') {
    frontPartArray = accountValue.slice(1).match(/(\S*)[+\-×÷]/);
    backPartArray = accountValue.slice(1).match(/[+\-×÷](\S*)/);
    firstIsNegative = true;
  } else {
    frontPartArray = accountValue.match(/(\S*)[+\-×÷]/);
    backPartArray = accountValue.match(/[+\-×÷](\S*)/);
  }
  if (frontPartArray) {
    firstIsNegative ? first = parseFloat('-' + frontPartArray[1]) : first = parseFloat(frontPartArray[1]);
  }
  if (backPartArray) {
    second = parseFloat(backPartArray[1]);
    computerType = backPartArray[0][0];
  }
  switch (computerType || '') {
    case '+':
      outputValue = first + second + inputValue;
      break;
    case '-':
      outputValue = first - second + inputValue;
      break;
    case '×':
      const value = formatDecimal(first * second);
      outputValue = value + inputValue;
      break;
    case '÷':
      if (second === 0) {
        outputValue = 0 + inputValue;
      } else {
        let value = formatDecimal(first / second);
        outputValue = value + inputValue;
      }
      break;
  }
  return outputValue;
}

const updateAccount = ({ isComputer, dom, accountValue }: { isComputer?: boolean, dom?: HTMLButtonElement, accountValue: string }) => {
  let outputValue = accountValue;
  let inputValue = ''
  if (dom) inputValue = dom.textContent || '';
  if (isComputer) {
    return computer(accountValue, '');
  }
  switch (inputValue) {
    case '清空':
      outputValue = '0';
      break;
    case '清除':
      if (accountValue.length > 1) {
        outputValue = accountValue.slice(0, -1);
      } else {
        outputValue = '0';
      }
      break;
    default:
      if (accountValue.length >= 11) return accountValue;
      break;
  }
  if (accountValue === '0') {
    if ('0123456789'.indexOf(inputValue) >= 0) {
      outputValue = inputValue;
    } else if ('+-×÷'.indexOf(inputValue) >= 0) {
      outputValue += inputValue;
    }
  } else {
    if ('0123456789'.indexOf(inputValue) >= 0) {
      outputValue += inputValue;
    } else if ('+-×÷'.indexOf(inputValue) >= 0) {
      if (accountValue.indexOf('+') >= 0 || accountValue.slice(1).indexOf('-') >= 0 || accountValue.indexOf('×') >= 0 || accountValue.indexOf('÷') >= 0) {
        if ('+-×÷'.indexOf(accountValue.substring(accountValue.length - 1)) === -1) {
          outputValue = computer(accountValue, inputValue) || '0';
        }
      } else {
        outputValue += inputValue;
      }
    }
  }
  if (inputValue === '.') {
    if (accountValue.indexOf('.') === -1) outputValue = accountValue + '.';
  }
  return outputValue;
};

export {updateAccount};