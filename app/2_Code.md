# Code

Inline `code`

Block code "fences"

``` pug
[linenum=1][renderer=htmlparse]
div
  h2 Hola
  h3 mundo!
```

``` sass
p, div {
  font-size: 2em;
  a { font-weight: bold; }
}
```

Syntax highlighting

``` js
[linenum=2]
var foo = function (bar) {
  return bar++;
};

console.log(foo(5));
```

# Tables

| Option | Description |
| ------ | ----------- |
| data   | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default. |
| ext    | extension to be used for dest files. |