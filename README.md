# nodejs-vue-demo
项目创建及架构

## 营销系统-PC管理端 - 启用

项目描述：营销系统-PC管理端是包含创建并发行劵功能、以及活动优惠功能、发票功能的系统
      
项目注意事项：


##  一、环境配置

### 1.1 环境文件说明
```
  .env 总环境配置, 会和其它环境文件进行合并, 相同配置以环境配置为准
  .env.development    开发环境             不需要代理可以直接访问
  .env.test           测试环境             需要代理才可以访问
  .env.test2          第二套测试环境        不需要代理可以直接访问
  .env.pre            预发布               需要代理才可以访问
  .env.production     生产环境             不需要代理可以直接访问
  
  如果是本地特殊的配置或自己的配置, 请不要在这几个环境进行修改,  
  复制一个文件, 如.env.development.local 这个文件不会上传到GIT, 放心使用，这个是我们最安全的使用配置方式

```

### 1.2 项目安装依赖, 第一次项目时必须安装
```
    需要的环境 node npm/yarn nrm (私服)
    node - v  查看版本
    npm -v   查看版本
    

    A.scss环境安装 - 项目里面css 基本使用都是scss(已经安装过不需要)

           http://rubyinstaller.org/downloads/ 
           下载WITHOUT DEVKIT版本 如Ruby 2.4.4-2 (x64) 
           一路点击安装
           打开cmd，输入gem install sass就可以安装SASS了
           如果下载慢, 可以切换下载源, 再次安装
           依次输入：
           gem sources –r http://rubygems.org/
           gem sources –a http://ruby.taobao.org/
           gem sources –l

          然后在webstorm里可以配置识别目录了
          settings > tools > File Watcher > scss > 编辑 > Program 地址为:安装目录\bin\sass.bat 如D:\app\Ruby24-x64\bin\sass.bat

    B.  使用包简易管理 - 替比私服 (我们自己的插件包)
        
         使用包简易管理 - 替比私服
             1.npm install -g nrm
             2.nrm ls 查看数据
             3.nrm add tibi http://registry.npm.tb.com
             4.nrm use tibi
         
    C.基本依赖安装 (必备技能)
          npm install   或者   yarn install

     
    D.如果安装失败可以尝试
       
       清空缓存
       第一步：npm指令清除npm缓存 
              npm cache clean --force
                    
       第二步：删除node_module包        
             
```


### 1.3 本地调试
```
    方式一： 命令启动
          yarn run dev | yarn dev | npm run dev
          启动时可临时增加参数 和.env.development中同样 
          --host -port --open

    方式二：编译器的启动脚本配置 e.g webstorm 可以配置 [Add Configuration]运行脚本
   

    vue插件vue-tools 支持chrome
    [vue-tool](doc/vuetools.crx)
    拖到浏览器添加后, 重启后即可使用
```

### 1.4 打包各个环境 （开发、测试、预发布、生产包）
```

   如果使用的是npm, yarn换成npm即可
   yarn run build
   要打指定环境的包时, 使用 --mode test(环境名称), 如 // 已失效
   # yarn run build --mode test

   新的环境打钱 
   yarn run dev-build    打包开发环境

   yarn run test-build     打包第一套测试环境

   yarn run test2-build    打包第二套测试环境

   yarn run pre-build     打包预发布环境 

   yarn run prod-build    打包生产环境

```


### 1.5 其他运行命令
```
    yarn/npm run test:unit   运行测试
   
    yarn/npm run test:e2e  运行界面测试

    yarn/npm run  lint   运行eslint 代码检查

    yarn/npm run fix-lint   运行eslint 代码检查并自动修复

    yarn/npm run fix-memory-limit  修改内存限制

```

### 1.6 运维专属配置
```
  
  export NODE_OPTIONS=--max_old_space_size=10240     1.设置运行空间

  rm -f package-lock.json              移除package-lock.json文件
 
  npm install --unsafe-perm=true       安装第三方


   yarn/npm run dev-build    打包开发环境

   yarn/npm run test-build     打包第一套测试环境

   yarn/npm run test2-build    打包第二套测试环境

   yarn/npm run pre-build     打包预发布环境 

   yarn/npm run prod-build    打包生产环境

```

##  二、项目规范

### 2.1 命名规范
请参考doc目录下前端编写规范文档[前端编码规范](./doc/前端编码规范.md)


### 2.2 项目结构说明
请参考doc目录下项目结构说明文档[项目结构说明](./doc/项目结构说明.md)



### 2.3 scss样式使用
```
   单个vue组件要引用自己的样式时, 在vue中写入如下的话
   <style lang="scss">
        @import "about.scss";
   </style>
   
   如果是全局样式, 则在main.js中用import或require引入, 如import "./assets/css/base.scss";
   
```


### 2.4 模拟数据jsonserver
```
   先找一个你想存数据的地方, 我的: E:\project\nodejs\jsonserver
   打开CMD或powershell
   npm init -y 初始化项目
   npm install json-server
   编辑package.json 在script下增加此行 "start": "json-server --port 4000 --watch db.json"
   建立数据目录, 为json结构如 {news:[{title:"新闻1", "readCount": 343}]} 注:文件保存是保存为utf-8
   npm start 启动就可以了, 看控制台, 复制一个URL试试, 支持增删改查

```



##  三、日志






