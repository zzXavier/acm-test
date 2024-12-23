---
title: 算法学习笔记
---
## 前缀和与差分
>前缀和  
对于某个小部分需要频繁求和时，常常写前缀和，在通过前缀和的可加性来查询特定区域的和。
```c
a[n],prefix[n];
for(...)
prefix[i]=prefix[i-1]+a[i];
```
>差分  
对每个相邻元素求差值，再对差值进行积分可以得到每个元素，差分的好处在于可以对局部元素进行修改（后缀修改）  
差分的积分=元素；元素的积分=前缀和
```c
a[n],diff[n],prefix[n];
diff[i]=a[i]-a[i-1];
diff[j]+=x;
diff[j+k]-=x;//对[j,j+k]部分元素加x
for(...)
{
    a[i]=diff[i]+a[i-1]//重新积分求a[i]
}
```
>以上两种方法也可以在二维数组中进行!