import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "@redux-saga/core";
import { Product, getProducts, updateProduct, deleteProduct, createProduct } from "./api";
import { put, takeEvery } from "redux-saga/effects";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from 'reselect';


function* getProductsAction() {
  const products: Product[] = yield getProducts();
  console.log("products:", products);
  yield put({ type: "PRODUCTS_FETCH_SUCCEEDED", payload: products });
}

function* createProductAction({
  payload,
}: {
  type: "CREATE_PRODUCT_REQUESTED";
  payload: string;
}) {
  yield createProduct(payload);
  yield put({ type: "PRODUCTS_FETCH_REQUESTED" });
}

function* updateProductAction({
  payload,
}: {
  type: "UPDATE_PRODUCT_REQUESTED";
  payload: Product;
}) {
  yield updateProduct(payload);
  yield put({ type: "PRODUCTS_FETCH_REQUESTED" });
}

function* deleteProductAction({
  payload,
}: {
  type: "DELETE_PRODUCT_REQUESTED";
  payload: Product;
}) {
  yield deleteProduct(payload);
  yield put({ type: "PRODUCTS_FETCH_REQUESTED" });
}

function* rootSaga() {
  yield takeEvery("PRODUCTS_FETCH_REQUESTED", getProductsAction);
  yield takeEvery("UPDATE_PRODUCT_REQUESTED", updateProductAction);
  yield takeEvery("DELETE_PRODUCT_REQUESTED", deleteProductAction);
  yield takeEvery("CREATE_PRODUCT_REQUESTED", createProductAction);
}

const reducer = (
  state: Product[] = [],
  action: { type: "PRODUCTS_FETCH_SUCCEEDED"; payload: Product[] }
) => {
  switch (action.type) {
    case "PRODUCTS_FETCH_SUCCEEDED":
      return action.payload;
    default:
      return state;
  }
};

export const toggleCartHidden = () => ({
  type: "TOGGLE_CART_HIDDEN",
});

//  Cart

const selectCart = (state: { cart: any; }) => state.cart;

export const selectCartItems = createSelector(
  [selectCart],
  cart => cart.cartItems
);

export const selectCartHidden = createSelector(
  [selectCart],
  cart => cart.hidden
);

export const selectCartItemsCount = createSelector(
  [selectCartItems],
  cartItems =>
    cartItems.reduce(
      (accumalatedQuantity: number, cartItem: { quantity: number; }) =>
        accumalatedQuantity + cartItem.quantity,
      0
    )
); 

export const selectCartTotal = createSelector(
  [selectCartItems],
  cartItems =>
    cartItems.reduce(
      (accumalatedQuantity: number, cartItem: { quantity: number; price: number; }) =>
        accumalatedQuantity + cartItem.quantity * cartItem.price,
      0
    )
);

//

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(reducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export const selectProducts = (state: Product[]) => state;

export const fetchProducts = () => ({ type: "PRODUCTS_FETCH_REQUESTED" });

export const removeProduct = (product: Product) => ({
  type: "DELETE_PRODUCT_REQUESTED",
  payload: product,
});
export const addProduct = (text: string) => ({
  type: "CREATE_PRODUCT_REQUESTED",
  payload: text,
});

