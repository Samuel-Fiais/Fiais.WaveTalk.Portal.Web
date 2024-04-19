import { Provider } from "react-redux"
import { store } from "./store"

type ProviderReduxProps = {
  children: React.ReactNode
}

const ProviderRedux = ({ children }: ProviderReduxProps) => {
  return <Provider store={store}>{children}</Provider>
}

export default ProviderRedux