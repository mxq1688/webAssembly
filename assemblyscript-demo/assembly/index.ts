/**
 * AssemblyScript Demo - 数学计算和字符串处理
 */

// ============= 基础数学函数 =============

/**
 * 加法运算
 */
export function add(a: i32, b: i32): i32 {
  return a + b;
}

/**
 * 乘法运算
 */
export function multiply(a: i32, b: i32): i32 {
  return a * b;
}

/**
 * 计算斐波那契数列（递归版本）
 */
export function fibonacci(n: i32): i32 {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

/**
 * 计算阶乘
 */
export function factorial(n: i32): i32 {
  if (n <= 1) return 1;
  let result: i32 = 1;
  for (let i: i32 = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

// ============= 数组操作 =============

/**
 * 计算数组总和
 */
export function sumArray(arr: Int32Array): i32 {
  let sum: i32 = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum;
}

/**
 * 查找数组中的最大值
 */
export function findMax(arr: Int32Array): i32 {
  if (arr.length === 0) return 0;
  let max: i32 = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
  }
  return max;
}

/**
 * 冒泡排序（修改原数组）
 */
export function bubbleSort(arr: Int32Array): void {
  const len = arr.length;
  for (let i = 0; i < len - 1; i++) {
    for (let j = 0; j < len - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
}

// ============= 性能测试函数 =============

/**
 * 计算质数（性能测试用）
 */
export function isPrime(n: i32): bool {
  if (n <= 1) return false;
  if (n <= 3) return true;
  if (n % 2 === 0 || n % 3 === 0) return false;
  
  let i: i32 = 5;
  while (i * i <= n) {
    if (n % i === 0 || n % (i + 2) === 0) {
      return false;
    }
    i += 6;
  }
  return true;
}

/**
 * 计算范围内的质数个数
 */
export function countPrimes(max: i32): i32 {
  let count: i32 = 0;
  for (let i: i32 = 2; i <= max; i++) {
    if (isPrime(i)) {
      count++;
    }
  }
  return count;
}

// ============= 内存操作示例 =============

/**
 * 分配内存并填充数据
 */
export function allocateAndFill(size: i32, value: i32): Int32Array {
  const arr = new Int32Array(size);
  for (let i = 0; i < size; i++) {
    arr[i] = value * i;
  }
  return arr;
}

