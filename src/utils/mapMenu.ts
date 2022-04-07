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
