---
title: E
---

## E

```
/*
* Given score formula: Score = a^2 + b^2 + c^2 + 6*min(a, b, c)
*
* Input first line n, 3 <= n <= 10,
* input n lines, each line input a, b, c, d ( 0 <= a,b,c,d <= 10^9),
*
* While the d could be added to either a or b or c, so could form a final 3 numbers for each input line: a = (a + d) or b = (b + d) or c = (c + d)
*
* For this new a,b,c, out put the maximum score for each line, that means output max(Score with (a+d),b,c, Score with a,(b+d),c, Score with a,b,(c+d)) for each line
*
* Output max for each line after input all these lines
*/


#include <stdio.h>
#include <stdlib.h>
#include <math.h>

#define MAX_N 10

long long calculate_score(long long a, long long b, long long c) {
    long long min_val = (a < b) ? ((a < c) ? a : c) : ((b < c) ? b : c);
    return a * a + b * b + c * c + 6 * min_val;
}

int main() {
    int n;
    scanf("%d", &n);

    for (int i = 0; i < n; i++) {
        long long a, b, c, d;
        scanf("%lld %lld %lld %lld", &a, &b, &c, &d);

        long long score1 = calculate_score(a + d, b, c);
        long long score2 = calculate_score(a, b + d, c);
        long long score3 = calculate_score(a, b, c + d);

        long long max_score = (score1 > score2) ? ((score1 > score3) ? score1 : score3) : ((score2 > score3) ? score2 : score3);

        printf("%lld\n", max_score);
    }

    return 0;
}

```

## E-2

```
#include <stdio.h>
#include <stdlib.h>

#define MAX_N 10

long long calculate_score(long long a, long long b, long long c)
{
    long long min_val = (a < b) ? ((a < c) ? a : c) : ((b < c) ? b : c);
    return a * a + b * b + c * c + 6 * min_val;
}

int main()
{
    int n;
    scanf("%d", &n);

    long long max_scores[MAX_N];

    for (int i = 0; i < n; i++)
    {
        long long a, b, c, d;
        scanf("%lld %lld %lld %lld", &a, &b, &c, &d);

        long long score1 = calculate_score(a + d, b, c);
        long long score2 = calculate_score(a, b + d, c);
        long long score3 = calculate_score(a, b, c + d);

        max_scores[i] = (score1 > score2) ? ((score1 > score3) ? score1 : score3) : ((score2 > score3) ? score2 : score3);
    }

    for (int i = 0; i < n; i++)
    {
        printf("%lld\n", max_scores[i]);
    }

    return 0;
}

```
