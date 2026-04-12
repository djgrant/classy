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

type PreserveStatics<Tag> = { [K in keyof Tag]: Tag[K] };
type PropsOf<Tag extends React.ElementType> = JSX.LibraryManagedAttributes<
  Tag,
  React.ComponentPropsWithRef<Tag>
>;

type PolymorphicProps<
  DefaultProps,
  C extends React.ElementType = React.ElementType,
> = Omit<DefaultProps, keyof React.ComponentPropsWithRef<C>> &
  React.ComponentPropsWithRef<C> & { as?: C };

type PolymorphicComponent<DefaultProps> = {
  <C extends React.ElementType>(
    props: PolymorphicProps<DefaultProps, C>,
  ): React.ReactElement | null;
  (props: DefaultProps & { as?: never }): React.ReactElement | null;
  displayName?: string;
};

type CreateClassyIntrinsicComponentFactory<
  Tag extends keyof JSX.IntrinsicElements,
> = {
  (...args: ClassyArgs<JSX.IntrinsicElements[Tag]>): PolymorphicComponent<
    JSX.IntrinsicElements[Tag]
  >;
  <ExtraProps = {}>(
    ...args: ClassyArgs<JSX.IntrinsicElements[Tag] & ExtraProps>
  ): PolymorphicComponent<JSX.IntrinsicElements[Tag] & ExtraProps>;
};

type ExtrinsicComponent =
  | React.ComponentType<any>
  | React.ForwardRefExoticComponent<any>;

type CreateClassyExtrinsicComponentFactory<Tag extends ExtrinsicComponent> = {
  (...args: ClassyArgs<PropsOf<Tag>>): PolymorphicComponent<PropsOf<Tag>> &
    PreserveStatics<Tag>;
  <ExtraProps = {}>(
    ...args: ClassyArgs<PropsOf<Tag> & ExtraProps>
  ): PolymorphicComponent<PropsOf<Tag> & ExtraProps> & PreserveStatics<Tag>;
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
