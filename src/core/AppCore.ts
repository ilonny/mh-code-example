import AppResource from './AppResource';

export type MenuItem = {
  name: string;
  path?: string;
  items?: MenuItem[];
};

class AppCore {
  resources: AppResource[] = [];

  addResource = (resource: AppResource) => {
    this.resources.push(resource);
  };

  getResource = (name: string) => {
    const resource = this.resources.find(x => x.name === name);
    if (resource === undefined) {
      throw new Error(`Resource "${name}" not found`);
    }

    return resource;
  };

  getResourceUrl = (name: string, type: string, id?: string) => {
    if (type === 'list') {
      return `/resource/${name}/list`;
    }
    if (type === 'create') {
      return `/resource/${name}/create`;
    }
    if (type === 'show') {
      return `/resource/${name}/${id}/show`;
    }
    if (type === 'edit') {
      return `/resource/${name}/${id}/edit`;
    }
    return '/';
  };

  getMenuData = (): MenuItem[] => {
    const groups: {
      [name: string]: MenuItem[];
    } = {};

    this.resources.forEach(x => {
      if (!x.config.menuConfig?.show || !x.config.allowList) {
        return;
      }
      const group = x.config.menuConfig?.group || '_';
      if (!(group in groups)) {
        groups[group] = [];
      }
      groups[group].push({
        name: x.name,
        path: this.getResourceUrl(x.name, 'list'),
      });
    });

    const result: MenuItem[] = [];

    for (let name in groups) {
      if (name === '_') {
        groups[name].forEach(x => result.push(x));
      } else {
        const group = {
          name,
          items: groups[name],
        };

        result.push(group);
      }
    }

    return result;
  };
}

export default new AppCore();
