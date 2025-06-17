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