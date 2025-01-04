export interface Route {
    path: string;
    element: JSX.Element;
    allowedRoles?: number[];
  }
