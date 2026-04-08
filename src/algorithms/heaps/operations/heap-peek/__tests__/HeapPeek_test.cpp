#include "../sources/HeapPeek.cpp"
#include <cassert>
#include <vector>
#include <iostream>

int main() {
    assert(heapPeek({1,3,5,7,9,8,6}).value() == 1);
    assert(heapPeek({42}).value() == 42);
    assert(heapPeek({2,7}).value() == 2);
    assert(heapPeek({1,3,2,7,5,8,4,9,6}).value() == 1);
    std::vector<int> heap = {1, 3, 5, 7};
    assert(heapPeek(heap) == heapPeek(heap));
    std::cout << "All tests passed!" << std::endl;
    return 0;
}
