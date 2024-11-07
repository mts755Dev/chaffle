type ReactChildren = {
  children: React.ReactNode;
};

type NavItem = {
  title: string;
  url?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
};

type ParamPropWithId = {
  params: {
    id: string;
  };
};
