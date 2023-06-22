type ClassName<T extends string> =
  | T
  | undefined
  | null
  | { [key in T]?: boolean }
  | ClassName<T>[];

type ClassNamesArgs = ClassName<string> | ClassName<string>[];

export const ifElse: <T = ClassNamesArgs>(target: any, left: T, right?: T) => T;

export const switchCase: <T = ClassNamesArgs>(
  target: any,
  matcher: Record<string, T>
) => T;

declare const classy: Classy;

export interface Classy extends ClassyTags {}
export interface Classy {
  <Tag extends React.ComponentType<any>>(
    tag: Tag
  ): CreateClassyExtrinsicComponentFactory<Tag>;

  <Tag extends keyof JSX.IntrinsicElements>(
    tag: Tag
  ): CreateClassyIntrinsicComponentFactory<Tag>;

  string: (...args: ClassNamesArgs[]) => string;
}

type Args<Props> = ClassNamesArgs[] | [ClassyMapper<Props>];
type ClassyMapper<Props> = (props: Props) => ClassNamesArgs;
type ClassyComponent<TProps> = React.ForwardRefExoticComponent<TProps>;

interface ClassyComponentFactory<Props> {
  <ExtraProps = {}>(...args: Args<Props & ExtraProps>): ClassyComponent<
    Props & ExtraProps
  >;
}

type CreateClassyExtrinsicComponentFactory<
  Tag extends React.ComponentType<any>
> = ClassyComponentFactory<PropsOf<Tag>>;

type CreateClassyIntrinsicComponentFactory<
  Tag extends keyof JSX.IntrinsicElements
> = ClassyComponentFactory<JSX.IntrinsicElements[Tag]>;

type PropsOf<
  C extends keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>
> = JSX.LibraryManagedAttributes<C, React.ComponentPropsWithRef<C>>;

