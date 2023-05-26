import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeProduct: undefined as Product | undefined,
  meals: [] as Meal[],
  currentDate: '26-05-2023' as string,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setActiveProduct(state, action: PayloadAction<Product>) {
      state.activeProduct = action.payload;
    },

    addMeal(state) {
      state.meals.push({
        fat: 0,
        carbs: 0,
        kcal: 0,
        proteins: 0,
        products: [],
      });
    },

    setCurrentDate(state, action: PayloadAction<string>) {
      state.currentDate = action.payload;
    },

    setMeals(state, action: PayloadAction<Meal[]>) {
      state.meals = action.payload;
    },

    addProductsToMeal(
      state,
      action: PayloadAction<{
        mealIdx: number;
        product: Product;
      }>,
    ) {
      state.meals[action.payload.mealIdx].products.push(action.payload.product);

      state.meals[action.payload.mealIdx].fat = state.meals[
        action.payload.mealIdx
      ].products.reduce((acc, el) => acc + el.fat, 0);

      state.meals[action.payload.mealIdx].proteins = state.meals[
        action.payload.mealIdx
      ].products.reduce((acc, el) => acc + el.proteins, 0);

      state.meals[action.payload.mealIdx].carbs = state.meals[
        action.payload.mealIdx
      ].products.reduce((acc, el) => acc + el.carbs, 0);

      state.meals[action.payload.mealIdx].kcal = state.meals[
        action.payload.mealIdx
      ].products.reduce((acc, el) => acc + el.kcal, 0);
    },

    deleteMeal(state, action: PayloadAction<number>) {
      state.meals = state.meals.filter((el, index) => index !== action.payload);
    },

    deleteProductFromMeal(
      state,
      action: PayloadAction<{
        mealIdx: number;
        id: string;
      }>,
    ) {
      state.meals[action.payload.mealIdx].products = state.meals[
        action.payload.mealIdx
      ].products.filter(product => product.id !== action.payload.id);

      state.meals[action.payload.mealIdx].fat = state.meals[
        action.payload.mealIdx
      ].products.reduce((acc, el) => acc + el.fat, 0);

      state.meals[action.payload.mealIdx].proteins = state.meals[
        action.payload.mealIdx
      ].products.reduce((acc, el) => acc + el.proteins, 0);

      state.meals[action.payload.mealIdx].carbs = state.meals[
        action.payload.mealIdx
      ].products.reduce((acc, el) => acc + el.carbs, 0);

      state.meals[action.payload.mealIdx].kcal = state.meals[
        action.payload.mealIdx
      ].products.reduce((acc, el) => acc + el.kcal, 0);
    },
  },
});

export default appSlice.reducer;
export const AppActions = appSlice.actions;
