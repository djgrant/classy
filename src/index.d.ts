type TwClassname<T extends string> =
  | T
  | undefined
  | null
  | { [key in T]?: boolean }
  | TwClassname<T>[];

type TwClassnamesArgs = TwClassname<string> | TwClassname<string>[];

export const ifElse: <T = TwClassnamesArgs>(
  target: any,
  left: T,
  right?: T
) => T;

export const switchcase: <T = TwClassnamesArgs>(
  target: any,
  matcher: Record<string, T>
) => T;

declare const tw: Tw;

export interface Tw extends TwTags {}
export interface Tw {
  <Tag extends React.ComponentType<any>>(
    tag: Tag
  ): CreateTwExtrinsicComponentFactory<Tag>;

  <Tag extends keyof JSX.IntrinsicElements>(
    tag: Tag
  ): CreateTwIntrisicComponentFactory<Tag>;

  classnames: (...args: TwClassnamesArgs[]) => string;
}

type Args<Props> = TwClassnamesArgs[] | [TwMapper<Props>];
type TwMapper<Props> = (props: Props) => TwClassnamesArgs;
type TwComponent<TProps> = React.ForwardRefExoticComponent<TProps>;

interface TwComponentFactory<Props> {
  <ExtraProps = {}>(...args: Args<Props & ExtraProps>): TwComponent<
    Props & ExtraProps
  >;
}

type CreateTwExtrinsicComponentFactory<
  Tag extends React.ComponentType<any>
> = TwComponentFactory<PropsOf<Tag>>;

type CreateTwIntrisicComponentFactory<
  Tag extends keyof JSX.IntrinsicElements
> = TwComponentFactory<JSX.IntrinsicElements[Tag]>;

// :) https://github.com/emotion-js/emotion/blob/master/packages/styled-base/types/helper.d.ts
type PropsOf<
  C extends keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>
> = JSX.LibraryManagedAttributes<C, React.ComponentPropsWithRef<C>>;

