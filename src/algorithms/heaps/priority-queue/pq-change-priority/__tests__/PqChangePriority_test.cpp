#include "../sources/PqChangePriority.cpp"
#include <cassert>
#include <cstdio>
#include <vector>

bool isMinHeapPCP(const std::vector<int>& array) {
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
    // Test 1: decrease priority — new value bubbles up to root
    std::vector<int> result1 = pqChangePriority({2, 5, 3, 10, 15, 8, 7}, 4, 1);
    assert(isMinHeapPCP(result1) && result1[0] == 1);

    // Test 2: increase priority — old root sinks down
    std::vector<int> result2 = pqChangePriority({2, 5, 3, 10, 15, 8, 7}, 0, 20);
    assert(isMinHeapPCP(result2) && result2[0] == 3);

    // Test 3: decrease last element to new minimum
    std::vector<int> result3 = pqChangePriority({1, 3, 5, 7, 9, 8, 6}, 6, 0);
    assert(isMinHeapPCP(result3) && result3[0] == 0);

    // Test 4: increase last element — no structural change needed at root
    std::vector<int> result4 = pqChangePriority({1, 3, 5, 7, 9}, 4, 100);
    assert(isMinHeapPCP(result4));

    // Test 5: same value — heap remains valid
    std::vector<int> result5 = pqChangePriority({2, 5, 3, 10, 15, 8, 7}, 2, 3);
    assert(isMinHeapPCP(result5));

    // Test 6: preserves length
    std::vector<int> result6 = pqChangePriority({2, 5, 3, 10, 15, 8, 7}, 3, 0);
    assert(result6.size() == 7);

    // Test 7: single element
    std::vector<int> result7 = pqChangePriority({5}, 0, 99);
    assert(result7.size() == 1 && result7[0] == 99);

    printf("All tests passed!\n");
    return 0;
}
