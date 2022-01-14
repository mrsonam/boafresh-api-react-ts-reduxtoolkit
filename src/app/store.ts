import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { cartApi } from '../services/cart';
import { categoryApi } from '../services/category';
import { deliveryApi } from '../services/delivery';
import { homeApi } from '../services/home';
import { productsApi } from '../services/products';
import { userApi } from '../services/user';

export const store = configureStore({
    reducer: {
        [categoryApi.reducerPath]: categoryApi.reducer,
        [homeApi.reducerPath]: homeApi.reducer,
        [productsApi.reducerPath]: productsApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [cartApi.reducerPath]: cartApi.reducer,
        [deliveryApi.reducerPath]: deliveryApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            categoryApi.middleware,
            homeApi.middleware,
            productsApi.middleware,
            userApi.middleware,
            cartApi.middleware,
            deliveryApi.middleware
        ),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
