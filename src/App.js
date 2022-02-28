import {Router} from "./components/Router";
import {Provider} from "react-redux";
import {persistor, store} from "./store";
import {PersistGate} from "redux-persist/integration/react";

const App = () => (
    <Provider store={store}>
        <PersistGate persistor={persistor }>
            <Router />
        </PersistGate>
    </Provider>
    );

export default App;
