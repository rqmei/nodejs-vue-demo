const tokens = {
    admin: {
        token: "Tibi-Token"
    }
};

const users = {
    "Tibi-Token": {
        roles: ["super_admin"],
        introduction: "超级管理员",
        avatar: "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
        name: "超级管理员"
    }
};

export default [
    // user login
    {
        url: "/login",
        type: "post",
        response: config => {
            const { userName, passwd } = config.body;
            console.log(`登录用户${userName}, 密码${passwd}`);

            return {
                code: 0,
                description: "用户登录1",
                success: true,
                data: {
                    userName: "admin",
                    realName: "admin",
                    nickName: "admin",
                    token: "@string('lower', 32)",
                    avatar: "@image('200x200','red','#fff','Name')",
                    roles: ["system_role_admin"],
                    permissions: ["super_admin"]
                }
            };
        }
    },

    // user logout
    {
        url: "/logout",
        type: "post",
        response: _ => {
            return {
                code: 20000,
                data: "success"
            };
        }
    }
];
