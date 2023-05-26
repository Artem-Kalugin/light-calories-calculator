import React from 'react';
import { useDispatch } from 'react-redux';

import Button from '#ui-kit/Button';
import Divider from '#ui-kit/Divider';
import Icon from '#ui-kit/Icon';
import { H3, H4, Regular16 } from '#ui-kit/Text';

import { AppActions } from '#store/slices/app';
import { ProductsActions } from '#store/slices/products';

import styles from './index.module.css';

const Nutrients = ({
  carbs,
  proteins,
  fat,
  kcal,
}: Pick<Product, 'carbs' | 'fat' | 'proteins' | 'kcal'>) => {
  return (
    <div className={styles.nutrients}>
      <Icon
        className={styles.icon}
        name="proteins"
      />
      <Regular16>{+proteins.toFixed(1)} г </Regular16>
      <Icon
        className={styles.icon}
        name="carbs"
      />
      <Regular16>{+carbs.toFixed(1)} г </Regular16>
      <Icon
        className={styles.icon}
        name="fats"
      />
      <Regular16>{+fat.toFixed(1)} г </Regular16>
      <Icon
        className={styles.icon}
        name="calories"
      />
      <Regular16>{+kcal.toFixed(1)} </Regular16>
    </div>
  );
};
const Meal: React.FC<
  React.PropsWithChildren<{
    className?: string;
    index: number;
    products: Product[];
    onClickAddProduct: () => void;
    onClickDeleteMeal: () => void;
    onClickDeleteProduct: (index: number, name: string) => void;
    fat: number;
    carbs: number;
    proteins: number;
    kcal: number;
  }>
> = ({
  products,
  index,
  onClickAddProduct,
  onClickDeleteProduct,
  onClickDeleteMeal,
  fat,
  carbs,
  proteins,
  kcal,
}) => {
  const dispatch = useDispatch();
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <H3>Прием пищи {index + 1}</H3>
        <Divider />
        <Nutrients
          carbs={carbs}
          fat={fat}
          kcal={kcal}
          proteins={proteins}
        />
      </div>
      <div className={styles.body}>
        {products.map(el => (
          <div className={styles.row}>
            <div
              className={styles.close}
              onClick={() => onClickDeleteProduct(index, el.id)}
            >
              <Icon
                name="close"
                size={12}
              />
            </div>
            <div
              className={styles.close}
              onClick={() => {
                dispatch(
                  ProductsActions.upsertOne({
                    ...el,
                    created_at: `${Date.now()}`,
                  }),
                );
              }}
            >
              <Icon
                name="save"
                size={12}
              />
            </div>
            <div
              className={styles.close}
              onClick={() => {
                dispatch(
                  AppActions.setActiveProduct({
                    ...el,
                  }),
                );
              }}
            >
              <Icon
                name="eye"
                size={12}
              />
            </div>
            <H4>{el.name}</H4>
            <Divider />
            <Nutrients
              carbs={el.carbs}
              fat={el.fat}
              kcal={el.kcal}
              proteins={el.proteins}
            />
          </div>
        ))}
      </div>
      <div className={styles.footer}>
        <Button
          iconName="plus"
          label="Добавить продукт"
          onPress={onClickAddProduct}
        />

        <Button
          iconName="close"
          label="Удалить прием пищи"
          onPress={onClickDeleteMeal}
        />
      </div>
    </div>
  );
};

export default Meal;
