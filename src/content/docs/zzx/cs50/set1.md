---
title: Problem set 1
---


## mario

- 主要考验了对循环的理解和语法的规范
```c
#include<stdio.h>
#include<cs50.h>

void print_row1(int length);
void print_space(int length);
void print_row2(int length);

int main()
{
    int height = get_int("height:");


    for (int j=0;j <height;j++)
    {
        print_space(height-j);
        print_row2(j+1);
        print_row1(j+1);
    }
}


void print_row1(int length)
{
    printf("  ");
    for (int i=0; i < length;i++)
    {
        printf("#");

    }
    printf("\n");
}

void print_row2(int length)
{

    for (int i=0; i < length;i++)
    {
        printf("#");
    }
}

void print_space(int length)
{
    for (int i=length ;i>0;i-- )
    {
        printf(" ");
    }
}
```


## credit

- 新用到一个sprintf函数用来转换数据类型
```c
#include <stdio.h>
#include <cs50.h>
#include <string.h>

void check_number(string m);
string convert_to_string (long n);
int check_sum(long n);

int main(void)
{
    long number = get_long("What's your number?");
    printf("Number:%ld\n",number);
    int sum = check_sum(number);
    if(sum == 0)
    {
    string s = convert_to_string (number);
    check_number(s);
    }
    else
    {
    printf("INVALID\n");
    }

}

void check_number(string s)
{

    if(s[0] == '4')

    {
    printf("VISA\n");
    }

    else if((s[0] == '3' && s[1] == '4') || (s[0] == '3' && s[1] == '7'))
    {
    printf("AMEX\n");
    }
    else if((s[0] == '5') && ((s[1] == '1') || (s[1] == '2') || (s[1] == '3') || (s[1] == '4') || (s[1] == '5')))
    {
    printf("MASTERCARD\n");
    }

}
string convert_to_string (long n)
{
    static char s[16];
    sprintf(s, "%ld", n);
    return s;
}

int check_sum(long n)
{
    string s = convert_to_string (n);
    int length = strlen(s);
    int i = (length - 2) , j = (length - 1) ,  sum = 0 , sum1 = 0,sum2 = 0;
    while(i>=0)
    {
     s[i] = (s[i] - '0');
     if (s[i] >= 5 )
    {
        int c = (s[i]*2) / 10;
        int b = (s[i]*2) % 10;
        int a = b + c;
        s[i] = a;
        sum1 = s[i] + sum1;
    }
    else
    {
        sum1 = s[i]  * 2 + sum1;
    }
        i=i-2;
    }
    while(j>0)
    {
        s[j] = (s[j] - '0');
        sum2 = s[j] + sum2;
        j = j - 2;
    }
    sum = sum1 + sum2;
    sum = sum % 10;
    return sum;

}
```

