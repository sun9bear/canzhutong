# 残助通

查得清政策，问得清权利

中国残疾人法律法规与政策查询、智能咨询工具。支持大字、高对比等无障碍能力。

## 技术栈

- Vite
- TanStack Start (React Router / Start)

## 本地运行

```bash
npm i
npm run dev
```

默认开发地址: http://localhost:8080

## 说明

本项目由 Grok Build 迁移而来。

**免责声明:** 本应用提供的政策解读与问答仅供参考，不构成官方法律意见或正式法律援助。具体权利义务请以主管部门发布的现行法规、政策文件及专业法律服务为准。

## WeChat mini-program
See apps/mp/README.md for uni-app shell, shared policy JSON, and DevTools preview.
Root scripts: mp:data, mp:install, mp:dev, mp:build.
Policy catalog is exported from src/data to public/data/policies.json for the MP to fetch.

## 许可证

本仓库中由项目作者拥有权利的源代码采用 [MIT License](LICENSE)。第三方依赖、品牌素材和政策原文仍遵循各自的许可或使用条款；使用政策信息时请核对来源链接和最新官方文本。
