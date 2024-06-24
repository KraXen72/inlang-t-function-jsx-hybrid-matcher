# inlang-t-function-jsx-hybrid-matcher
this plugin is an extended version of the official `t-function matcher` plugin, made to also support JSX attributes.  
  
## features/changes
- [x] support several custom translate function names (instead of just `t`)
- [x] add gui configuration in sherlock VSCode extension
- [x] support custom JSX attributes on react components (see screenshot below)
  
![main screenshot](screenshots/screenie1.png)  
  
Feel free to open issues about bugs. Feature requests likely won't be implemeted.  
I wrote this for https://github.com/minibits-cash/minibits_wallet  

## usage
add this to the `modules` array in `project.inlang/settings.json`:
```
https://cdn.jsdelivr.net/gh/KraXen72/inlang-t-function-jsx-hybrid-matcher/dist/index.js
```
pre-jsx version (possibly faster/simpler if you don't need jsx)
```
https://cdn.jsdelivr.net/gh/KraXen72/inlang-t-function-jsx-hybrid-matcher@021003e/dist/index.js
```

you can configure this matcher in Sherlock VSCode extension or in `project.inlang/settings.json`.

## development usaage
dev: use the path to the built index.js:
```
"/media/win/coding/node-deno/inlang-t-function-jsx-hybrid-matcher/dist/index.js"
```
or:
```
"D:/coding/node-deno/inlang-t-function-jsx-hybrid-matcher/dist/index.js"
```