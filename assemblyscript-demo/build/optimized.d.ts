/** Exported memory */
export declare const memory: WebAssembly.Memory;
/**
 * assembly/index/add
 * @param a `i32`
 * @param b `i32`
 * @returns `i32`
 */
export declare function add(a: number, b: number): number;
/**
 * assembly/index/multiply
 * @param a `i32`
 * @param b `i32`
 * @returns `i32`
 */
export declare function multiply(a: number, b: number): number;
/**
 * assembly/index/fibonacci
 * @param n `i32`
 * @returns `i32`
 */
export declare function fibonacci(n: number): number;
/**
 * assembly/index/factorial
 * @param n `i32`
 * @returns `i32`
 */
export declare function factorial(n: number): number;
/**
 * assembly/index/sumArray
 * @param arr `~lib/typedarray/Int32Array`
 * @returns `i32`
 */
export declare function sumArray(arr: Int32Array): number;
/**
 * assembly/index/findMax
 * @param arr `~lib/typedarray/Int32Array`
 * @returns `i32`
 */
export declare function findMax(arr: Int32Array): number;
/**
 * assembly/index/bubbleSort
 * @param arr `~lib/typedarray/Int32Array`
 */
export declare function bubbleSort(arr: Int32Array): void;
/**
 * assembly/index/isPrime
 * @param n `i32`
 * @returns `bool`
 */
export declare function isPrime(n: number): boolean;
/**
 * assembly/index/countPrimes
 * @param max `i32`
 * @returns `i32`
 */
export declare function countPrimes(max: number): number;
/**
 * assembly/index/allocateAndFill
 * @param size `i32`
 * @param value `i32`
 * @returns `~lib/typedarray/Int32Array`
 */
export declare function allocateAndFill(size: number, value: number): Int32Array;
