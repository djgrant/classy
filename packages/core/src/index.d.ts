export type ClassName<T extends string> =
  | T
  | undefined
  | null
  | boolean
  | number
  | { [key in T]?: boolean }
  | ClassName<T>[];

export type ClassNamesArgs = ClassName<string> | ClassName<string>[];
export type ClassyMapper<Props> = (props: Props) => ClassNamesArgs;
export type ClassyArgs<Props> = ClassNamesArgs[] | [ClassyMapper<Props>];
export type ClassyFactory<Tag, Result> = ((tag: Tag) => (...args: ClassyArgs<any>) => Result) & {
  [key: string]: ((...args: ClassyArgs<any>) => Result) | ((...args: ClassNamesArgs[]) => string);
  string: (...args: ClassNamesArgs[]) => string;
};

export const cn: (...args: ClassNamesArgs[]) => string;

export const createClassy: <Tag, Result>(
  renderComponent: (tag: Tag, args: ClassyArgs<any>) => Result,
) => ClassyFactory<Tag, Result>;

export const resolveClassNames: <Props>(
  args: ClassyArgs<Props>,
  props: Props,
) => ClassNamesArgs;

export const filterProps: <Props extends Record<string, any>>(
  props: Props,
  options?: {
    exclude?: string[];
    shouldForwardProp?: (key: string, value: Props[keyof Props]) => boolean;
  },
) => Partial<Props>;

export const defineProxyProps: <Props extends Record<string, any>>(
  props: Props,
  options?: {
    exclude?: string[];
    shouldForwardProp?: (key: string, value: Props[keyof Props]) => boolean;
  },
) => Partial<Props>;

export const getDisplayName: (tag: unknown) => string;

export const hoistStatics: <Target, Source>(target: Target, source: Source) => Target & Source;

export const tags: string[];

export const ifElse: <T = ClassNamesArgs>(target: any, left: T, right?: T) => T;

export const switchCase: <T = ClassNamesArgs>(
  target: any,
  matcher: Record<string, T> & { default?: T },
) => T | undefined;
