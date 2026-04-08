#include "../sources/HeapInsert.cpp"
#include <cassert>
#include <vector>
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
    auto result1 = heapInsert({1,3,5,7,9,8,6}, 2);
    assert(isMinHeap(result1) && result1[0] == 1 && result1.size() == 8);

    auto result2 = heapInsert({3,5,7,9}, 1);
    assert(result2[0] == 1 && isMinHeap(result2));

    auto result3 = heapInsert({1,3,5,7}, 100);
    assert(result3[0] == 1 && isMinHeap(result3));

    auto result4 = heapInsert({5}, 3);
    assert(result4[0] == 3 && isMinHeap(result4));

    assert(heapInsert({}, 42) == std::vector<int>{42});

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
