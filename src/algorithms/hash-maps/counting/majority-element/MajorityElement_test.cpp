#include "sources/MajorityElement.cpp"
#include <cassert>
#include <iostream>
#include <vector>

int main() {
    assert(majorityElement({2, 2, 1, 1, 1, 2, 2}) == 2);
    assert(majorityElement({3, 2, 3}) == 3);
    assert(majorityElement({1}) == 1);
    assert(majorityElement({1, 1, 1, 1}) == 1);
    assert(majorityElement({5, 5, 5, 1, 2}) == 5);
    assert(majorityElement({1, 2, 1, 1, 3}) == 1);
    assert(majorityElement({7, 7}) == 7);
    assert(majorityElement({9, 9, 9, 9, 1, 2, 3}) == 9);

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
