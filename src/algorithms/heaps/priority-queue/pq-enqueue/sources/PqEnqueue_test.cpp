#include "PqEnqueue.cpp"
#include <cassert>
#include <algorithm>
#include <vector>

bool isMinHeapPQE(const std::vector<int>& array) {
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
    // Test 1: enqueue into empty queue
    std::vector<int> result1 = pqEnqueue({}, 5);
    assert(result1.size() == 1 && result1[0] == 5);

    // Test 2: enqueue larger value — heap stays valid
    std::vector<int> result2 = pqEnqueue({1, 3, 5, 7, 9, 8, 6}, 10);
    assert(isMinHeapPQE(result2) && result2.size() == 8);

    // Test 3: enqueue smaller value — bubbles to root
    std::vector<int> result3 = pqEnqueue({1, 3, 5, 7, 9, 8, 6}, 0);
    assert(isMinHeapPQE(result3) && result3[0] == 0);

    // Test 4: enqueue new minimum into larger heap
    std::vector<int> result4 = pqEnqueue({2, 5, 3, 10, 15, 8, 7}, 1);
    assert(isMinHeapPQE(result4) && result4[0] == 1);

    // Test 5: single-element, enqueue smaller
    std::vector<int> result5 = pqEnqueue({5}, 2);
    assert(result5.size() == 2 && result5[0] == 2);

    // Test 6: all elements present after enqueue
    std::vector<int> original = {1, 3, 5, 7, 9, 8, 6};
    std::vector<int> result6 = pqEnqueue(original, 4);
    std::vector<int> sorted_result = result6;
    std::sort(sorted_result.begin(), sorted_result.end());
    std::vector<int> expected = original;
    expected.push_back(4);
    std::sort(expected.begin(), expected.end());
    assert(sorted_result == expected);

    // Test 7: duplicate value
    std::vector<int> result7 = pqEnqueue({1, 3, 5}, 3);
    assert(isMinHeapPQE(result7));
    assert(std::count(result7.begin(), result7.end(), 3) == 2);

    printf("All tests passed!\n");
    return 0;
}
