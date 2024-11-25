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
用到了递归的算法,每个mergesort中都有两个merge sort函数和一个merge函数，当分组到了最终结果后，返回时会进行之前在每个merge sort中存的merge算法，进行排序，从而实现了归并排序  
```c
#include <stdio.h>
#include <stdlib.h>
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
## 结构体
结构体的写法
```c
typedef struct{
    string name;
    string number;//数据类型+变量名；
}People;//新建类型的名称

People person;
person.name=Xavier;
person.number=1105;
```
结构体里的变量名可以与结构体之外的变量名重名（作用域不同）  
但通常不要这么写，因为容易造成混淆...