import type { JSX } from 'react';
import type User from "./User";
import type { LoaderFunction } from 'react-router-dom';

export default interface Route {
  element?: JSX.Element;
  path: string;
  loader?: LoaderFunction | boolean;
  menuLabel?: string;
  index?: number;
  parent?: string;
  roles?: Array<User["role"]>;
  hiddenWhen?: "loggedIn" | "loggedOut";
}