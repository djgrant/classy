import { JSX } from "react";
import type * as React from "react";

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

export const cn: (...args: ClassNamesArgs[]) => string;
export const ifElse: <T = ClassNamesArgs>(target: any, left: T, right?: T) => T;
export const switchCase: <T = ClassNamesArgs>(
  target: any,
  matcher: Record<string, T> & { default?: T },
) => T | undefined;

type PropsWithAs<Props> = Props & { as?: React.ElementType };
type WrappedComponent<Props> = React.ForwardRefExoticComponent<Props>;
type PreserveStatics<Tag> = { [K in keyof Tag]: Tag[K] };
type PropsOf<Tag extends React.ElementType> = JSX.LibraryManagedAttributes<
  Tag,
  React.ComponentPropsWithRef<Tag>
>;

type CreateClassyIntrinsicComponentFactory<
  Tag extends keyof JSX.IntrinsicElements,
> = {
  (...args: ClassyArgs<JSX.IntrinsicElements[Tag]>): WrappedComponent<
    PropsWithAs<JSX.IntrinsicElements[Tag]>
  >;
  <ExtraProps = {}>(
    ...args: ClassyArgs<JSX.IntrinsicElements[Tag] & ExtraProps>
  ): WrappedComponent<PropsWithAs<JSX.IntrinsicElements[Tag] & ExtraProps>>;
};

type ExtrinsicComponent =
  | React.ComponentType<any>
  | React.ForwardRefExoticComponent<any>;

type CreateClassyExtrinsicComponentFactory<Tag extends ExtrinsicComponent> = {
  (...args: ClassyArgs<PropsOf<Tag>>): WrappedComponent<
    PropsWithAs<PropsOf<Tag>>
  > &
    PreserveStatics<Tag>;
  <ExtraProps = {}>(
    ...args: ClassyArgs<PropsOf<Tag> & ExtraProps>
  ): WrappedComponent<PropsWithAs<PropsOf<Tag> & ExtraProps>> &
    PreserveStatics<Tag>;
};

type ClassyTags = {
  [K in keyof JSX.IntrinsicElements]: CreateClassyIntrinsicComponentFactory<K>;
};

export interface Classy extends ClassyTags {
  <Tag extends ExtrinsicComponent>(
    tag: Tag,
  ): CreateClassyExtrinsicComponentFactory<Tag>;
  <Tag extends keyof JSX.IntrinsicElements>(
    tag: Tag,
  ): CreateClassyIntrinsicComponentFactory<Tag>;
  string: (...args: ClassNamesArgs[]) => string;
}

export const classy: Classy;
