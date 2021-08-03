import { EnumHelper, ValueOfEnumObj } from '../src';

const PAY_TYPE_ENUM_OBJ = {
  DEPOSIT: {
    value: '1',
    label: '保证金+尾款'
  },
  FULL: {
    value: 2,
    label: '全额支付'
  }
} as const;

const PAY_TYPE = new EnumHelper(PAY_TYPE_ENUM_OBJ);
type PAY_TYPE_VAL_TYPE = ValueOfEnumObj<typeof PAY_TYPE_ENUM_OBJ>;

test('test EnumHelper', () => {
  const labeValOptions = PAY_TYPE.labelValArrayList(); // [ { value: '1', label: '保证金+尾款' }, { value: 2, label: '全额支付' } ]
  expect(labeValOptions).toEqual([
    { value: '1', label: '保证金+尾款' },
    { value: 2, label: '全额支付' }
  ]);

  const valueFromServer = '1';
  const text1 = PAY_TYPE.getLabelByValue(valueFromServer); // "保证金+尾款" | "全额支付" | undefined
  expect(text1).toBe('保证金+尾款');

  // const text2 = PAY_TYPE.getLabelByValue(100); // error, rellay cool! coz 100 not in PAY_TYPE_TYPE
  // expect(text2).toBe(undefined);

  // just show type union error info
  function typeCondition(type: PAY_TYPE_VAL_TYPE) {
    if (type === 2) {
      // ok! cool
    }
    // if (type === 3) {
    // error, really cool!
    // }
    if (type === PAY_TYPE.enumObj.DEPOSIT.value) {
      // ok!
    }
    if (type === PAY_TYPE_ENUM_OBJ.DEPOSIT.value) {
      // ok!
    }
  }
});
