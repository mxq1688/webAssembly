#!/bin/bash

# WebAssembly 编译脚本
# 此脚本用于将 C 代码编译成 WebAssembly

echo "🚀 开始编译 WebAssembly..."

# 检查是否安装了 Emscripten
if ! command -v emcc &> /dev/null; then
    echo "❌ 错误: 未找到 emcc 编译器"
    echo "请先安装 Emscripten SDK:"
    echo "1. 下载: git clone https://github.com/emscripten-core/emsdk.git"
    echo "2. 安装: cd emsdk && ./emsdk install latest && ./emsdk activate latest"
    echo "3. 设置环境: source ./emsdk_env.sh"
    exit 1
fi

# 编译 C 代码为 WebAssembly
echo "📦 正在编译 math.c..."

emcc math.c \
    -o ../math.js \
    -s EXPORTED_FUNCTIONS='["_add","_subtract","_multiply","_divide","_factorial","_fibonacci","_isPrime","_sqrt_approx"]' \
    -s EXPORTED_RUNTIME_METHODS='["ccall","cwrap"]' \
    -s MODULARIZE=1 \
    -s EXPORT_NAME='createMathModule' \
    -O3

# 检查编译是否成功
if [ $? -eq 0 ]; then
    echo "✅ 编译成功！生成文件:"
    echo "   - ../math.wasm (WebAssembly 二进制文件)"
    echo "   - ../math.js (JavaScript 胶水代码)"
    echo ""
    echo "🌐 现在可以启动本地服务器来运行演示:"
    echo "   python3 -m http.server 8000"
    echo "   或者"
    echo "   npx serve ."
    echo ""
    echo "然后在浏览器中访问: http://localhost:8000"
else
    echo "❌ 编译失败！请检查错误信息。"
    exit 1
fi
