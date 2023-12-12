import { Provider } from "react-redux";
import { store } from "../store";
import { RenderResult, render } from '@testing-library/react-native';

export const advancedRender = (e: JSX.Element): RenderResult => {
    return render(
        <Provider store={store}>
            {e}
        </Provider>);
};


