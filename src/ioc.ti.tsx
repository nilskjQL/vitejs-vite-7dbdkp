import React, { useContext } from 'react';
import { createInjector } from 'typed-inject';

interface Logger {
  info(message: string): void;
}

const logger: Logger = {
  info(message: string) {
    console.log(message);
  },
};

class HttpClient {
  constructor(private log: Logger) {
    console.log('HTTP CLIENT CREATED');
  }
  public static inject = ['logger'] as const;
}

export class MyService {
  constructor(private http: HttpClient, private log: Logger) {}
  public static inject = ['httpClient', 'logger'] as const;

  message(msg: string) {
    this.log.info(msg);
  }

  provide() {
    return 'PROVIDED';
  }
}

export const appInjector = createInjector()
  .provideValue('logger', logger)
  .provideClass('httpClient', HttpClient);

const DependencyInjectionContext = React.createContext<{
  injector: typeof appInjector | null;
}>({
  injector: null,
});

interface Props {
  injector: typeof appInjector;
  children: React.ReactNode;
}

export const Provider: React.FC<Props> = ({ injector, children }) => {
  return (
    <DependencyInjectionContext.Provider value={{ injector }}>
      {children}
    </DependencyInjectionContext.Provider>
  );
};

export function useInjection() {
  const { injector } = useContext(DependencyInjectionContext);
  if (!injector) {
    throw new Error();
  }
  return injector;
}
