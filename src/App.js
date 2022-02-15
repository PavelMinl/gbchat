import {Router} from "./components/Router";
import {Provider} from "react-redux";
import {store} from "./store";

const App = () => (
    <Provider store={store}>
    <Router />
        </Provider>
    );

export default App;
