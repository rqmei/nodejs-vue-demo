// eslint-disable-next-line import/no-extraneous-dependencies
const Mock = require("mockjs");
// eslint-disable-next-line import/no-extraneous-dependencies
const chalk = require("chalk");
// eslint-disable-next-line import/no-extraneous-dependencies
const chokidar = require("chokidar");
// eslint-disable-next-line import/no-extraneous-dependencies
const bodyParser = require("body-parser");
const path = require("path");

const mockDir = path.join(process.cwd(), "mock");

function parseTime(time, cFormat) {
    const format = cFormat || "{y}-{m}-{d} {h}:{i}:{s}";
    let date;
    if (typeof time === "object") {
        date = time;
    } else {
        if (typeof time === "string") {
            if (/^[0-9]+$/.test(time)) {
                // support "1548221490638"
                // eslint-disable-next-line no-param-reassign,radix
                time = parseInt(time);
            } else {
                // support safari
                // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
                // eslint-disable-next-line no-param-reassign
                time = time.replace(new RegExp(/-/gm), "/");
            }
        }

        if (typeof time === "number" && time.toString().length === 10) {
            // eslint-disable-next-line no-param-reassign
            time *= 1000;
        }
        date = new Date(time);
    }
    const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
    };
    // eslint-disable-next-line camelcase
    const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
        const value = formatObj[key];
        // Note: getDay() returns 0 on Sunday
        if (key === "a") {
            return ["日", "一", "二", "三", "四", "五", "六"][value];
        }
        return value.toString().padStart(2, "0");
    });
    // eslint-disable-next-line camelcase
    return time_str;
}

/**
 * 返回拦截
 * @param url
 * @param type
 * @param respond
 * @returns {{response(*=, *=): void, type: (*|string), url: RegExp}}
 */
const responseFake = (url, type, respond) => {
    let relativeUrl = `${process.env.VUE_APP_BASE_API}${url}`;
    relativeUrl = relativeUrl.replace("//", "/");
    console.log(`注册URL：${relativeUrl}`);
    return {
        url: new RegExp(relativeUrl),
        type: type || "get",
        response(req, res) {
            const mock = Mock.mock(respond instanceof Function ? respond(req, res) : respond);
            const time = parseTime(new Date());
            console.log(``);
            console.log(`---------------------------------`);
            console.log(`请求时间: ${time}`);
            console.log(`请求路径: ${req.path}`);
            console.log(`请求参数: ${JSON.stringify(req.body)}`);
            console.log(`返回数据: ${JSON.stringify(mock)}`);
            res.json(mock);
        }
    };
};

/**
 * 注册路由
 * @param app
 * @returns {{mockStartIndex: number, mockRoutesLength: number}}
 */
function registerRoutes(app) {
    let mockLastIndex;
    const { default: mocks } = require("./index.js");
    const mocksForServer = mocks.map(route => {
        return responseFake(route.url, route.type, route.response);
    });
    for (const mock of mocksForServer) {
        app[mock.type](mock.url, mock.response);
        mockLastIndex = app._router.stack.length;
    }
    const mockRoutesLength = Object.keys(mocksForServer).length;

    // 监听http请求-没试
    app.get("/test", function(rep, res) {
        console.log("进入测试请求...");
        const result = {
            code: 0,
            success: true,
            data: {
                userId: "@id()",
                userName: "@name()",
                realName: "@cname()",
                createTime: "@date()",
                avatar: "@image('200x200','red','#fff','Name')",
                description: "@csentence(3, 5)",
                ip: "@ip()",
                email: "@email()"
            },
            description: "测试"
        };
        res.json(Mock.mock(result));
    });

    return {
        mockRoutesLength,
        mockStartIndex: mockLastIndex - mockRoutesLength
    };
}

function unregisterRoutes() {
    Object.keys(require.cache).forEach(i => {
        if (i.includes(mockDir)) {
            delete require.cache[require.resolve(i)];
        }
    });
}

module.exports = app => {
    console.log("mock系统启动....");
    // es6 polyfill
    // eslint-disable-next-line global-require,import/no-extraneous-dependencies
    require("@babel/register");

    console.log("mock设置内容和URL解析器");
    app.use(bodyParser.json());
    app.use(
        bodyParser.urlencoded({
            extended: true
        })
    );

    console.log("mock解析所有控制器");
    const mockRoutes = registerRoutes(app);
    let { mockRoutesLength } = mockRoutes;
    let { mockStartIndex } = mockRoutes;

    console.log("建立mock热加载，如果系统卡，可以移除");
    // 观察热加mock文件
    chokidar
        .watch(mockDir, {
            ignored: /mock-server/,
            ignoreInitial: true
        })
        .on("all", (event, path) => {
            if (event === "change" || event === "add") {
                try {
                    // remove mock routes stack
                    app._router.stack.splice(mockStartIndex, mockRoutesLength);

                    // clear routes cache
                    unregisterRoutes();

                    const mockRoutes = registerRoutes(app);
                    mockRoutesLength = mockRoutes.mockRoutesLength;
                    mockStartIndex = mockRoutes.mockStartIndex;

                    console.log(chalk.magentaBright(`\n > Mock Server hot reload success! changed  ${path}`));
                } catch (error) {
                    console.log(chalk.redBright(error));
                }
            }
        });
};
