# Validator

생성자 함수로서, 메서드 체이닝을 통해 간편하게 타입을 체크할 수 있어요!

## HOW TO USE

```js
const isTestSampleValidate = (state) => {
  const validator = new Validator(state);
  return validator
    .isTypeObject()
    .hasValidKeys([
      { key: 'imageUrl', type: [ 'string', 'null' ], isRequired: true },
      { key: 'imageName', type: 'string', isRequired: true }
    ])
    .finish();
}

const state = { imageUrl: null, imageName: 'sample.jpg' }
console.log(isTestSampleValidate) // true

// easy to use
// console: { imageUrl: null, imageName: 'sample.jpg' }
console.log(isTestSampleValidate && state)
```