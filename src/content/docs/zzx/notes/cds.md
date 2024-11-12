---
title: CST's notes
---
## while loop
通常用于不知道具体循环次数，但知道停止条件  
```c
int j
while(j<...)
{
    //to do
    j++;
}
```
## for loop
通常用于知道具体的次数（使用频率高）  
```c
for(int j=0 ;j<4;j++ )
{
    //to do
}
```
## 条件语句的三种写法  
1.if（else）语句  
2.switch语句（要加break）  
```c
switch (<selector expression>) {
case <value_1>: <action_1>;
break;
case <value_2>: <action_2>;
break;
case <value_3>: <action_3>
break;
default: <action_4>;
}
```
3.？：常用来做一些简单的判断
eg.
```c
int x;
if(expr)
{
    x=5;
}
else
{
    x=6;
}
```
用？：语句来写就是
```c
int x = (expr)?5:6;
```
## 归并排序
用到了递归的算法  
```c
#include <stdio.h>
#include <stdlib.h>

// 合并两个子数组的函数
// firstHalf 是指向第一个子数组的指针
// secondHalf 是指向第二个子数组的指针
// lowerBound 是第一个子数组的起始索引
// middle 是两个子数组的分界索引
// upperBound 是第二个子数组的结束索引
// arr 是原始数组
void merge(int arr[], int lowerBound, int middle, int upperBound) {
    int i, j, k;
    int n1 = middle - lowerBound + 1;
    int n2 = upperBound - middle;

    // 创建临时数组
    int L[n1], R[n2];

    // 拷贝数据到临时数组 L[] 和 R[]
    for (i = 0; i < n1; i++)
        L[i] = arr[lowerBound + i];
    for (j = 0; j < n2; j++)
        R[j] = arr[middle + 1 + j];

    // 合并临时数组回到 arr[lowerBound..upperBound]
    i = 0; // 初始索引第一个子数组
    j = 0; // 初始索引第二个子数组
    k = lowerBound; // 初始索引合并的子数组
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k] = L[i];
            i++;
        } else {
            arr[k] = R[j];
            j++;
        }
        k++;
    }

    // 拷贝 L[] 的剩余元素
    while (i < n1) {
        arr[k] = L[i];
        i++;
        k++;
    }

    // 拷贝 R[] 的剩余元素
    while (j < n2) {
        arr[k] = R[j];
        j++;
        k++;
    }
}

// l 是数组的开始索引
// r 是数组的结束索引
void mergeSort(int arr[], int l, int r) {
    if (l < r) {
        // 寻找中间索引
        int m = l + (r - l) / 2;

        // 分别对左右两半进行排序
        mergeSort(arr, l, m);
        mergeSort(arr, m + 1, r);

        // 合并两个已排序的子数组
        merge(arr, l, m, r);
    }
}
```