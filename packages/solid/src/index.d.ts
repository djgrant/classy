import type { Component, ComponentProps, JSX, ValidComponent } from "solid-js";

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
type PropsOf<Tag extends ValidComponent> = ComponentProps<Tag>;

type PolymorphicProps<
  DefaultProps,
  C extends ValidComponent = ValidComponent,
> = Omit<DefaultProps, keyof ComponentProps<C>> &
  ComponentProps<C> & { as?: C };

type PolymorphicComponent<DefaultProps> = {
  <C extends ValidComponent>(
    props: PolymorphicProps<DefaultProps, C>,
  ): JSX.Element;
  (props: DefaultProps & { as?: never }): JSX.Element;
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

type ExtrinsicComponent = Exclude<ValidComponent, keyof JSX.IntrinsicElements>;

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
