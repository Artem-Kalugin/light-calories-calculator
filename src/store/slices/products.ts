import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

import { RootState } from '#store';

export const ProductsAdapter = createEntityAdapter<
  Product & { created_at: string }
>({
  selectId: product => product.id,
  sortComparer: (a, b) => {
    if (a?.created_at > b?.created_at) {
      return -1;
    }

    if (a?.created_at < b?.created_at) {
      return 1;
    }

    return 0;
  },
});

const productsSlice = createSlice({
  name: 'products',
  initialState: ProductsAdapter.getInitialState(),
  reducers: {
    upsertOne: ProductsAdapter.upsertOne,
    deleteOne: ProductsAdapter.removeOne,
    upsertMany: ProductsAdapter.upsertMany,
    setAll: ProductsAdapter.setAll,
  },
});

export default productsSlice.reducer;
export const ProductsActions = productsSlice.actions;
export const ProductsSelectors = ProductsAdapter.getSelectors<RootState>(
  state => state.products,
);
