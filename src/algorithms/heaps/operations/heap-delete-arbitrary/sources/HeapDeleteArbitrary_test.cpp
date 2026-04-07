#include "HeapDeleteArbitrary.cpp"
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
    auto result1 = heapDeleteArbitrary({1,3,5,7,9,8,6}, 2);
    assert(isMinHeap(result1) && result1.size() == 6);
    auto sorted1 = result1; std::sort(sorted1.begin(), sorted1.end());
    assert(sorted1 == std::vector<int>({1,3,6,7,8,9}));

    auto result2 = heapDeleteArbitrary({1,3,5,7,9,8,6}, 0);
    assert(isMinHeap(result2) && result2.size() == 6 && result2[0] != 1);

    assert(heapDeleteArbitrary({1,5}, 0) == std::vector<int>{5});
    assert(heapDeleteArbitrary({1,5}, 1) == std::vector<int>{1});
    assert(heapDeleteArbitrary({42}, 0) == std::vector<int>{});

    auto result3 = heapDeleteArbitrary({1,10,5,15,20,8,6}, 3);
    assert(isMinHeap(result3));

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
