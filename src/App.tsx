import 'reflect-metadata';
import { Hello } from './Hello';
import { Provider, appInjector } from './ioc.ti';

function App() {
  return (
    <Provider injector={appInjector}>
      <Hello />
      <Hello />
    </Provider>
  );
}

export default App;
