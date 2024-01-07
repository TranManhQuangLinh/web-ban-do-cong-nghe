import React, { CSSProperties } from "react";
import type { MenuProps } from "antd";
import { Menu } from "antd";

type MenuItem = Required<MenuProps>["items"][number];

interface IModalProps {
  items: MenuItem[],
  style?: CSSProperties,
  onClick?: MenuProps["onClick"],
  defaultSelectedKeys?: string[],
  defaultOpenKeys?: string[],
  mode?: 'horizontal' | 'vertical' | 'inline',
}

const MenuComponent: React.FC<IModalProps> = (props) => {

  const items: MenuProps["items"] = props.items;

  return (
    <Menu
      onClick={props.onClick}
      style={props.style}
      defaultSelectedKeys={props.defaultSelectedKeys}
      defaultOpenKeys={props.defaultOpenKeys}
      mode={props.mode}
      items={items}
    />
  );
};

export default MenuComponent;