// :) https://github.com/emotion-js/emotion/blob/master/packages/styled/types/index.d.ts
interface TwTags {
  a: CreateTwIntrisicComponentFactory<"a">;
  abbr: CreateTwIntrisicComponentFactory<"abbr">;
  address: CreateTwIntrisicComponentFactory<"address">;
  area: CreateTwIntrisicComponentFactory<"area">;
  article: CreateTwIntrisicComponentFactory<"article">;
  aside: CreateTwIntrisicComponentFactory<"aside">;
  audio: CreateTwIntrisicComponentFactory<"audio">;
  b: CreateTwIntrisicComponentFactory<"b">;
  base: CreateTwIntrisicComponentFactory<"base">;
  bdi: CreateTwIntrisicComponentFactory<"bdi">;
  bdo: CreateTwIntrisicComponentFactory<"bdo">;
  big: CreateTwIntrisicComponentFactory<"big">;
  blockquote: CreateTwIntrisicComponentFactory<"blockquote">;
  body: CreateTwIntrisicComponentFactory<"body">;
  br: CreateTwIntrisicComponentFactory<"br">;
  button: CreateTwIntrisicComponentFactory<"button">;
  canvas: CreateTwIntrisicComponentFactory<"canvas">;
  caption: CreateTwIntrisicComponentFactory<"caption">;
  cite: CreateTwIntrisicComponentFactory<"cite">;
  code: CreateTwIntrisicComponentFactory<"code">;
  col: CreateTwIntrisicComponentFactory<"col">;
  colgroup: CreateTwIntrisicComponentFactory<"colgroup">;
  data: CreateTwIntrisicComponentFactory<"data">;
  datalist: CreateTwIntrisicComponentFactory<"datalist">;
  dd: CreateTwIntrisicComponentFactory<"dd">;
  del: CreateTwIntrisicComponentFactory<"del">;
  details: CreateTwIntrisicComponentFactory<"details">;
  dfn: CreateTwIntrisicComponentFactory<"dfn">;
  dialog: CreateTwIntrisicComponentFactory<"dialog">;
  div: CreateTwIntrisicComponentFactory<"div">;
  dl: CreateTwIntrisicComponentFactory<"dl">;
  dt: CreateTwIntrisicComponentFactory<"dt">;
  em: CreateTwIntrisicComponentFactory<"em">;
  embed: CreateTwIntrisicComponentFactory<"embed">;
  fieldset: CreateTwIntrisicComponentFactory<"fieldset">;
  figcaption: CreateTwIntrisicComponentFactory<"figcaption">;
  figure: CreateTwIntrisicComponentFactory<"figure">;
  footer: CreateTwIntrisicComponentFactory<"footer">;
  form: CreateTwIntrisicComponentFactory<"form">;
  h1: CreateTwIntrisicComponentFactory<"h1">;
  h2: CreateTwIntrisicComponentFactory<"h2">;
  h3: CreateTwIntrisicComponentFactory<"h3">;
  h4: CreateTwIntrisicComponentFactory<"h4">;
  h5: CreateTwIntrisicComponentFactory<"h5">;
  h6: CreateTwIntrisicComponentFactory<"h6">;
  head: CreateTwIntrisicComponentFactory<"head">;
  header: CreateTwIntrisicComponentFactory<"header">;
  hgroup: CreateTwIntrisicComponentFactory<"hgroup">;
  hr: CreateTwIntrisicComponentFactory<"hr">;
  html: CreateTwIntrisicComponentFactory<"html">;
  i: CreateTwIntrisicComponentFactory<"i">;
  iframe: CreateTwIntrisicComponentFactory<"iframe">;
  img: CreateTwIntrisicComponentFactory<"img">;
  input: CreateTwIntrisicComponentFactory<"input">;
  ins: CreateTwIntrisicComponentFactory<"ins">;
  kbd: CreateTwIntrisicComponentFactory<"kbd">;
  keygen: CreateTwIntrisicComponentFactory<"keygen">;
  label: CreateTwIntrisicComponentFactory<"label">;
  legend: CreateTwIntrisicComponentFactory<"legend">;
  li: CreateTwIntrisicComponentFactory<"li">;
  link: CreateTwIntrisicComponentFactory<"link">;
  main: CreateTwIntrisicComponentFactory<"main">;
  map: CreateTwIntrisicComponentFactory<"map">;
  mark: CreateTwIntrisicComponentFactory<"mark">;
  /**
   * @desc
   * marquee tag is not supported by @types/react
   */
  // 'marquee': CreateTwIntrisicComponentFactory<'marquee';
  menu: CreateTwIntrisicComponentFactory<"menu">;
  menuitem: CreateTwIntrisicComponentFactory<"menuitem">;
  meta: CreateTwIntrisicComponentFactory<"meta">;
  meter: CreateTwIntrisicComponentFactory<"meter">;
  nav: CreateTwIntrisicComponentFactory<"nav">;
  noscript: CreateTwIntrisicComponentFactory<"noscript">;
  object: CreateTwIntrisicComponentFactory<"object">;
  ol: CreateTwIntrisicComponentFactory<"ol">;
  optgroup: CreateTwIntrisicComponentFactory<"optgroup">;
  option: CreateTwIntrisicComponentFactory<"option">;
  output: CreateTwIntrisicComponentFactory<"output">;
  p: CreateTwIntrisicComponentFactory<"p">;
  param: CreateTwIntrisicComponentFactory<"param">;
  picture: CreateTwIntrisicComponentFactory<"picture">;
  pre: CreateTwIntrisicComponentFactory<"pre">;
  progress: CreateTwIntrisicComponentFactory<"progress">;
  q: CreateTwIntrisicComponentFactory<"q">;
  rp: CreateTwIntrisicComponentFactory<"rp">;
  rt: CreateTwIntrisicComponentFactory<"rt">;
  ruby: CreateTwIntrisicComponentFactory<"ruby">;
  s: CreateTwIntrisicComponentFactory<"s">;
  samp: CreateTwIntrisicComponentFactory<"samp">;
  script: CreateTwIntrisicComponentFactory<"script">;
  section: CreateTwIntrisicComponentFactory<"section">;
  select: CreateTwIntrisicComponentFactory<"select">;
  small: CreateTwIntrisicComponentFactory<"small">;
  source: CreateTwIntrisicComponentFactory<"source">;
  span: CreateTwIntrisicComponentFactory<"span">;
  strong: CreateTwIntrisicComponentFactory<"strong">;
  style: CreateTwIntrisicComponentFactory<"style">;
  sub: CreateTwIntrisicComponentFactory<"sub">;
  summary: CreateTwIntrisicComponentFactory<"summary">;
  sup: CreateTwIntrisicComponentFactory<"sup">;
  table: CreateTwIntrisicComponentFactory<"table">;
  tbody: CreateTwIntrisicComponentFactory<"tbody">;
  td: CreateTwIntrisicComponentFactory<"td">;
  textarea: CreateTwIntrisicComponentFactory<"textarea">;
  tfoot: CreateTwIntrisicComponentFactory<"tfoot">;
  th: CreateTwIntrisicComponentFactory<"th">;
  thead: CreateTwIntrisicComponentFactory<"thead">;
  time: CreateTwIntrisicComponentFactory<"time">;
  title: CreateTwIntrisicComponentFactory<"title">;
  tr: CreateTwIntrisicComponentFactory<"tr">;
  track: CreateTwIntrisicComponentFactory<"track">;
  u: CreateTwIntrisicComponentFactory<"u">;
  ul: CreateTwIntrisicComponentFactory<"ul">;
  var: CreateTwIntrisicComponentFactory<"var">;
  video: CreateTwIntrisicComponentFactory<"video">;
  wbr: CreateTwIntrisicComponentFactory<"wbr">;

  /**
   * @desc
   * SVG tags
   */
  circle: CreateTwIntrisicComponentFactory<"circle">;
  clipPath: CreateTwIntrisicComponentFactory<"clipPath">;
  defs: CreateTwIntrisicComponentFactory<"defs">;
  ellipse: CreateTwIntrisicComponentFactory<"ellipse">;
  foreignObject: CreateTwIntrisicComponentFactory<"foreignObject">;
  g: CreateTwIntrisicComponentFactory<"g">;
  image: CreateTwIntrisicComponentFactory<"image">;
  line: CreateTwIntrisicComponentFactory<"line">;
  linearGradient: CreateTwIntrisicComponentFactory<"linearGradient">;
  mask: CreateTwIntrisicComponentFactory<"mask">;
  path: CreateTwIntrisicComponentFactory<"path">;
  pattern: CreateTwIntrisicComponentFactory<"pattern">;
  polygon: CreateTwIntrisicComponentFactory<"polygon">;
  polyline: CreateTwIntrisicComponentFactory<"polyline">;
  radialGradient: CreateTwIntrisicComponentFactory<"radialGradient">;
  rect: CreateTwIntrisicComponentFactory<"rect">;
  stop: CreateTwIntrisicComponentFactory<"stop">;
  svg: CreateTwIntrisicComponentFactory<"svg">;
  text: CreateTwIntrisicComponentFactory<"text">;
  tspan: CreateTwIntrisicComponentFactory<"tspan">;
}
