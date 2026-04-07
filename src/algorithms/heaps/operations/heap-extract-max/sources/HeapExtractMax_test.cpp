#include "HeapExtractMax.cpp"
#include <cassert>
#include <vector>
#include <iostream>

bool isMaxHeap(const std::vector<int>& array) {
    int size = (int)array.size();
    for (int p = 0; p < size / 2; p++) {
        if (2*p+1 < size && array[p] < array[2*p+1]) return false;
        if (2*p+2 < size && array[p] < array[2*p+2]) return false;
    }
    return true;
}

int main() {
    auto result1 = heapExtractMax({9,7,8,3,5,6,1});
    assert(result1.first == 9);
    assert(isMaxHeap(result1.second));
    assert(result1.second.size() == 6);
    assert(result1.second[0] == 8);

    auto result2 = heapExtractMax({8,3});
    assert(result2.first == 8);
    assert(result2.second == std::vector<int>{3});

    auto result3 = heapExtractMax({99});
    assert(result3.first == 99);
    assert(result3.second.empty());

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
