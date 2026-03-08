import type { Component, ComponentProps, JSX, ValidComponent } from "solid-js";

export * from "@djgrant/classy";

type PropsWithAs<Props> = Props & { as?: ValidComponent };
type WrappedComponent<Props> = Component<Props>;
type PreserveStatics<Tag> = { [K in keyof Tag]: Tag[K] };
type PropsOf<Tag extends ValidComponent> = ComponentProps<Tag>;

type CreateClassyIntrinsicComponentFactory<
  Tag extends keyof JSX.IntrinsicElements,
> = {
  (...args: import("@djgrant/classy").ClassyArgs<JSX.IntrinsicElements[Tag]>): WrappedComponent<
    PropsWithAs<JSX.IntrinsicElements[Tag]>
  >;
  <ExtraProps = {}>(
    ...args: import("@djgrant/classy").ClassyArgs<JSX.IntrinsicElements[Tag] & ExtraProps>
  ): WrappedComponent<PropsWithAs<JSX.IntrinsicElements[Tag] & ExtraProps>>;
};

type ExtrinsicComponent = Exclude<ValidComponent, keyof JSX.IntrinsicElements>;

type CreateClassyExtrinsicComponentFactory<Tag extends ExtrinsicComponent> = {
  (...args: import("@djgrant/classy").ClassyArgs<PropsOf<Tag>>): WrappedComponent<
    PropsWithAs<PropsOf<Tag>>
  > &
    PreserveStatics<Tag>;
  <ExtraProps = {}>(
    ...args: import("@djgrant/classy").ClassyArgs<PropsOf<Tag> & ExtraProps>
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
  string: (...args: import("@djgrant/classy").ClassNamesArgs[]) => string;
}

export const classy: Classy;
