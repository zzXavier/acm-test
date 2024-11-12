---
title: Problem set 3
---

## Sort

- 首先我们能发现 sort2 比其他两个算法在任意一个文件上都要快很多，且即使排序数量从 5000 到 50000，消耗时间只是 4 倍，所以能确认 sort2 是 Merge sort  
- 注意到 sort1 在对已排序的序列进行排序时，时间要显著短于随机和逆序序列，所以 sort1 应该是 Bubble sort  
- sort3 三种文件消耗时间相近，所以 sort3 应该是 Selection sort  