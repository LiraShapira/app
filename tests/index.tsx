import { Provider } from "react-redux";
import { store } from "../store";
import renderer, { ReactTestRenderer } from 'react-test-renderer'; // Import ReactTestRendererJSON

export const advancedRender = (e: JSX.Element): ReactTestRenderer => {
    return renderer.create(
        <Provider store={store}>
            {e}
        </Provider>);
};


