import React, { createContext, useMemo, useState, useContext, ReactNode } from "react";
import noop from "lodash/noop";

// Описуємо тип MenuIds
type MenuIds = "first" | "second" | "last";

// Описуємо тип Menu
type Menu = { id: MenuIds; title: string };

// Додаємо тип для SelectedMenu
type SelectedMenu = { id: MenuIds };

// Додаємо тип для MenuSelected
type MenuSelected = {
  selectedMenu: SelectedMenu;
};

// Додаємо тип для MenuAction
type MenuAction = {
  onSelectedMenu: (menu: SelectedMenu) => void;
};

// Додаємо тип для PropsProvider
type PropsProvider = {
  children: ReactNode;
};

// Ініціалізація контекстів із правильними типами.
const MenuSelectedContext = createContext<MenuSelected>({
  selectedMenu: { id: "first" }, // встановлення початкового значення
});

const MenuActionContext = createContext<MenuAction>({
  onSelectedMenu: noop,
});

function MenuProvider({ children }: PropsProvider) {
  
  // Ініціалізуємо стан із початковим значенням для SelectedMenu
  const [selectedMenu, setSelectedMenu] = useState<SelectedMenu>({ id: "first" });

  const menuContextAction = useMemo(
    () => ({
      onSelectedMenu: setSelectedMenu,
    }),
    []
  );

  const menuContextSelected = useMemo(
    () => ({
      selectedMenu,
    }),
    [selectedMenu]
  );

  return (
    <MenuActionContext.Provider value={menuContextAction}>
      <MenuSelectedContext.Provider value={menuContextSelected}>
        {children}
      </MenuSelectedContext.Provider>
    </MenuActionContext.Provider>
  );
}

// Додаємо тип для PropsMenu
type PropsMenu = {
  menus: Menu[];
};

function MenuComponent({ menus }: PropsMenu) {
  const { onSelectedMenu } = useContext(MenuActionContext);
  const { selectedMenu } = useContext(MenuSelectedContext);

  return (
    <>
      {menus.map((menu) => (
        <div key={menu.id} onClick={() => onSelectedMenu({ id: menu.id })}>
          {menu.title} {selectedMenu.id === menu.id ? "Selected" : "Not selected"}
        </div>
      ))}
    </>
  );
}

export function ComponentApp() {
  const menus: Menu[] = [
    {
      id: "first",
      title: "first",
    },
    {
      id: "second",
      title: "second",
    },
    {
      id: "last",
      title: "last",
    },
  ];

  return (
    <MenuProvider>
      <MenuComponent menus={menus} />
    </MenuProvider>
  );
}