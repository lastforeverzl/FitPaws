import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import app from '../redux/reducers';

export default function configureStore() {
  const store = createStore(app, applyMiddleware(thunk));
  return store;
}
