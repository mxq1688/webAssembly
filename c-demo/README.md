# 🚀 WebAssembly 数学计算演示

这是一个完整的 WebAssembly 演示项目，展示了如何使用 C 语言编写代码，编译成 WebAssembly，并在网页中调用。

## 📁 项目结构

```
demo/
├── index.html          # 主页面（用户界面）
├── wasm-interface.js   # JavaScript 接口代码
├── README.md           # 说明文档
├── math.wasm          # 编译生成的 WebAssembly 二进制文件
├── math.js            # Emscripten 生成的 JavaScript 胶水代码
└── wasm/              # WebAssembly 源代码目录
    ├── math.c          # C 语言源代码（数学计算函数）
    ├── compile.sh      # 编译脚本
    └── start-server.sh # 服务器启动脚本
```

## 🛠️ 功能特性

### 数学计算功能
- ➕ **基础运算**: 加法、减法、乘法、除法
- 📊 **阶乘计算**: 支持 0-12 的阶乘计算
- 🌀 **斐波那契数列**: 计算指定位置的斐波那契数
- 🔍 **质数检测**: 判断数字是否为质数
- √ **平方根计算**: 使用牛顿法近似计算平方根
- ⚡ **性能测试**: WebAssembly vs JavaScript 性能对比

### 界面特性
- 🎨 现代化响应式设计
- 📱 移动端友好
- 🔄 实时计算结果显示
- 📈 性能统计图表
- ⏱️ 计算时间测量

## 🚀 快速开始

### 1. 安装 Emscripten SDK

```bash
# 克隆 Emscripten SDK
git clone https://github.com/emscripten-core/emsdk.git
cd emsdk

# 安装并激活最新版本
./emsdk install latest
./emsdk activate latest

# 设置环境变量
source ./emsdk_env.sh
```

### 2. 编译 WebAssembly

```bash
# 进入 wasm 目录
cd demo/wasm

# 运行编译脚本
./compile.sh
```

### 3. 启动本地服务器

```bash
# 方法 1：使用启动脚本（推荐，从 wasm 目录）
./start-server.sh

# 方法 2：手动启动（从 demo 目录）
cd ..
python3 -m http.server 8000

# 方法 3：使用 Node.js（从 demo 目录）
cd ..
npx serve .
```

### 4. 访问演示

在浏览器中打开: `http://localhost:8000`

> 💡 **提示**: 必须通过 HTTP 服务器访问，直接打开 HTML 文件会因为 CORS 策略而无法加载 WebAssembly 模块。

## 📝 详细说明

### C 语言函数

`math.c` 文件包含以下函数：

```c
int add(int a, int b)                    // 加法
int subtract(int a, int b)               // 减法
int multiply(int a, int b)               // 乘法
int divide(int a, int b)                 // 除法
int factorial(int n)                     // 阶乘
int fibonacci(int n)                     // 斐波那契
int isPrime(int n)                       // 质数检测
double sqrt_approx(double x)             // 平方根近似
```

### 编译参数说明

```bash
emcc math.c \
    -o math.js \                         # 输出文件名（同时生成 math.wasm）
    -s EXPORTED_FUNCTIONS='[...]' \      # 导出的函数列表
    -s EXPORTED_RUNTIME_METHODS='[...]' \ # 导出的运行时方法（ccall, cwrap）
    -s MODULARIZE=1 \                    # 生成模块化代码
    -s EXPORT_NAME='createMathModule' \  # 导出的模块名
    -O3                                  # 优化级别（最高性能）
```

### JavaScript 接口

`wasm-interface.js` 提供了：

- 🔄 WebAssembly 模块加载
- 🎯 函数调用封装
- 📊 性能测试工具
- 🖥️ UI 交互处理
- 📈 结果显示管理

## 🔧 自定义开发

### 添加新函数

1. 在 `math.c` 中添加新的 C 函数
2. 在 `compile.sh` 的 `EXPORTED_FUNCTIONS` 中添加函数名（前缀 `_`）
3. 在 `wasm-interface.js` 中添加 JavaScript 封装
4. 在 `index.html` 中添加 UI 界面

### 修改编译选项

编辑 `compile.sh` 文件中的 `emcc` 命令参数：

- `-O0`: 无优化（调试用）
- `-O1`: 基本优化
- `-O2`: 标准优化
- `-O3`: 最高优化
- `-Os`: 大小优化

## 📊 性能对比

该演示包含 WebAssembly 与 JavaScript 的性能对比测试：

- 🚀 **WebAssembly**: 接近原生性能
- 🐌 **JavaScript**: 解释执行
- 📈 **提升倍数**: 通常 2-10x 性能提升

## 🐛 常见问题

### Q: 编译失败怎么办？
A: 确保已正确安装 Emscripten SDK 并设置环境变量。

### Q: 浏览器显示 CORS 错误？
A: 必须通过 HTTP 服务器访问，不能直接打开 HTML 文件。

### Q: WebAssembly 模块加载失败？
A: 检查 `math.wasm` 文件是否存在，服务器是否正确配置 WASM MIME 类型。

### Q: 函数调用出错？
A: 确保函数名在 `EXPORTED_FUNCTIONS` 中正确导出。

## 📚 学习资源

- [WebAssembly 官方文档](https://webassembly.org/)
- [Emscripten 文档](https://emscripten.org/docs/)
- [MDN WebAssembly 指南](https://developer.mozilla.org/en-US/docs/WebAssembly)

## 📄 许可证

MIT License - 可自由使用和修改。

---

🎉 **享受 WebAssembly 的强大性能吧！**
