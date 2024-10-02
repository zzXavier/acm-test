#include <stdio.h>
int main()
{
    long long n;
    scanf("%lld",&n);
    if (n < 2 || n > 200000)
    {
        printf("Invalid input: n should be between 2 and 200000\n");
        return 2;
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
            return 12;
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