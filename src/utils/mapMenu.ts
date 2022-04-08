export function menusToUserMenus(menus: any[]) {
  const userMenus: any[] = [];
  console.log(menus);
  return userMenus;
}

export function mapDefaultMenus(menus: any[], number = 8) {
  // 返回menus的前number个 若menus的数量不超过number，则返回全部
  const defaultMenus: any[] = [];
  if (menus.length > number) {
    for (let i = 0; i < number; i++) {
      defaultMenus.push(menus[i]);
    }
  } else {
    defaultMenus.push(...menus);
  }
  return defaultMenus;
}

interface IClassMenusTypd {
  icon: string;
  id: number;
  parent: string;
  path: string;
  showparent: string;
  title: string;
}
export function mapClassMenus(menus: IClassMenusTypd[]) {
  const classMenus: any[] = [];
  menus.forEach((item) => {
    const find = classMenus.find((i) => i.parent == item.parent);
    if (!find) {
      classMenus.push({
        parent: item.parent,
        title: item.showparent,
        children: [
          {
            icon: item.icon,
            id: item.id,
            path: item.path,
            title: item.title,
          },
        ],
      });
    } else {
      find.children.push({
        icon: item.icon,
        id: item.id,
        path: item.path,
        title: item.title,
      });
    }
  });
  return classMenus;
}
