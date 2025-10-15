// WebAssembly 模块实例
let wasmModule = null;

// 加载 WebAssembly 模块
async function loadWasm() {
  try {
    const response = await fetch('build/optimized.wasm');
    const bytes = await response.arrayBuffer();
    const { instance } = await WebAssembly.instantiate(bytes, {
      env: {
        abort: (msg, file, line, column) => {
          console.error(`AssemblyScript abort: ${msg} at ${file}:${line}:${column}`);
        }
      }
    });
    
    wasmModule = instance.exports;
    updateStatus('ready', '✅ WebAssembly 模块加载成功！');
    console.log('WASM exports:', Object.keys(wasmModule));
  } catch (error) {
    updateStatus('error', '❌ 加载失败: ' + error.message);
    console.error('Failed to load WASM:', error);
  }
}

// 更新状态显示
function updateStatus(state, message) {
  const statusEl = document.getElementById('status');
  statusEl.className = `status ${state}`;
  statusEl.innerHTML = message;
}

// 基础数学计算
function runMath() {
  if (!wasmModule) return;
  
  const a = parseInt(document.getElementById('mathA').value);
  const b = parseInt(document.getElementById('mathB').value);
  
  const sum = wasmModule.add(a, b);
  const product = wasmModule.multiply(a, b);
  
  document.getElementById('mathResult').innerHTML = `
    <strong>加法:</strong> ${a} + ${b} = <code>${sum}</code><br>
    <strong>乘法:</strong> ${a} × ${b} = <code>${product}</code>
  `;
}

// 斐波那契计算
function runFibonacci() {
  if (!wasmModule) return;
  
  const n = parseInt(document.getElementById('fibN').value);
  const start = performance.now();
  const result = wasmModule.fibonacci(n);
  const time = (performance.now() - start).toFixed(3);
  
  document.getElementById('fibResult').innerHTML = `
    <strong>第 ${n} 项:</strong> <code>${result}</code><br>
    <strong>耗时:</strong> ${time} ms
  `;
}

// 阶乘计算
function runFactorial() {
  if (!wasmModule) return;
  
  const n = parseInt(document.getElementById('factN').value);
  const result = wasmModule.factorial(n);
  
  document.getElementById('factResult').innerHTML = `
    <strong>${n}! =</strong> <code>${result}</code>
  `;
}

// 数组操作
function runArrayOps() {
  if (!wasmModule) return;
  
  const input = document.getElementById('arrayInput').value;
  const numbers = input.split(',').map(n => parseInt(n.trim()));
  
  // 创建 Int32Array
  const arr = new Int32Array(numbers);
  
  // 计算总和
  const sum = wasmModule.sumArray(arr);
  
  // 查找最大值
  const max = wasmModule.findMax(arr);
  
  // 排序（会修改原数组）
  const sortArr = new Int32Array(numbers);
  wasmModule.bubbleSort(sortArr);
  
  document.getElementById('arrayResult').innerHTML = `
    <strong>原数组:</strong> [${numbers.join(', ')}]<br>
    <strong>总和:</strong> <code>${sum}</code><br>
    <strong>最大值:</strong> <code>${max}</code><br>
    <strong>排序后:</strong> [${Array.from(sortArr).join(', ')}]
  `;
}

// 质数检测
function runPrimeTest() {
  if (!wasmModule) return;
  
  const n = parseInt(document.getElementById('primeN').value);
  const start = performance.now();
  const count = wasmModule.countPrimes(n);
  const time = (performance.now() - start).toFixed(3);
  
  document.getElementById('primeResult').innerHTML = `
    <strong>范围:</strong> 1 到 ${n}<br>
    <strong>质数个数:</strong> <code>${count}</code><br>
    <strong>耗时:</strong> ${time} ms
  `;
}

// 性能对比测试
function runPerformanceTest() {
  if (!wasmModule) return;
  
  const n = parseInt(document.getElementById('perfN').value);
  
  // JavaScript 版本质数检测
  function isPrimeJS(num) {
    if (num <= 1) return false;
    if (num <= 3) return true;
    if (num % 2 === 0 || num % 3 === 0) return false;
    
    let i = 5;
    while (i * i <= num) {
      if (num % i === 0 || num % (i + 2) === 0) {
        return false;
      }
      i += 6;
    }
    return true;
  }
  
  function countPrimesJS(max) {
    let count = 0;
    for (let i = 2; i <= max; i++) {
      if (isPrimeJS(i)) {
        count++;
      }
    }
    return count;
  }
  
  // 测试 WASM
  const startWasm = performance.now();
  const countWasm = wasmModule.countPrimes(n);
  const timeWasm = performance.now() - startWasm;
  
  // 测试 JavaScript
  const startJS = performance.now();
  const countJS = countPrimesJS(n);
  const timeJS = performance.now() - startJS;
  
  const speedup = (timeJS / timeWasm).toFixed(2);
  
  document.getElementById('perfResult').innerHTML = `
    <div class="performance">
      <strong>计算范围:</strong> 1 到 ${n}<br><br>
      
      <strong>WebAssembly:</strong><br>
      ⏱️ 耗时: <code>${timeWasm.toFixed(3)} ms</code><br>
      🎯 结果: ${countWasm} 个质数<br><br>
      
      <strong>原生 JavaScript:</strong><br>
      ⏱️ 耗时: <code>${timeJS.toFixed(3)} ms</code><br>
      🎯 结果: ${countJS} 个质数<br><br>
      
      <strong>性能提升:</strong> 🚀 <code>${speedup}x</code> 倍速
    </div>
  `;
}

// 页面加载时初始化
window.addEventListener('load', loadWasm);

