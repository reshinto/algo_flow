#include "sources/HeapReplaceRoot.cpp"
#include <cassert>
#include <vector>
#include <algorithm>
#include <iostream>

bool isMinHeap(const std::vector<int>& array) {
    int size = (int)array.size();
    for (int p = 0; p < size / 2; p++) {
        if (2*p+1 < size && array[p] > array[2*p+1]) return false;
        if (2*p+2 < size && array[p] > array[2*p+2]) return false;
    }
    return true;
}

int main() {
    auto result1 = heapReplaceRoot({1,3,5,7,9,8,6}, 10);
    assert(result1.first == 1);
    assert(isMinHeap(result1.second));
    assert(std::find(result1.second.begin(), result1.second.end(), 10) != result1.second.end());
    assert(std::find(result1.second.begin(), result1.second.end(), 1) == result1.second.end());

    auto result2 = heapReplaceRoot({1,3,5,7,9,8,6}, 2);
    assert(result2.first == 1 && result2.second[0] == 2);

    auto result3 = heapReplaceRoot({1,3,5,7,9,8,6}, 100);
    assert(isMinHeap(result3.second) && result3.second[0] != 100);

    auto result4 = heapReplaceRoot({42}, 7);
    assert(result4.first == 42 && result4.second == std::vector<int>{7});

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
