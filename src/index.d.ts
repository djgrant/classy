import { JSX } from "react";
import type * as React from "react";

export const ifElse: <T = ClassNamesArgs>(target: any, left: T, right?: T) => T;

export const switchCase: <T = ClassNamesArgs>(
  target: any,
  matcher: Record<string, T>,
) => T;

// clsx api
type ClassName<T extends string> =
  | T
  | undefined
  | null
  | boolean
  | number
  | { [key in T]?: boolean }
  | ClassName<T>[];

type ClassNamesArgs = ClassName<string> | ClassName<string>[];

declare const classy: Classy;

// Main callable interface with intrinsic element helpers
export interface Classy extends ClassyTags {}
export interface Classy {
  <Tag extends React.ComponentType<any>>(
    tag: Tag,
  ): CreateClassyExtrinsicComponentFactory<Tag>;

  <Tag extends keyof JSX.IntrinsicElements>(
    tag: Tag,
  ): CreateClassyIntrinsicComponentFactory<Tag>;

  string: (...args: ClassNamesArgs[]) => string;
}

type Args<Props> = ClassNamesArgs[] | [ClassyMapper<Props>];
type ClassyMapper<Props> = (props: Props) => ClassNamesArgs;

// Map intrinsic tags to `ForwardRefExoticComponent` wrappers
// while leaving other component types untouched.
type StyledComponentBase<Tag, Props> = Tag extends keyof JSX.IntrinsicElements
  ? React.ForwardRefExoticComponent<Props>
  : Tag extends React.ForwardRefExoticComponent<any>
    ? Tag
    : Tag extends React.ComponentType<any>
      ? Tag
      : Tag;

// Snapshot the original component's static members so we can reapply them after
// widening the call signature with extra props.
type PreserveStatics<Tag> = { [K in keyof Tag]: Tag[K] };

// When extra props are introduced, expose a widened call signature but keep the
// original statics alongside it.
type StyledComponentWithExtra<Tag, Props, ExtraProps> =
  Tag extends keyof JSX.IntrinsicElements
    ? React.ForwardRefExoticComponent<Props & ExtraProps>
    : Tag extends React.ForwardRefExoticComponent<any>
      ? React.ForwardRefExoticComponent<Props & ExtraProps> &
          PreserveStatics<Tag>
      : Tag extends (props: infer P, ...args: infer R) => infer Return
        ? ((props: P & ExtraProps, ...args: R) => Return) & PreserveStatics<Tag>
        : Tag extends React.ComponentType<any>
          ? React.ComponentType<Props & ExtraProps> & PreserveStatics<Tag>
          : Tag;

// Ensures `classy` returns the original component type when no new props are
// added. This preserves generic call signatures and static members so wrapper
// components keep their existing inference behavior.
interface ClassyComponentFactory<Tag, Props> {
  (...args: Args<Props>): StyledComponentBase<Tag, Props>;
  // When extra props are provided we intersect the augmented call signature
  // with the original statics so consumers can add styling-only props without
  // losing existing component behavior.
  <ExtraProps = {}>(
    ...args: Args<Props & ExtraProps>
  ): StyledComponentWithExtra<Tag, Props, ExtraProps>;
}

// Factory typing for wrapping user-supplied React components (extrinsic).
type CreateClassyExtrinsicComponentFactory<
  Tag extends React.ComponentType<any>,
> = ClassyComponentFactory<Tag, PropsOf<Tag>>;

// Factory typing for intrinsic DOM/SVG elements.
type CreateClassyIntrinsicComponentFactory<
  Tag extends keyof JSX.IntrinsicElements,
> = ClassyComponentFactory<Tag, JSX.IntrinsicElements[Tag]>;

// Derive props for either intrinsic elements or arbitrary React components.
type PropsOf<
  C extends keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>,
> = JSX.LibraryManagedAttributes<C, React.ComponentPropsWithRef<C>>;

// Generate intrinsic element overloads using a mapped type to stay in sync with
// the JSX intrinsic element set (no need to maintain a large manual list).
type ClassyTags = {
  [K in keyof JSX.IntrinsicElements]: CreateClassyIntrinsicComponentFactory<K>;
};
