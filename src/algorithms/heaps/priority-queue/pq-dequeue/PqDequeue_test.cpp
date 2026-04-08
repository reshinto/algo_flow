#include "sources/PqDequeue.cpp"
#include <algorithm>
#include <cassert>
#include <cstdio>
#include <vector>

bool isMinHeapPQD(const std::vector<int>& array) {
    int size = (int)array.size();
    for (int parentIdx = 0; parentIdx < size / 2; parentIdx++) {
        int leftIdx = 2 * parentIdx + 1;
        int rightIdx = 2 * parentIdx + 2;
        if (leftIdx < size && array[parentIdx] > array[leftIdx]) return false;
        if (rightIdx < size && array[parentIdx] > array[rightIdx]) return false;
    }
    return true;
}

int main() {
    // Test 1: dequeues the minimum
    auto result1 = pqDequeue({1, 3, 5, 7, 9, 8, 6});
    assert(result1.first == 1);

    // Test 2: remaining is a valid min-heap
    assert(isMinHeapPQD(result1.second));

    // Test 3: remaining length is one less
    assert(result1.second.size() == 6);

    // Test 4: new root is second smallest
    assert(result1.second[0] == 3);

    // Test 5: all elements accounted for
    std::vector<int> original = {1, 3, 5, 7, 9, 8, 6};
    auto result5 = pqDequeue(original);
    std::vector<int> reconstructed = result5.second;
    reconstructed.push_back(result5.first);
    std::sort(reconstructed.begin(), reconstructed.end());
    std::sort(original.begin(), original.end());
    assert(reconstructed == original);

    // Test 6: two-element heap
    auto result6 = pqDequeue({2, 5});
    assert(result6.first == 2 && result6.second == std::vector<int>{5});

    // Test 7: single-element heap
    auto result7 = pqDequeue({42});
    assert(result7.first == 42 && result7.second.empty());

    // Test 8: larger heap
    auto result8 = pqDequeue({2, 5, 3, 10, 15, 8, 7});
    assert(result8.first == 2 && isMinHeapPQD(result8.second));

    printf("All tests passed!\n");
    return 0;
}
