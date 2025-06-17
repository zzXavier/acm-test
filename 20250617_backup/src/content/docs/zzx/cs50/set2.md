---
title: Problem set 2
---
## scrabble
- 需要转换大小写（通过ASII码的加减）  
再对每个字母进行赋值（用到了两个数组，一个储存字母一个储存数字）  
其中需要注意对标点符号这类的非字母数据进行赋值归零  
用到了strlen函数<sring.h>，用来获取数组长度，其中数据类型为size_t！
```c
#include <stdio.h>
#include <cs50.h>
#include <string.h>

int cal_sum(string l,size_t s,int k[]);
void add_value(string l,size_t s,int k[]);

int main()
{
    string p1 = get_string("Player 1:");
    string p2 = get_string("Player 2:");
    //输入两组
    size_t length1 = strlen(p1);
    size_t length2 = strlen(p2);
    int values1[length1];
    int values2[length2];
    int i;
    for(i=0;i<length1;i++)
    {
    if(p1[i]>='a' && p1[i]<='z')
    {
        p1[i] = p1[i]-32;
    }
    }
    for(i=0;i<length2;i++)
    {
    if(p2[i]>='a' && p2[i]<='z')
    {
        p2[i] = p2[i]-32;
    }
    }
    add_value(p1,length1,values1);
    add_value(p2,length2,values2);
    int sum1 = cal_sum(p1,length1,values1);
    int sum2 = cal_sum(p2,length2,values2);

    //赋值
    if(sum1>sum2)
    {
        printf("Player 1 wins!\n");
    }
    else if(sum1<sum2)
    {
        printf("Player 2 wins!\n");
    }
    else
    {
        printf("Tie!\n");
    }
    //开始比较
    //打印胜者
}
void add_value(string l,size_t s,int k[])
{
    int i;
    for(i = 0;i<s;i++)
    if(l[i] == 'A')
    {
        k[i] = 1;
    }
    else if(l[i] == 'B')
    {
        k[i] = 3;
    }
    else if(l[i] == 'C')
    {
        k[i] = 3;
    }
    else if(l[i] == 'D' )
    {
        k[i] = 2;
    }
    else if(l[i] == 'E' )
    {
        k[i] =1;
    }else if(l[i] == 'F')
    {
        k[i] =4;
    }else if(l[i] == 'G')
    {
        k[i] =2;
    }else if(l[i] == 'H')
    {
        k[i] =4;
    }else if(l[i] == 'I')
    {
        k[i] =1;
    }else if(l[i] == 'J')
    {
        k[i] =8;
    }else if(l[i] == 'K')
    {
        k[i] =5;
    }else if(l[i] == 'L')
    {
        k[i] =1;
    }else if(l[i] == 'M')
    {
        k[i] =3;
    }
    else if(l[i] == 'N')
    {
        k[i] =1;
    }else if(l[i] == 'O')
    {
        k[i] =1;
    }else if(l[i] == 'P')
    {
        k[i] =3;
    }else if(l[i] == 'Q')
    {
        k[i] =10;
    }else if(l[i] == 'R')
    {
        k[i] =1;
    }else if(l[i] == 'S')
    {
        k[i] =1;
    }else if(l[i] == 'T')
    {
        k[i] =1;
    }else if(l[i] == 'U')
    {
        k[i] =1;
    }else if(l[i] == 'V')
    {
        k[i] =4;
    }else if(l[i] == 'W')
    {
        k[i] =4;
    }else if(l[i] == 'X')
    {
        k[i] =8;
    }else if(l[i] == 'Y')
    {
        k[i] =4;
    }
    else if(l[i] == 'Z')
    {
        k[i] =10;
    }
    else
    {
        k[i] =0;
    }
}

int cal_sum(string l,size_t s,int k[])
{
    int sum = 0;
    int i;
    for(i=0;i<s;i++)
    {
        sum = sum+k[i];

    }
    return sum;
}
```
## Readability
- 新用到了<ctype.h>的函数，可以用来判断字母、数字、标点符号，甚至是空格。  
还新用到了<math.h>中的round函数，用来四舍五入
```c
#include <stdio.h>
#include <cs50.h>
#include <ctype.h>
#include <string.h>
#include <math.h>

int main()
{
    string sentence = get_string("text:");
    //输入一段句子
    size_t length = strlen(sentence);
    int sum_alpha = 0;
    int sum_words = 1;
    int sum_sentence = 0;
    for(int i=0;i<length;i++)
    {
        if(isalpha(sentence[i]))
        {
            sum_alpha++;
        }
        else if(isspace(sentence[i]))
        {
            sum_words++;
        }
        else if(sentence[i] == '!' || sentence[i] == '?' || sentence[i] == '.')
        {
            sum_sentence++;
        }
    }
    //字母数量，词语数量（找空格数量）
    float index = (5.88*sum_alpha)/sum_words - (29.6*sum_sentence)/sum_words - 15.8;
    int index1 = round(index);
    //计算
    if(index1 < 1)
    {
        printf("Before Grade 1\n");
    }
    else if(index1 >=16)
    {
        printf("Grade 16+\n");
    }
    else
    {
        printf("Grade %i\n",index1);
    }
    //根据条件设置打印情况
}
```