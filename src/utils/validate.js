
// !数字
export const isNumber = (value) => {
  return /(^(-)?0(\.[0-9]+)?$)|(^(-)?[1-9][0-9]*(\.[0-9]+)?$)/.test(value);
};
// !0和正数  都满足
export const isPositiveNumber = (value) => {
  return /(^0(\.[0-9]+)?$)|(^[1-9][0-9]*(\.[0-9]+)?$)/.test(value);
};
// !正整数
export const isPositiveInt = (value) => {
  return /^[1-9][0-9]*$/.test(value);
};

// !校验是否正数/正数+n位正小数，传入n (没有校验0的)
export const isDecimalForN = (value, n = 2) => {
  if (isPositiveNumber(value)) {
    if (value.includes('.')) {
      let reg = /.+\./;
      let matchVal = value.replace(reg, '');
      if (matchVal.length > n) {
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  } else {
    return false;
  }
};

const PhoneReg = new RegExp('^[1][3,4,5,6,7,8,9][0-9]{9}$');
export function isPhone(phone) {
  if (!PhoneReg.test(phone)) {
    return false;
  } else {
    return true;
  }
}
