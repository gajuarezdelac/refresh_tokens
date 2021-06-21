import  { Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './redux/Store';

import 'antd/dist/antd.css';


import { ProtectedRoute } from './utils/ProtectedRoute';

import Home from  './components/Home/Home';
import Login from './components/Login/Login';

function App() {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <Switch>
      <div className="App">
       <Route exact path="/" component={Login} />
       <ProtectedRoute exact path="/dashboard" component={Home} /> 
      </div>
      </Switch>
      </PersistGate>
    </Provider>
  );
}

export default App;
