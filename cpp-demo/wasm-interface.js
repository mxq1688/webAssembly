// WebAssembly 接口和交互逻辑

class WasmCalculator {
    constructor() {
        this.wasmModule = null;
        this.isLoaded = false;
        this.performanceStats = {
            wasmTimes: [],
            jsTimes: []
        };
    }

    // 加载 WebAssembly 模块
    async loadWasm() {
        try {
            this.updateStatus('正在加载 WebAssembly 模块...', 'loading');
            
            // 加载 Emscripten 生成的模块
            const Module = await createMathModule();
            this.wasmModule = Module;
            this.isLoaded = true;
            
            this.updateStatus('WebAssembly 模块加载成功！可以开始计算了。', 'success');
            console.log('WebAssembly 模块已加载');
            
        } catch (error) {
            console.error('加载 WebAssembly 失败：', error);
            this.updateStatus(`加载失败：${error.message}。请确保已编译 math.wasm 文件。`, 'error');
        }
    }

    // 更新状态显示
    updateStatus(message, type = 'success') {
        const statusElement = document.getElementById('status');
        const statusText = document.getElementById('status-text');
        
        statusText.textContent = message;
        statusElement.className = `status ${type}`;
    }

    // 检查模块是否已加载
    checkLoaded() {
        if (!this.isLoaded) {
            this.updateStatus('WebAssembly 模块尚未加载完成，请稍候...', 'error');
            return false;
        }
        return true;
    }

    // 显示结果
    showResult(elementId, content, isError = false) {
        const resultElement = document.getElementById(elementId);
        resultElement.innerHTML = content;
        resultElement.className = isError ? 'result error' : 'result';
        resultElement.style.display = 'block';
    }

    // 基础数学运算
    performBasicMath(a, b) {
        if (!this.checkLoaded()) return;

        try {
            const add = this.wasmModule.ccall('add', 'number', ['number', 'number'], [a, b]);
            const subtract = this.wasmModule.ccall('subtract', 'number', ['number', 'number'], [a, b]);
            const multiply = this.wasmModule.ccall('multiply', 'number', ['number', 'number'], [a, b]);
            const divide = b !== 0 ? this.wasmModule.ccall('divide', 'number', ['number', 'number'], [a, b]) : '除数不能为0';

            return {
                add,
                subtract,
                multiply,
                divide
            };
        } catch (error) {
            console.error('基础运算错误：', error);
            return null;
        }
    }

    // 阶乘计算
    calculateFactorial(n) {
        if (!this.checkLoaded()) return null;
        
        try {
            if (n < 0 || n > 12) {
                throw new Error('阶乘计算范围应在 0-12 之间');
            }
            return this.wasmModule.ccall('factorial', 'number', ['number'], [n]);
        } catch (error) {
            console.error('阶乘计算错误：', error);
            return null;
        }
    }

    // 斐波那契数列计算
    calculateFibonacci(n) {
        if (!this.checkLoaded()) return null;
        
        try {
            if (n < 0 || n > 40) {
                throw new Error('斐波那契计算范围应在 0-40 之间');
            }
            return this.wasmModule.ccall('fibonacci', 'number', ['number'], [n]);
        } catch (error) {
            console.error('斐波那契计算错误：', error);
            return null;
        }
    }

    // 质数检测
    isPrime(n) {
        if (!this.checkLoaded()) return null;
        
        try {
            return this.wasmModule.ccall('isPrime', 'number', ['number'], [n]) === 1;
        } catch (error) {
            console.error('质数检测错误：', error);
            return null;
        }
    }

    // 平方根计算
    calculateSqrt(x) {
        if (!this.checkLoaded()) return null;
        
        try {
            if (x < 0) {
                throw new Error('不能计算负数的平方根');
            }
            return this.wasmModule.ccall('sqrt_approx', 'number', ['number'], [x]);
        } catch (error) {
            console.error('平方根计算错误：', error);
            return null;
        }
    }

    // JavaScript 版本的斐波那契（用于性能对比）
    fibonacciJS(n) {
        if (n <= 1) return n;
        return this.fibonacciJS(n - 1) + this.fibonacciJS(n - 2);
    }

    // 性能测试
    async runPerformanceTest(iterations) {
        if (!this.checkLoaded()) return;

        const testNumber = 35; // 斐波那契测试数字
        
        // 测试 WebAssembly 性能
        const wasmStart = performance.now();
        for (let i = 0; i < iterations; i++) {
            this.wasmModule.ccall('fibonacci', 'number', ['number'], [testNumber]);
        }
        const wasmEnd = performance.now();
        const wasmTime = wasmEnd - wasmStart;

        // 测试 JavaScript 性能
        const jsStart = performance.now();
        for (let i = 0; i < iterations; i++) {
            this.fibonacciJS(testNumber);
        }
        const jsEnd = performance.now();
        const jsTime = jsEnd - jsStart;

        // 保存性能数据
        this.performanceStats.wasmTimes.push(wasmTime);
        this.performanceStats.jsTimes.push(jsTime);

        return {
            wasmTime: wasmTime.toFixed(2),
            jsTime: jsTime.toFixed(2),
            speedup: (jsTime / wasmTime).toFixed(2),
            iterations
        };
    }

