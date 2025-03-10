import * as React from "react";

declare const classy: ClassyFactory & ClassyTags;

interface ClassyFactory {
  <
    Tag extends
      | keyof React.JSX.IntrinsicElements
      | React.JSXElementConstructor<any>
  >(
    tag: Tag
  ): <ExtraProps = {}>(
    ...args: Tag extends React.JSX.IntrinsicElements
      ? Args<React.JSX.IntrinsicElements[Tag] & ExtraProps>
      : Args<Tag & ExtraProps>
  ) => ClassyComponentType<Tag, ExtraProps>;
}

type ClassyTags = {
  [K in keyof React.JSX.IntrinsicElements]: <ExtraProps = {}>(
    ...args: Args<React.JSX.IntrinsicElements[K] & ExtraProps>
  ) => ClassyComponentType<K, ExtraProps>;
};

/**
 * Input parameters
 */
type ClassName<T extends string> =
  | T
  | undefined
  | null
  | { [key in T]?: boolean }
  | ClassName<T>[];

type Args<Props> = ClassNamesArgs[] | [ClassyMapper<Props>];
type ClassNamesArgs = ClassName<string> | ClassName<string>[];
type ClassyMapper<Props> = (props: Props) => ClassNamesArgs;

/**
 * Returned components
 */
type ClassyComponentType<
  Type extends
    | keyof React.JSX.IntrinsicElements
    | React.JSXElementConstructor<any>,
  ExtraProps = {}
> = React.ForwardRefExoticComponent<PropsOf<Type> & ExtraProps>;

type PropsOf<
  C extends keyof React.JSX.IntrinsicElements | React.JSXElementConstructor<any>
> = React.JSX.LibraryManagedAttributes<C, React.ComponentPropsWithRef<C>>;

export const ifElse: <T = ClassNamesArgs>(target: any, left: T, right?: T) => T;

export const switchCase: <T = ClassNamesArgs>(
  target: any,
  matcher: Record<string, T>
) => T;
