import Mock from "mockjs";

Mock.mock("/getMovie", "get", {
    code: 200,
    msg: "响应成功",
    "data|40-60": [
        {
            name: "@name()",
            direct: "@name(" + true + ")",
            performer: "@name(" + true + ")",
            time: "@date('yyyy')",
            type: /[\u4e00-\u9fa5]{10,40}/,
            score: /\d(\.\d)?/,
            cinecism: "@ctitle(20,40)",
            image_url: "@image()"
        }
    ]
});