interface ClassyTags {
  a: CreateClassyIntrinsicComponentFactory<"a">;
  abbr: CreateClassyIntrinsicComponentFactory<"abbr">;
  address: CreateClassyIntrinsicComponentFactory<"address">;
  area: CreateClassyIntrinsicComponentFactory<"area">;
  article: CreateClassyIntrinsicComponentFactory<"article">;
  aside: CreateClassyIntrinsicComponentFactory<"aside">;
  audio: CreateClassyIntrinsicComponentFactory<"audio">;
  b: CreateClassyIntrinsicComponentFactory<"b">;
  base: CreateClassyIntrinsicComponentFactory<"base">;
  bdi: CreateClassyIntrinsicComponentFactory<"bdi">;
  bdo: CreateClassyIntrinsicComponentFactory<"bdo">;
  big: CreateClassyIntrinsicComponentFactory<"big">;
  blockquote: CreateClassyIntrinsicComponentFactory<"blockquote">;
  body: CreateClassyIntrinsicComponentFactory<"body">;
  br: CreateClassyIntrinsicComponentFactory<"br">;
  button: CreateClassyIntrinsicComponentFactory<"button">;
  canvas: CreateClassyIntrinsicComponentFactory<"canvas">;
  caption: CreateClassyIntrinsicComponentFactory<"caption">;
  cite: CreateClassyIntrinsicComponentFactory<"cite">;
  code: CreateClassyIntrinsicComponentFactory<"code">;
  col: CreateClassyIntrinsicComponentFactory<"col">;
  colgroup: CreateClassyIntrinsicComponentFactory<"colgroup">;
  data: CreateClassyIntrinsicComponentFactory<"data">;
  datalist: CreateClassyIntrinsicComponentFactory<"datalist">;
  dd: CreateClassyIntrinsicComponentFactory<"dd">;
  del: CreateClassyIntrinsicComponentFactory<"del">;
  details: CreateClassyIntrinsicComponentFactory<"details">;
  dfn: CreateClassyIntrinsicComponentFactory<"dfn">;
  dialog: CreateClassyIntrinsicComponentFactory<"dialog">;
  div: CreateClassyIntrinsicComponentFactory<"div">;
  dl: CreateClassyIntrinsicComponentFactory<"dl">;
  dt: CreateClassyIntrinsicComponentFactory<"dt">;
  em: CreateClassyIntrinsicComponentFactory<"em">;
  embed: CreateClassyIntrinsicComponentFactory<"embed">;
  fieldset: CreateClassyIntrinsicComponentFactory<"fieldset">;
  figcaption: CreateClassyIntrinsicComponentFactory<"figcaption">;
  figure: CreateClassyIntrinsicComponentFactory<"figure">;
  footer: CreateClassyIntrinsicComponentFactory<"footer">;
  form: CreateClassyIntrinsicComponentFactory<"form">;
  h1: CreateClassyIntrinsicComponentFactory<"h1">;
  h2: CreateClassyIntrinsicComponentFactory<"h2">;
  h3: CreateClassyIntrinsicComponentFactory<"h3">;
  h4: CreateClassyIntrinsicComponentFactory<"h4">;
  h5: CreateClassyIntrinsicComponentFactory<"h5">;
  h6: CreateClassyIntrinsicComponentFactory<"h6">;
  head: CreateClassyIntrinsicComponentFactory<"head">;
  header: CreateClassyIntrinsicComponentFactory<"header">;
  hgroup: CreateClassyIntrinsicComponentFactory<"hgroup">;
  hr: CreateClassyIntrinsicComponentFactory<"hr">;
  html: CreateClassyIntrinsicComponentFactory<"html">;
  i: CreateClassyIntrinsicComponentFactory<"i">;
  iframe: CreateClassyIntrinsicComponentFactory<"iframe">;
  img: CreateClassyIntrinsicComponentFactory<"img">;
  input: CreateClassyIntrinsicComponentFactory<"input">;
  ins: CreateClassyIntrinsicComponentFactory<"ins">;
  kbd: CreateClassyIntrinsicComponentFactory<"kbd">;
  keygen: CreateClassyIntrinsicComponentFactory<"keygen">;
  label: CreateClassyIntrinsicComponentFactory<"label">;
  legend: CreateClassyIntrinsicComponentFactory<"legend">;
  li: CreateClassyIntrinsicComponentFactory<"li">;
  link: CreateClassyIntrinsicComponentFactory<"link">;
  main: CreateClassyIntrinsicComponentFactory<"main">;
  map: CreateClassyIntrinsicComponentFactory<"map">;
  mark: CreateClassyIntrinsicComponentFactory<"mark">;
  /**
   * @desc
   * marquee tag is not supported by @types/react
   */
  // 'marquee': CreateClassyIntrinsicComponentFactory<'marquee';
  menu: CreateClassyIntrinsicComponentFactory<"menu">;
  menuitem: CreateClassyIntrinsicComponentFactory<"menuitem">;
  meta: CreateClassyIntrinsicComponentFactory<"meta">;
  meter: CreateClassyIntrinsicComponentFactory<"meter">;
  nav: CreateClassyIntrinsicComponentFactory<"nav">;
  noscript: CreateClassyIntrinsicComponentFactory<"noscript">;
  object: CreateClassyIntrinsicComponentFactory<"object">;
  ol: CreateClassyIntrinsicComponentFactory<"ol">;
  optgroup: CreateClassyIntrinsicComponentFactory<"optgroup">;
  option: CreateClassyIntrinsicComponentFactory<"option">;
  output: CreateClassyIntrinsicComponentFactory<"output">;
  p: CreateClassyIntrinsicComponentFactory<"p">;
  param: CreateClassyIntrinsicComponentFactory<"param">;
  picture: CreateClassyIntrinsicComponentFactory<"picture">;
  pre: CreateClassyIntrinsicComponentFactory<"pre">;
  progress: CreateClassyIntrinsicComponentFactory<"progress">;
  q: CreateClassyIntrinsicComponentFactory<"q">;
  rp: CreateClassyIntrinsicComponentFactory<"rp">;
  rt: CreateClassyIntrinsicComponentFactory<"rt">;
  ruby: CreateClassyIntrinsicComponentFactory<"ruby">;
  s: CreateClassyIntrinsicComponentFactory<"s">;
  samp: CreateClassyIntrinsicComponentFactory<"samp">;
  script: CreateClassyIntrinsicComponentFactory<"script">;
  section: CreateClassyIntrinsicComponentFactory<"section">;
  select: CreateClassyIntrinsicComponentFactory<"select">;
  small: CreateClassyIntrinsicComponentFactory<"small">;
  source: CreateClassyIntrinsicComponentFactory<"source">;
  span: CreateClassyIntrinsicComponentFactory<"span">;
  strong: CreateClassyIntrinsicComponentFactory<"strong">;
  style: CreateClassyIntrinsicComponentFactory<"style">;
  sub: CreateClassyIntrinsicComponentFactory<"sub">;
  summary: CreateClassyIntrinsicComponentFactory<"summary">;
  sup: CreateClassyIntrinsicComponentFactory<"sup">;
  table: CreateClassyIntrinsicComponentFactory<"table">;
  tbody: CreateClassyIntrinsicComponentFactory<"tbody">;
  td: CreateClassyIntrinsicComponentFactory<"td">;
  textarea: CreateClassyIntrinsicComponentFactory<"textarea">;
  tfoot: CreateClassyIntrinsicComponentFactory<"tfoot">;
  th: CreateClassyIntrinsicComponentFactory<"th">;
  thead: CreateClassyIntrinsicComponentFactory<"thead">;
  time: CreateClassyIntrinsicComponentFactory<"time">;
  title: CreateClassyIntrinsicComponentFactory<"title">;
  tr: CreateClassyIntrinsicComponentFactory<"tr">;
  track: CreateClassyIntrinsicComponentFactory<"track">;
  u: CreateClassyIntrinsicComponentFactory<"u">;
  ul: CreateClassyIntrinsicComponentFactory<"ul">;
  var: CreateClassyIntrinsicComponentFactory<"var">;
  video: CreateClassyIntrinsicComponentFactory<"video">;
  wbr: CreateClassyIntrinsicComponentFactory<"wbr">;

