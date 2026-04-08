#include "sources/LastStoneWeight.cpp"
#include <cassert>
#include <vector>
#include <iostream>

int main() {
    assert(lastStoneWeight({2, 7, 4, 1, 8, 1}) == 1);
    assert(lastStoneWeight({1}) == 1);
    assert(lastStoneWeight({5, 5}) == 0);
    assert(lastStoneWeight({3, 7}) == 4);
    assert(lastStoneWeight({1, 3}) == 2);
    assert(lastStoneWeight({1, 1, 1}) == 1);
    assert(lastStoneWeight({4, 4, 4, 4}) == 0);
    assert(lastStoneWeight({10, 4, 2, 10}) == 2);
    std::cout << "All tests passed!" << std::endl;
    return 0;
}
