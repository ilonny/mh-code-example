import resources from '../resources';
import appCore from './AppCore';

export const initialize = () => {
  resources.forEach(x => appCore.addResource(x));
};
