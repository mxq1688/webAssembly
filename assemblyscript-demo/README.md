# AssemblyScript WebAssembly Demo

这是一个完整的 **AssemblyScript** 示例项目，展示如何使用 TypeScript 语法编写 WebAssembly 模块。

## 🌟 特性

- ✅ **TypeScript 语法** - 前端开发者友好，无需学习新语言
- ⚡ **高性能计算** - 接近原生代码的执行速度
- 📊 **丰富示例** - 包含数学计算、数组操作、性能对比等
- 🎨 **现代 UI** - 响应式设计，交互友好

## 📁 项目结构

```
assemblyscript-demo/
├── assembly/          # AssemblyScript 源代码
│   └── index.ts      # 主要逻辑
├── build/            # 编译输出目录
│   └── optimized.wasm # 编译后的 WASM 文件
├── index.html        # 演示页面
├── index.js          # JavaScript 接口
├── package.json      # 项目配置
└── asconfig.json     # AssemblyScript 配置
```

## 🚀 快速开始

### 1️⃣ 安装依赖

```bash
npm install
```

### 2️⃣ 编译 AssemblyScript

```bash
npm run build
```

这会生成：
- `build/optimized.wasm` - 优化后的 WebAssembly 二进制文件
- `build/optimized.wat` - 可读的 WebAssembly 文本格式

### 3️⃣ 启动本地服务器

```bash
npm run serve
```

然后在浏览器中打开：`http://localhost:8080`

## 📚 示例功能

### 1. 基础数学计算
- 加法 `add(a, b)`
- 乘法 `multiply(a, b)`

### 2. 斐波那契数列
- 递归实现 `fibonacci(n)`
- 性能测试

### 3. 阶乘计算
- 迭代实现 `factorial(n)`

### 4. 数组操作
- 求和 `sumArray(arr)`
- 最大值 `findMax(arr)`
- 冒泡排序 `bubbleSort(arr)`

### 5. 质数计算
- 判断质数 `isPrime(n)`
- 计数质数 `countPrimes(max)`

### 6. 性能对比
- WebAssembly vs 原生 JavaScript
- 实时显示性能提升倍数

## 💻 代码示例

### AssemblyScript 代码

```typescript
// assembly/index.ts
export function add(a: i32, b: i32): i32 {
  return a + b;
}

export function fibonacci(n: i32): i32 {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}
```

### JavaScript 调用

```javascript
// 加载 WASM 模块
const response = await fetch('build/optimized.wasm');
const bytes = await response.arrayBuffer();
const { instance } = await WebAssembly.instantiate(bytes);

// 调用导出的函数
const result = instance.exports.add(42, 8);
console.log(result); // 50
```

## 🔧 开发命令

| 命令 | 说明 |
|------|------|
| `npm run build` | 编译 AssemblyScript（优化版）|
| `npm run asbuild:untouched` | 编译未优化版本 |
| `npm run asbuild:optimized` | 编译优化版本 |
| `npm run serve` | 启动开发服务器 |

## 📊 性能对比

在计算质数等密集计算场景下，WebAssembly 通常比 JavaScript 快 **2-5 倍**。

示例测试（计算 1-10000 的质数）：
- JavaScript: ~45ms
- WebAssembly: ~15ms
- **性能提升**: 3x

## 🎯 AssemblyScript 特点

### ✅ 优点
1. **TypeScript 语法** - 学习成本低
2. **类型安全** - 编译时检查
3. **性能优秀** - 接近 C/Rust
4. **工具完善** - npm 生态集成

### ⚠️ 注意事项
1. **内存管理** - 需要理解 WASM 内存模型
2. **类型限制** - 仅支持 WASM 类型（i32, i64, f32, f64）
3. **生态较小** - 库不如 Rust/C++ 丰富

## 📖 类型对照表

| AssemblyScript | JavaScript | WASM |
|----------------|------------|------|
| `i32` | `number` | i32 |
| `i64` | `bigint` | i64 |
| `f32` | `number` | f32 |
| `f64` | `number` | f64 |
| `bool` | `boolean` | i32 |
| `Int32Array` | `Int32Array` | Memory |

## 🔗 资源链接

- [AssemblyScript 官网](https://www.assemblyscript.org/)
- [AssemblyScript 文档](https://www.assemblyscript.org/introduction.html)
- [WebAssembly 官网](https://webassembly.org/)
- [示例代码仓库](https://github.com/AssemblyScript/examples)

## 🛠️ 故障排查

### WASM 加载失败
- 确保使用 HTTP 服务器（不能直接打开 HTML 文件）
- 检查浏览器控制台错误信息

### 编译错误
```bash
# 清理并重新编译
rm -rf build/
npm run build
```

### CORS 错误
- 使用提供的 `npm run serve` 命令
- 或配置其他支持 WASM MIME 类型的服务器

## 📝 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

