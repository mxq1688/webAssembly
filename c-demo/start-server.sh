#!/bin/bash

echo "🌐 启动本地服务器..."
echo ""

# 获取脚本所在目录
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

echo "📁 工作目录: $SCRIPT_DIR"
echo ""

# 检查必要文件是否存在
if [ ! -f "index.html" ]; then
    echo "❌ 错误: 找不到 index.html 文件"
    echo "请确保在 demo 目录中运行此脚本"
    exit 1
fi

# 检查端口是否被占用
if lsof -Pi :8000 -sTCP:LISTEN -t >/dev/null 2>&1; then
    echo "⚠️  端口 8000 已被占用，正在停止..."
    lsof -ti:8000 | xargs kill -9 2>/dev/null
    sleep 1
    echo "✅ 端口已释放"
    echo ""
fi

# 检查 Python3 是否可用
if command -v python3 &> /dev/null; then
    echo "✅ 使用 Python3 启动服务器"
    echo "🌐 访问地址: http://localhost:8000"
    echo "🛑 按 Ctrl+C 停止服务器"
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    python3 -m http.server 8000
elif command -v python &> /dev/null; then
    echo "✅ 使用 Python 启动服务器"
    echo "🌐 访问地址: http://localhost:8000"
    echo "🛑 按 Ctrl+C 停止服务器"
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    python -m SimpleHTTPServer 8000
else
    echo "❌ 未找到 Python"
    echo ""
    echo "请安装 Python 或使用其他方式启动 HTTP 服务器："
    echo "  - npx serve ."
    echo "  - php -S localhost:8000"
    exit 1
fi
