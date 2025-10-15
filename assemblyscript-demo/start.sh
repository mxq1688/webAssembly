#!/bin/bash

# AssemblyScript Demo 启动脚本

echo "🚀 AssemblyScript WebAssembly Demo"
echo "=================================="
echo ""

# 检查是否安装了 Node.js
if ! command -v node &> /dev/null; then
    echo "❌ 错误: 未安装 Node.js"
    echo "请访问 https://nodejs.org/ 下载安装"
    exit 1
fi

echo "✅ Node.js 版本: $(node --version)"
echo ""

# 检查是否安装了依赖
if [ ! -d "node_modules" ]; then
    echo "📦 安装依赖..."
    npm install
    echo ""
fi

# 编译 AssemblyScript
echo "🔨 编译 AssemblyScript..."
npm run build
echo ""

# 检查编译是否成功
if [ ! -f "build/optimized.wasm" ]; then
    echo "❌ 编译失败"
    exit 1
fi

echo "✅ 编译成功！"
echo ""

# 显示文件大小
WASM_SIZE=$(du -h build/optimized.wasm | cut -f1)
echo "📊 WASM 文件大小: $WASM_SIZE"
echo ""

# 启动服务器
echo "🌐 启动开发服务器..."
echo "📍 访问地址: http://localhost:8080"
echo ""
echo "按 Ctrl+C 停止服务器"
echo ""

npm run serve

