#include "sources/SubarraySumEqualsK.cpp"
#include <cassert>
#include <vector>
#include <iostream>

int main() {
    assert(subarraySumEqualsK({1, 2, 3}, 3).first == 2);
    assert(subarraySumEqualsK({1, 2, 3}, 10).first == 0);
    assert(subarraySumEqualsK({5, 1, 3}, 5).first == 1);
    assert(subarraySumEqualsK({}, 3).first == 0);
    assert(subarraySumEqualsK({3, 3, 3}, 3).first == 3);
    assert(subarraySumEqualsK({0, 0, 0}, 0).first == 6);
    assert(subarraySumEqualsK({7}, 7).first == 1);
    assert(subarraySumEqualsK({4}, 7).first == 0);

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
