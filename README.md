
# WebAssembly (WASM)

## 🚀 什么是 WebAssembly？

一种在浏览器中运行高性能代码的**二进制格式**，支持多种编程语言编译。可以达到接近原生的执行速度。

## 💻 支持的语言

### ✅ 成熟推荐（生产可用）
- **C/C++** - [Emscripten](https://emscripten.org/) 最成熟，生态完善
- **Rust** - 内存安全，`wasm-pack` + `wasm-bindgen` 工具链完善
- **AssemblyScript** - TypeScript 语法，前端开发者友好

### 🔸 可用（有一定限制）
- **Go** - 原生支持但 wasm 体积大（包含运行时），互操作性弱
- **C#/.NET** - [Blazor WebAssembly](https://dotnet.microsoft.com/apps/aspnet/web-apps/blazor)
- **Qt (C++)** - [Qt for WebAssembly](https://doc.qt.io/qt-6/wasm.html) 适合移植 Qt 桌面应用，体积较大
- **Python** - [Pyodide](https://pyodide.org/) 可在浏览器运行 Python + 科学计算库
- **Kotlin** - [Kotlin/Wasm](https://kotlinlang.org/docs/wasm-overview.html) 实验性功能转稳定
- **Zig** - 现代系统编程语言，对 WebAssembly 支持良好

### 🔹 实验性（不建议生产）
- **Swift** - [SwiftWasm](https://swiftwasm.org/)
- **Dart** - Flutter Web 使用
- 其他：Java (TeaVM/CheerpJ)、PHP、Ruby、Lua、Haskell 等

## 💡 快速选择指南

| 场景 | 推荐语言 | 理由 |
|------|---------|------|
| **极致性能** | C/C++ / Rust | 最小体积，最快速度 |
| **前端开发者** | AssemblyScript | 无需学新语言，上手快 |
| **科学计算/数据分析** | Python (Pyodide) | 可用 NumPy、Pandas 等库 |
| **游戏开发** | C++ / Rust | Unity/Unreal 都可导出 wasm |
| **企业级应用** | Blazor (C#) | 与 .NET 生态集成 |
| **Qt 应用移植** | Qt (C++) | 将桌面应用移植到 Web |

## 📊 对比参考

| 语言 | 体积 | 性能 | 学习成本 | 生态 |
|------|------|------|---------|------|
| C/C++ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Rust | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐ |
| AssemblyScript | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| Go | ⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |

## 🔗 资源链接

### 官方文档
- [WebAssembly 官网](https://webassembly.org/)
- [MDN WebAssembly 指南](https://developer.mozilla.org/zh-CN/docs/WebAssembly)

### 工具链
- [Emscripten](https://emscripten.org/) - C/C++ 编译器
- [wasm-pack](https://rustwasm.github.io/wasm-pack/) - Rust 工具链
- [AssemblyScript](https://www.assemblyscript.org/) - TypeScript-like 语言
- [Qt for WebAssembly](https://doc.qt.io/qt-6/wasm.html) - Qt 框架 WASM 支持

### 实战案例
- [FFmpeg.wasm](https://github.com/ffmpegwasm/ffmpeg.wasm) - 浏览器视频处理
- [Photon](https://github.com/silvia-odwyer/photon) - Rust 图像处理库
- [Squoosh](https://squoosh.app/) - Google 图片压缩工具

## 🎮 本地 Demo

### AssemblyScript Demo
完整的 AssemblyScript 示例项目，包含：
- ✨ 数学计算（斐波那契、阶乘）
- 📊 数组操作（排序、求和、查找）
- 🎯 质数检测
- ⚡ 性能对比测试

**位置**: `assemblyscript-demo/`

**快速开始**:
```bash
cd assemblyscript-demo
./start.sh
```

查看详情：[AssemblyScript Demo README](./assemblyscript-demo/README.md)

### C/C++ Demo  
基于 Emscripten 的示例项目（已有）

**位置**: `demo/`

