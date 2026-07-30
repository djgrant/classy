import type {
  Attribute,
  ChildAttribute,
  Html,
  HtmlBuilder,
  TagName,
} from "foldkit/html";

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

export const cn: (...args: ClassNamesArgs[]) => string;
export const ifElse: <T = ClassNamesArgs>(target: any, left: T, right?: T) => T;
export const switchCase: <T = ClassNamesArgs>(
  target: any,
  matcher: Record<string, T> & { default?: T },
) => T | undefined;

type Attributes<Message> = ReadonlyArray<Attribute<Message> | ChildAttribute>;
type Children = ReadonlyArray<Html | string>;

type VoidTag =
  | "area"
  | "base"
  | "br"
  | "col"
  | "embed"
  | "hr"
  | "img"
  | "input"
  | "link"
  | "meta"
  | "source"
  | "track"
  | "wbr";

type ElementFunction<Tag extends TagName> = Tag extends VoidTag
  ? <Message>(
      attributes: Attributes<NoInfer<Message>>,
      h: HtmlBuilder<Message>,
    ) => Html
  : <Message>(
      attributes: Attributes<NoInfer<Message>>,
      children: Children,
      h: HtmlBuilder<Message>,
    ) => Html;

type ClassyTagFactory<Tag extends TagName> = {
  (...classNames: ClassNamesArgs[]): ElementFunction<Tag>;
  <Props>(mapper: ClassyMapper<Props>): (props: Props) => ElementFunction<Tag>;
};

type ClassyTags = {
  [Tag in TagName]: ClassyTagFactory<Tag>;
};

export type Classy = ClassyTags & {
  <Tag extends TagName>(tag: Tag): ClassyTagFactory<Tag>;
  string: (...args: ClassNamesArgs[]) => string;
};

export const classy: () => Classy;
