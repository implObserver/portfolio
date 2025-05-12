import { Provider } from "react-redux"
import { persistor, store } from "../store/Store"
import { PersistGate } from "redux-persist/integration/react"
import type { ReactNode } from "react"

export const WithRedux = ({ children }: { children: ReactNode }) => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                {children}
            </PersistGate>
        </Provider>
    )
}