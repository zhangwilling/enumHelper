## EnumHelper

解决常见的 enum 类型数据的变换形态，这里的 enum 指的是广义的 enum 数据，而不是某个语言的 enum 类型。

TS enum 存在许多问题，比如：无法确定数字值，比如不支持复杂对象。通常我们会写两个枚举，一个是对应的值，即 Record<string, number | string>，一个是对应的文本，即 Record<string, string>。

第一, 在 Select 组件的场景里还需要将 2 者合并转成 options 的数组写法。第二，在根据值获取文本时又需要构造一个 KV 结构的对象便于展示时获取。总之，非常繁琐。

### Usage

`npm i enumhelper`

### Demo

```ts
import { EnumHelper, ValueOfEnumObj } from 'enumhelper';

// 定义枚举数据的原始数据
const PAY_TYPE_ENUM_OBJ = {
  DEPOSIT: {
    value: '1',
    label: '保证金+尾款'
  },
  FULL: {
    value: 2,
    label: '全额支付'
  }
} as const; // 非常关键

// enumHelper 的实例
const PAY_TYPE = new EnumHelper(PAY_TYPE_ENUM_OBJ);
//利用 ValueOfEnumObj 构建出 enum值 type
type PAY_TYPE_VAL_TYPE = ValueOfEnumObj<typeof PAY_TYPE_ENUM_OBJ>;

// 获取 options 数组
const labeValOptions = PAY_TYPE.labelValArrayList();
console.log('labeValOptions', labeValOptions);

// 根据值，获取对应文本
const valueFromServer = '1';
const text1 = PAY_TYPE.getLabelByValue(valueFromServer);
console.log('text1', text1); //输出 "保证金+尾款"
const text2 = PAY_TYPE.getLabelByValue(100); // 这里会报 ts 编译时错误
console.log('text1', text2); // undefined

// PAY_TYPE_TYPE 约束参数
function typeCondition(type: PAY_TYPE_VAL_TYPE) {
  if (type === 2) {
  }
  if (type === 3) {
  } // 这里会报 ts 编译时错误， 3 不在 PAY_TYPE_TYPE 中

  // 第一种方式获取值方式
  if (type === PAY_TYPE.enumObj.DEPOSIT.value) {
  }
  // 第二种方式获取值比较
  if (type === PAY_TYPE_ENUM_OBJ.DEPOSIT.value) {
  }
}
```

## API

### 构造函数 EnumHelper

| 属性    | 说明                                  | 类型       | 默认值 |
| ------- | ------------------------------------- | ---------- | ------ |
| enumObj | 第一个传入参数，enum 的 labelVal 对象 | `IEnumObj` | -      |

### IEnumObj 和 ILabelValue

```ts
interface IEnumObj {
  [key: string]: ILabelValue;
}

interface ILabelValue {
  label: string;
  value: string | number;
}
```

### EnumHelper 实例

| 属性              | 说明                                                           | 类型             | 默认值 |
| ----------------- | -------------------------------------------------------------- | ---------------- | ------ |
| enumObj           | 原始传入的 `enumObj`                                           | `IEnumObj`       | -      |
| labelValArrayList | 转换为 labelValue 的数组形式,符合 `antd` 的 `options` 格式要求 | 无法写，请看代码 | -      |
| getLabelByValue   | 根据枚举值返回对应文本                                         | 无法写，请看代码 | -      |

### ValueOfEnumObj 类型

`type PAY_TYPE_VAL_TYPE = ValueOfEnumObj<typeof PAY_TYPE_ENUM_OBJ>`， 可以获取对象中`值`的联合类型。

### LabelOfEnumObj 类型

`type PAY_TYPE_LABEL_TYPE = ValueOfEnumObj<typeof PAY_TYPE_ENUM_OBJ>` , 可以获取对象中`文本`的联合类型。
