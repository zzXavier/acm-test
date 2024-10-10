---
title: CDS's notes
---
- while loop
通常用于不知道具体循环次数，但知道停止条件  
```c
int j
while(j<...)
{
    //to do
    j++;
}
```
- for loop
通常用于知道具体的次数（使用频率高）  
```c
for(int j=0 ;j<4;j++ )
{
    //to do
}
```
- 条件语句的三种写法  
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