// WebAssembly 数学计算演示
// 这个文件包含一些简单的数学函数，将被编译成WebAssembly

// 加法函数
int add(int a, int b) {
    return a + b;
}

// 减法函数
int subtract(int a, int b) {
    return a - b;
}

// 乘法函数
int multiply(int a, int b) {
    return a * b;
}

// 除法函数（整数除法）
int divide(int a, int b) {
    if (b == 0) return 0; // 避免除零错误
    return a / b;
}

// 计算阶乘
int factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

// 计算斐波那契数列
int fibonacci(int n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

// 判断是否为质数
int isPrime(int n) {
    if (n <= 1) return 0;
    if (n <= 3) return 1;
    if (n % 2 == 0 || n % 3 == 0) return 0;
    
    for (int i = 5; i * i <= n; i += 6) {
        if (n % i == 0 || n % (i + 2) == 0) return 0;
    }
    return 1;
}

// 计算平方根（使用牛顿法近似）
double sqrt_approx(double x) {
    if (x < 0) return -1; // 负数返回错误值
    if (x == 0) return 0;
    
    double guess = x / 2.0;
    double epsilon = 0.000001;
    
    while (1) {
        double new_guess = (guess + x / guess) / 2.0;
        if (new_guess - guess < epsilon && guess - new_guess < epsilon) {
            break;
        }
        guess = new_guess;
    }
    return guess;
}
