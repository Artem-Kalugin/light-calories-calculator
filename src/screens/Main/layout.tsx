import React from 'react';

import Button from '#ui-kit/Button';
import Input from '#ui-kit/Input';
import { H2, H3, Text } from '#ui-kit/Text';

import carbs from '#assets/icons/carbs.png';
import fats from '#assets/icons/fats.png';
import proteins from '#assets/icons/proteins.png';

import Container from '#components/Container';
import ScreenLayout from '#components/ScreenLayout';

import { ViewProps } from '.';
import Meal from './component/Meal';
import styles from './index.module.css';

const Layout: React.FC<ViewProps> = props => {
  return (
    <ScreenLayout className={styles.layout}>
      <Container className={styles.mainContainer}>
        <H2 className={styles.title}>Потребление сегодня</H2>
        <div className={styles.summary}>
          <Text>
            Общие:{' '}
            <H3>
              {+props.meals.reduce((acc, el) => acc + el.kcal, 0).toFixed(1)}
            </H3>{' '}
            / 1960 ккал
          </Text>
          <Text>
            Белки:{' '}
            <H3>
              {
                +props.meals
                  .reduce((acc, el) => acc + el.proteins, 0)
                  .toFixed(1)
              }
            </H3>{' '}
            / 160 г
          </Text>
          <Text>
            Углеводы:{' '}
            <H3>
              {+props.meals.reduce((acc, el) => acc + el.carbs, 0).toFixed(1)}
            </H3>{' '}
            / 160 г
          </Text>
          <Text>
            Жиры:{' '}
            <H3>
              {+props.meals.reduce((acc, el) => acc + el.fat, 0).toFixed(1)}
            </H3>{' '}
            / 160 г
          </Text>
        </div>
      </Container>
      <div className={styles['row-container']}>
        <Container>
          <H2 className={styles.title}>Добавить продукт</H2>
          <div className={styles.inputs}>
            <Input
              label="Название"
              placeholder="Творог"
              value={props.name}
              onChange={props.setName}
            />
            <Input
              iconLeftSource={proteins}
              iconRight={<Text className={styles.placeholder}>г</Text>}
              label="Белки"
              placeholder="0"
              value={props.proteins}
              onChange={props.setProteins}
            />
            <Input
              iconLeftSource={carbs}
              iconRight={<Text className={styles.placeholder}>г</Text>}
              label="Углеводы"
              placeholder="0"
              value={props.carbs}
              onChange={props.setCarbs}
            />
            <Input
              iconLeftSource={fats}
              iconRight={<Text className={styles.placeholder}>г</Text>}
              label="Жиры"
              placeholder="0"
              value={props.fats}
              onChange={props.setFats}
            />
            <Input
              iconRight={<Text className={styles.placeholder}>г</Text>}
              label="Вес (Укажите для пересчета на 100г)"
              placeholder="0"
              value={props.weight}
              onChange={props.setWeight}
            />
            <Input
              iconRight={<Text className={styles.placeholder}>%</Text>}
              label="Изменение массы воды (ужарка/проваривание)"
              placeholder="0"
              value={props.weightLoss}
              onChange={props.setWeightLoss}
            />
            <div className={styles.saveProduct}>
              <Button
                iconName="save"
                label="Сохранить продукт"
                onPress={props.saveProduct}
              />
            </div>
          </div>
        </Container>
        <Container className={styles.grow}>
          <div className={styles.header}>
            <H2>Приемы пищи</H2>
            <Button
              iconName="plus"
              label="Добавить прием пищи"
              onPress={props.addMeal}
            />
          </div>

          {!!props.meals?.length &&
            props.meals.map((el, index) => (
              <Meal
                index={index}
                onClickAddProduct={() => props.addProductToMeal(index)}
                onClickDeleteMeal={() => props.deleteMeal(index)}
                onClickDeleteProduct={props.deleteProductFromMeal}
                {...el}
              />
            ))}
        </Container>
      </div>
    </ScreenLayout>
  );
};

export default Layout;
