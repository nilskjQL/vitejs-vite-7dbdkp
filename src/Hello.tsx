import React from 'react';
import { useInjection, MyService } from './ioc.ti';

export const Hello: React.FC = () => {
  const myService = useInjection().injectClass(MyService);

  return <h1>Hello {myService.provide()}!</h1>;
};
