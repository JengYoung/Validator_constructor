import { 
  TYPE_NUMBER,   
  TYPE_STRING, 
  TYPE_OBJECT,
  TYPE_BOOLEAN,
  TYPE_ARRAY,
  TYPE_NULL,
  TYPE_UNDEFINED,
  TYPE_SUB_OBJECT,
  TYPE_SUB_ARRAY,
  ALERT_KEY_ERROR,
  ALERT_NEW_OPERATOR_ERROR,
  ALERT_NOT_EXIST_PROPERTY_ERROR,
} from './util/constants.js';

const displayError = (errorMsg) => {
  console.error(errorMsg);
  alert(errorMsg);
  return;
}

const alertTypeError = (dataType, expectedType) => {
  const errorMsg = `결과: false\n현재 데이터 타입: ${dataType}\n설정한 데이터 타입: ${expectedType}`
  displayError(errorMsg)
  return; 
}

export default function Validator (data) {
  if (!new.target) {
    displayError(ALERT_NEW_OPERATOR_ERROR);
    return new Validator(data);
  }

  this.data = data;
}

Validator.prototype.hasValidKeys = function (keys) {
  return (!this.isTypeObject())
    ? alertTypeError(this.checkType(this.data), TYPE_OBJECT)
    : isAllValid.bind(this)() && this;

  function isAllValid() {
    return keys.every(({ key, type: expectedType, isRequired = false }) => {
      if (typeof key !== TYPE_STRING) return displayError(ALERT_KEY_ERROR);
      expectedType = refineExpectedType(expectedType);

      return this.data.hasOwnProperty(key)
        ? isValidKeyType(this.checkType(this.data[key]), expectedType)
        : !isRequired || displayError(`${key} ${ALERT_NOT_EXIST_PROPERTY_ERROR}`);
    })
  }

  function refineExpectedType(expectedType) {
    if (expectedType === TYPE_SUB_ARRAY) expectedType = TYPE_ARRAY;
    if (expectedType === TYPE_SUB_OBJECT) expectedType = TYPE_OBJECT;
    return expectedType
  }
  
  function isValidKeyType(keyType, expectedType) {
    return (expectedType?.constructor.name === TYPE_ARRAY)
      ? expectedType.some(type => keyType === type) || alertTypeError(keyType, expectedType)
      : keyType === expectedType || alertTypeError(keyType, expectedType)
  }
}

Validator.prototype.isTypeObject = function () {
  const dataType = this.checkType(this.data);
  return dataType === TYPE_OBJECT ? this : alertTypeError(dataType, TYPE_OBJECT);
}

Validator.prototype.isTypeArray = function () {
  const dataType = this.checkType(this.data);
  return dataType === TYPE_ARRAY ? this : alertTypeError(dataType, TYPE_ARRAY);
}

Validator.prototype.isTypeString = function () {
  const dataType = this.checkType(this.data);
  return dataType === TYPE_STRING ? this : alertTypeError(dataType, TYPE_STRING);
}

Validator.prototype.isTypeNumber = function () {
  const dataType = this.checkType(this.data);
  return dataType === TYPE_NUMBER ? this : alertTypeError(dataType, TYPE_NUMBER);
}

Validator.prototype.isTypeBoolean = function () {
  const dataType = this.checkType(this.data);
  return dataType === TYPE_BOOLEAN ? this : alertTypeError(dataType, TYPE_BOOLEAN);
}

Validator.prototype.checkType = function (nowData) {
  if (nowData === undefined) return TYPE_UNDEFINED;
  if (nowData === null) return TYPE_NULL;
  if (nowData?.constructor.name === TYPE_OBJECT) return TYPE_OBJECT;
  if (nowData?.constructor.name === TYPE_ARRAY) return TYPE_ARRAY;
  return typeof nowData;
}

Validator.prototype.finish = function () {
  return true;
}