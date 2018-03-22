
### npm install
### npm run dev

###项目要是运行不出来的话
 在根目录建一个.babelrc文件，然后降下面的代码粘贴进去
 {
      "presets": [
        "react",
        [ "es2015", { "modules": false}],
        "stage-0"
      ],
      "plugins": [
        "transform-runtime",
        "transform-decorators-legacy"
      ]
    }

