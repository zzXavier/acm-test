---
title: D
---

## D

```
/*
* Input 2 lines:
* - number n, 2 <= n <= 2 * 10^5
* - several numbers (n pieces of numbers) in a line seperated with space: a1 a2 ... an, and the number is: 1 <= ai <= 10^9
*
* Output number of pairs that:
* ai - aj could be divided by 200
*
* Make sure to check the inputs are in the range
*/

#include <stdio.h>
#include <stdlib.h>

#define MAX_N 200000

int main()
{
    int n;
    long long a[MAX_N];

    // Input
    scanf("%d", &n);
    for (int i = 0; i < n; i++)
    {
        scanf("%lld", &a[i]);
    }

    // Check and output pairs
    for (int i = 0; i < n; i++)
    {
        for (int j = i + 1; j < n; j++)
        {
            if (abs(a[i] - a[j]) % 200 == 0)
            {
                printf("%d %d\n", i + 1, j + 1);
            }
        }
    }

    return 0;
}
```

## D-2

```
wrong:

#include <stdio.h>
int main()
{
    long long n;
    scanf("%lld",&n);
    if (n < 2 || n > 200000)
    {
        printf("Invalid input: n should be between 2 and 200000\n");
        return 1;
    }
    long long sum = 0;
    long long number[n];
    int yushu[200] = {0};
    for (long long i = 0; i < n; i++)
    {
        scanf("%lld",&number[i]);
        if (number[i] < 1 || number[i] > 1000000000)
        {
            printf("Invalid input: number should be between 1 and 1000000000\n");
            return 1;
        }
        yushu[number[i] % 200]++;

    }
    for(int i = 0;i<200;i++)
    {
        if(yushu[i]>1)
        {
            sum = sum + ((yushu[i])*(yushu[i]-1))/2;
        }
    }
    printf("%lld\n",sum);
    return 0;


}
```

```
#include <stdio.h>
#include <stdlib.h>

#define MAX_N 200000
#define MIN_N 2
#define MAX_AI 1000000000

int main()
{
    int n;
    long long a[MAX_N];
    int count = 0;

    // Input and validate n
    scanf("%d", &n);
    if (n < MIN_N || n > MAX_N)
    {
        printf("Invalid input: n should be between %d and %d\n", MIN_N, MAX_N);
        return 1;
    }

    // Input and validate ai
    for (int i = 0; i < n; i++)
    {
        scanf("%lld", &a[i]);
        if (a[i] < 1 || a[i] > MAX_AI)
        {
            printf("Invalid input: ai should be between 1 and %d\n", MAX_AI);
            return 1;
        }
    }

    // Count pairs
    for (int i = 0; i < n; i++)
    {
        for (int j = i + 1; j < n; j++)
        {
            if (llabs(a[i] - a[j]) % 200 == 0)
            {
                count++;
            }
        }
    }

    // Output result
    printf("%d\n", count);

    return 0;
}
```

## d-2-2

```

#include <stdio.h>
#include <stdlib.h>

#define MAX_N 200000
#define MIN_N 2
#define MAX_AI 1000000000

int main()
{
    int n;
    long long a[MAX_N];
    int count = 0;

    // Input and validate n
    scanf("%d", &n);
    if (n < MIN_N || n > MAX_N)
    {
        printf("Invalid input: n should be between %d and %d\n", MIN_N, MAX_N);
        return 1;
    }

    // Input and validate ai
    for (int i = 0; i < n; i++)
    {
        scanf("%lld", &a[i]);
        if (a[i] < 1 || a[i] > MAX_AI)
        {
            printf("Invalid input: ai should be between 1 and %d\n", MAX_AI);
            return 1;
        }
        a[i] = a[i] % 200;
    }

    // Count pairs
    for (int i = 0; i < n; i++)
    {
        for (int j = i + 1; j < n; j++)
        {
            if (llabs(a[i] - a[j]) % 200 == 0)
            {
                count++;
            }
        }
    }

    // Output result
    printf("%d\n", count);

    return 0;
}
```

## D-3

```
#include <stdio.h>

#define MAX_N 200000
#define MIN_N 2
#define MAX_AI 1000000000

int main() {
    int n;
    long long a[MAX_N];
    int count = 0;
    int remainders[200] = {0};

    // Input and validate n
    scanf("%d", &n);
    if (n < MIN_N || n > MAX_N) {
        printf("Invalid input: n should be between %d and %d\n", MIN_N, MAX_N);
        return 1;
    }

    // Input and validate ai, update remainders
    for (int i = 0; i < n; i++) {
        scanf("%lld", &a[i]);
        if (a[i] < 1 || a[i] > MAX_AI) {
            printf("Invalid input: ai should be between 1 and %d\n", MAX_AI);
            return 1;
        }
        remainders[(a[i] % 200 + 200) % 200]++;
    }

    // Count pairs using remainders
    for (int i = 0; i < n; i++) {
        int complement = (200 - (a[i] % 200) + 200) % 200;
        count += remainders[complement];
    }

    // Output result
    printf("%d\n", count);

    return 0;
}
```
