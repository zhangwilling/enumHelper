export interface IEnumObj {
  [key: string]: ILabelValue;
}

export interface ILabelValue {
  label: string;
  value: string | number;
}

export type ValueOfEnumObj<T extends IEnumObj> = T[keyof T]['value'];

export type LabelOfEnumObj<T extends IEnumObj> = T[keyof T]['label'];

export class EnumHelper<LV extends IEnumObj> {
  public enumObj!: LV;
  private labelValArrCache!: {
    label: LabelOfEnumObj<LV>;
    value: ValueOfEnumObj<LV>;
  }[];
  private valLabelObjCache!: {
    [key: string]: LabelOfEnumObj<LV>;
  };
  constructor(enumObj: LV) {
    this.enumObj = enumObj;
  }
  labelValArrayList() {
    if (!this.labelValArrCache) {
      this.labelValArrCache = Object.keys(this.enumObj).map(key => {
        return this.enumObj[key] as {
          label: LabelOfEnumObj<LV>;
          value: ValueOfEnumObj<LV>;
        };
      });
    }
    return this.labelValArrCache;
  }

  getLabelByValue(val: ValueOfEnumObj<LV>) {
    if (!this.valLabelObjCache) {
      this.valLabelObjCache = Object.keys(this.enumObj).reduce(
        (acc, key) => {
          const labelValObj = this.enumObj[key];
          acc[labelValObj.value] = labelValObj.label;
          return acc;
        },
        {} as {
          [key: string]: LabelOfEnumObj<LV>;
        }
      );
    }
    return this.valLabelObjCache[val] as LabelOfEnumObj<LV> | undefined;
  }
}
