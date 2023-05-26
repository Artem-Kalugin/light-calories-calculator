declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}

declare type SetState<T> = React.Dispatch<React.SetStateAction<T>>;
declare type SetStateArg<T> = React.SetStateAction<T>;

declare type getSetStateProps<T> = Required<{
  [K in keyof T as K extends string ? `set${Capitalize<K>}` : never]: SetState<
    T[K]
  >;
}>;

declare type Product = {
  id: string;
  name: string;
  fat: number;
  proteins: number;
  per_100?: {
    fat: number;
    proteins: number;
    carbs: number;
  };
  carbs: number;
  kcal: number;
  waterLoss: string;
};

declare type Meal = {
  fat: number;
  proteins: number;
  kcal: number;
  carbs: number;
  products: Product[];
};