  /**
   * @desc
   * SVG tags
   */
  circle: CreateClassyIntrinsicComponentFactory<"circle">;
  clipPath: CreateClassyIntrinsicComponentFactory<"clipPath">;
  defs: CreateClassyIntrinsicComponentFactory<"defs">;
  ellipse: CreateClassyIntrinsicComponentFactory<"ellipse">;
  foreignObject: CreateClassyIntrinsicComponentFactory<"foreignObject">;
  g: CreateClassyIntrinsicComponentFactory<"g">;
  image: CreateClassyIntrinsicComponentFactory<"image">;
  line: CreateClassyIntrinsicComponentFactory<"line">;
  linearGradient: CreateClassyIntrinsicComponentFactory<"linearGradient">;
  mask: CreateClassyIntrinsicComponentFactory<"mask">;
  path: CreateClassyIntrinsicComponentFactory<"path">;
  pattern: CreateClassyIntrinsicComponentFactory<"pattern">;
  polygon: CreateClassyIntrinsicComponentFactory<"polygon">;
  polyline: CreateClassyIntrinsicComponentFactory<"polyline">;
  radialGradient: CreateClassyIntrinsicComponentFactory<"radialGradient">;
  rect: CreateClassyIntrinsicComponentFactory<"rect">;
  stop: CreateClassyIntrinsicComponentFactory<"stop">;
  svg: CreateClassyIntrinsicComponentFactory<"svg">;
  text: CreateClassyIntrinsicComponentFactory<"text">;
  tspan: CreateClassyIntrinsicComponentFactory<"tspan">;
}