    // 显示性能统计
    showPerformanceStats() {
        const stats = this.performanceStats;
        if (stats.wasmTimes.length === 0) return;

        const avgWasm = stats.wasmTimes.reduce((a, b) => a + b, 0) / stats.wasmTimes.length;
        const avgJS = stats.jsTimes.reduce((a, b) => a + b, 0) / stats.jsTimes.length;
        const avgSpeedup = avgJS / avgWasm;

        const statsHTML = `
            <div class="performance-item">
                <span>测试次数：</span>
                <span>${stats.wasmTimes.length}</span>
            </div>
            <div class="performance-item">
                <span>WebAssembly 平均时间：</span>
                <span>${avgWasm.toFixed(2)} ms</span>
            </div>
            <div class="performance-item">
                <span>JavaScript 平均时间：</span>
                <span>${avgJS.toFixed(2)} ms</span>
            </div>
            <div class="performance-item">
                <span>平均性能提升：</span>
                <span>${avgSpeedup.toFixed(2)}x</span>
            </div>
        `;

        document.getElementById('performance-stats').innerHTML = statsHTML;
        document.getElementById('performance-section').style.display = 'block';
    }
}

// 创建全局实例
const wasmCalc = new WasmCalculator();

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', async () => {
    await wasmCalc.loadWasm();
});

// 基础运算函数
function performBasicMath() {
    const num1 = parseInt(document.getElementById('num1').value);
    const num2 = parseInt(document.getElementById('num2').value);
    
    if (isNaN(num1) || isNaN(num2)) {
        wasmCalc.showResult('basic-result', '请输入有效的数字！', true);
        return;
    }

    const results = wasmCalc.performBasicMath(num1, num2);
    if (results) {
        const resultHTML = `
            <strong>计算结果：</strong><br>
            ${num1} + ${num2} = ${results.add}<br>
            ${num1} - ${num2} = ${results.subtract}<br>
            ${num1} × ${num2} = ${results.multiply}<br>
            ${num1} ÷ ${num2} = ${results.divide}
        `;
        wasmCalc.showResult('basic-result', resultHTML);
    } else {
        wasmCalc.showResult('basic-result', '计算出错，请检查输入！', true);
    }
}

// 阶乘计算函数
function calculateFactorial() {
    const num = parseInt(document.getElementById('factorial-num').value);
    
    if (isNaN(num) || num < 0 || num > 12) {
        wasmCalc.showResult('factorial-result', '请输入 0-12 之间的整数！', true);
        return;
    }

    const result = wasmCalc.calculateFactorial(num);
    if (result !== null) {
        wasmCalc.showResult('factorial-result', `${num}! = ${result.toLocaleString()}`);
    } else {
        wasmCalc.showResult('factorial-result', '计算出错！', true);
    }
}

// 斐波那契计算函数
function calculateFibonacci() {
    const num = parseInt(document.getElementById('fibonacci-num').value);
    
    if (isNaN(num) || num < 0 || num > 40) {
        wasmCalc.showResult('fibonacci-result', '请输入 0-40 之间的整数！', true);
        return;
    }

    const startTime = performance.now();
    const result = wasmCalc.calculateFibonacci(num);
    const endTime = performance.now();
    
    if (result !== null) {
        const time = (endTime - startTime).toFixed(2);
        wasmCalc.showResult('fibonacci-result', 
            `斐波那契数列第 ${num} 位 = ${result.toLocaleString()}<br>
             <small>计算时间: ${time} ms</small>`);
    } else {
        wasmCalc.showResult('fibonacci-result', '计算出错！', true);
    }
}

// 质数检测函数
function checkPrime() {
    const num = parseInt(document.getElementById('prime-num').value);
    
    if (isNaN(num)) {
        wasmCalc.showResult('prime-result', '请输入有效的整数！', true);
        return;
    }

    const startTime = performance.now();
    const isPrime = wasmCalc.isPrime(num);
    const endTime = performance.now();
    
    if (isPrime !== null) {
        const time = (endTime - startTime).toFixed(2);
        const resultText = isPrime ? '是质数' : '不是质数';
        wasmCalc.showResult('prime-result', 
            `${num} ${resultText}<br>
             <small>检测时间: ${time} ms</small>`);
    } else {
        wasmCalc.showResult('prime-result', '检测出错！', true);
    }
}

// 平方根计算函数
function calculateSqrt() {
    const num = parseFloat(document.getElementById('sqrt-num').value);
    
    if (isNaN(num) || num < 0) {
        wasmCalc.showResult('sqrt-result', '请输入非负数！', true);
        return;
    }

    const result = wasmCalc.calculateSqrt(num);
    if (result !== null) {
        wasmCalc.showResult('sqrt-result', 
            `√${num} ≈ ${result.toFixed(6)}<br>
             <small>使用牛顿法近似计算</small>`);
    } else {
        wasmCalc.showResult('sqrt-result', '计算出错！', true);
    }
}

// 性能测试函数
async function runPerformanceTest() {
    const iterations = parseInt(document.getElementById('perf-iterations').value);
    
    if (isNaN(iterations) || iterations < 1000 || iterations > 1000000) {
        wasmCalc.showResult('perf-result', '请输入 1000-1000000 之间的测试次数！', true);
        return;
    }

    wasmCalc.showResult('perf-result', '正在运行性能测试，请稍候...');
    
    // 使用 setTimeout 让 UI 有时间更新
    setTimeout(async () => {
        const results = await wasmCalc.runPerformanceTest(iterations);
        
        if (results) {
            const resultHTML = `
                <strong>性能测试结果：</strong><br>
                测试次数: ${results.iterations.toLocaleString()}<br>
                WebAssembly: ${results.wasmTime} ms<br>
                JavaScript: ${results.jsTime} ms<br>
                <strong>性能提升: ${results.speedup}x</strong>
            `;
            wasmCalc.showResult('perf-result', resultHTML);
            wasmCalc.showPerformanceStats();
        } else {
            wasmCalc.showResult('perf-result', '性能测试失败！', true);
        }
    }, 100);
}
