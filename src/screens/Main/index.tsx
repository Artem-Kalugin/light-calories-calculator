import React, { useEffect, useState } from 'react';

import moment from 'moment';

import { useDispatch, useSelector } from '#store';
import { AppActions } from '#store/slices/app';
import { historyActions } from '#store/slices/history';
import { ProductsActions } from '#store/slices/products';

import Layout from './layout';

type NavigationProps = {};

const today = new Date();

const todayStr = moment(today).format('DD-MM-YYYY');

const Container: React.FC<NavigationProps> = props => {
  const [name, setName] = useState('');
  const [fats, setFats] = useState('');
  const [carbs, setCarbs] = useState('');
  const [proteins, setProteins] = useState('');
  const [weight, setWeight] = useState('');
  const [weightLoss, setWeightLoss] = useState('0');

  const [date, setDate] = useState(todayStr);

  const meals = useSelector(store => store.app.meals);
  const history = useSelector(store => store.history);
  const currentDate = useSelector(store => store.app.currentDate);
  const activeProduct = useSelector(store => store.app.activeProduct);
  const dispatch = useDispatch();

  const addMeal = () => {
    dispatch(AppActions.addMeal());
  };

  const getProduct = () => {
    const adjustNutritionCoefficient = weight
      ? (+weight / 100) * (1 / ((100 - +weightLoss) / 100))
      : 1;

    const _fats = adjustNutritionCoefficient * +fats;
    const _carbs = +carbs * adjustNutritionCoefficient;
    const _proteins = +proteins * adjustNutritionCoefficient;

    return {
      id: `${Date.now()}`,
      fat: +_fats.toFixed(2),
      carbs: +_carbs.toFixed(2),
      proteins: +_proteins.toFixed(2),
      ...(weight
        ? {
            per_100: {
              fat: +fats,
              carbs: +carbs,
              proteins: +proteins,
            },
          }
        : {}),
      waterLoss: `${weightLoss}`,
      name,
      kcal: +(_fats * 9.3 + _carbs * 4.3 + _proteins * 4.1).toFixed(2),
    };
  };

  const addProductToMeal = (mealIdx: number) => {
    dispatch(
      AppActions.addProductsToMeal({
        mealIdx,
        product: getProduct(),
      }),
    );
  };

  const deleteProductFromMeal = (mealIdx: number, id: string) => {
    dispatch(
      AppActions.deleteProductFromMeal({
        mealIdx,
        id,
      }),
    );
  };

  const deleteMeal = (index: number) => {
    dispatch(AppActions.deleteMeal(index));
  };

  const saveProduct = () => {
    dispatch(
      ProductsActions.upsertOne({
        ...getProduct(),
        created_at: `${Date.now()}`,
      }),
    );
  };

  useEffect(() => {
    if (activeProduct?.per_100) {
      setWeight('');
    }
    setName(`${activeProduct?.name}`);
    setCarbs(
      `${
        activeProduct?.per_100?.carbs
          ? activeProduct?.per_100?.carbs
          : activeProduct?.carbs
      }`,
    );
    setFats(
      `${
        activeProduct?.per_100?.fat
          ? activeProduct?.per_100?.fat
          : activeProduct?.fat
      }`,
    );
    setProteins(
      `${
        activeProduct?.per_100?.proteins
          ? activeProduct?.per_100?.proteins
          : activeProduct?.proteins
      }`,
    );
    setWeightLoss(`${activeProduct?.waterLoss}`);
  }, [activeProduct]);

  useEffect(() => {
    dispatch(AppActions.setCurrentDate(todayStr));
  }, []);

  useEffect(() => {
    dispatch(historyActions.setHistoryItem({ date, data: meals }));
  }, [meals]);

  useEffect(() => {
    dispatch(AppActions.setMeals(history[date] || []));
  }, [date]);

  useEffect(() => {
    setDate(currentDate);
  }, [currentDate]);
  return (
    <Layout
      /**
       *Options
       */
      addMeal={addMeal}
      addProductToMeal={addProductToMeal}
      carbs={carbs}
      deleteMeal={deleteMeal}
      deleteProductFromMeal={deleteProductFromMeal}
      fats={fats}
      meals={meals}
      name={name}
      proteins={proteins}
      saveProduct={saveProduct}
      setCarbs={setCarbs}
      setFats={setFats}
      setName={setName}
      setProteins={setProteins}
      setWeight={setWeight}
      setWeightLoss={setWeightLoss}
      weight={weight}
      weightLoss={weightLoss}
      /**
       *Methods
       */
      {...props}
    />
  );
};

type PassingStates = {
  fats: string;
  name: string;
  carbs: string;
  proteins: string;
  weight: string;
  weightLoss: string;
};

type PassingProps = {
  meals: Meal[];
  addMeal: () => void;
  saveProduct: () => void;
  deleteMeal: (index: number) => void;
  addProductToMeal: (mealIdx: number) => void;
  deleteProductFromMeal: (mealIdx: number, name: string) => void;
};

export type ViewProps = NavigationProps &
  PassingStates &
  getSetStateProps<PassingStates> &
  PassingProps;

export default Container;
