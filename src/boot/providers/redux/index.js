'use client';
import {store, persistor} from '@/store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

const ReduxProvider = ({children}) => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        {children}
      </PersistGate>
    </Provider>
  );
};

export default ReduxProvider;
