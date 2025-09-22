import type { JSX } from 'react';
import type User from "./User";

export default interface Route {
  element?: JSX.Element;
  path: string;
  loader?: Function;
  menuLabel?: string;
  index?: number;
  parent?: string;
  protected?: boolean;
  roles?: Array<User["role"]>;
}