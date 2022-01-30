import { createStore, applyMiddleware, combineReducers } from "redux";
import createSagaMiddleware from "@redux-saga/core";
import { Product, User, getProducts, updateProduct, deleteProduct, createProduct } from "./api";
import { put, takeEvery } from "redux-saga/effects";


function* getProductsAction() {
  const products: Product[] = yield getProducts();
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

const userReducer = (
  state: User = {},
  action: { type: "USER_FETCH_SUCCEEDED"; payload: User }
) => {
  switch (action.type) {
    case "USER_FETCH_SUCCEEDED":
      return action.payload;
    default:
      return state;
  }
};
const productReducer = (
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

const rootReducer = combineReducers({
  user: userReducer,
  product: productReducer,
});

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;

export const selectProducts = (state: RootState) => state.product;

export const fetchProducts = () => ({ type: "PRODUCTS_FETCH_REQUESTED" });

export const removeProduct = (product: Product) => ({
  type: "DELETE_PRODUCT_REQUESTED",
  payload: product,
});
export const addProduct = (text: string) => ({
  type: "CREATE_PRODUCT_REQUESTED",
  payload: text,
});


/* function* signInStartAction({
  payload,
}: {
  type: "SIGN_IN_START";
  payload: User;
}) {
  yield signInStart(payload);
  yield put({ type: "SIGN_IN_FETCH_REQUESTED" });
}

function* signInSuccessAction({
  payload,
}: {
  type: "SIGN_IN_SUCCESS";
  payload: User;
}) {
  yield signInSuccess(payload);
  yield put({ type: "SIGN_IN_FETCH_REQUESTED" });
}

function* signInFailureAction({
  payload,
}: {
  type: "SIGN_IN_FAILURE";
  payload: string;
}) {
  yield signInFailure(payload);
  yield put({ type: "SIGN_IN_FETCH_REQUESTED" });
}

function* signOutFailureAction() {
  yield signOutStart();
  yield put({ type: "SIGN_OUT_FETCH_REQUESTED" });
} */