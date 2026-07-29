import type {
  Attribute,
  ChildAttribute,
  Html,
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

type ElementFunction<Message, Tag extends TagName> = Tag extends VoidTag
  ? (attributes: Attributes<Message>) => Html
  : (attributes: Attributes<Message>, children: Children) => Html;

type ClassyTagFactory<Message, Tag extends TagName> = {
  (...classNames: ClassNamesArgs[]): ElementFunction<Message, Tag>;
  <Props>(
    mapper: ClassyMapper<Props>,
  ): (props: Props) => ElementFunction<Message, Tag>;
};

type ClassyTags<Message> = {
  [Tag in TagName]: ClassyTagFactory<Message, Tag>;
};

export type Classy<Message> = ClassyTags<Message> & {
  <Tag extends TagName>(tag: Tag): ClassyTagFactory<Message, Tag>;
  string: (...args: ClassNamesArgs[]) => string;
};

export const classy: <Message = never>() => Classy<Message>;
