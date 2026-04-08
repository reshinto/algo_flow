#include "../sources/SubarraySumEqualsK.cpp"
#include <cassert>
#include <iostream>
#include <vector>

int main() {
    assert(subarraySumEqualsK({1, 1, 1}, 2) == 2);
    assert(subarraySumEqualsK({1, 2, 3}, 3) == 2);
    assert(subarraySumEqualsK({1, 2, 3}, 10) == 0);
    assert(subarraySumEqualsK({5}, 5) == 1);
    assert(subarraySumEqualsK({5}, 3) == 0);
    assert(subarraySumEqualsK({1, -1, 1}, 1) == 3);
    assert(subarraySumEqualsK({1, 2, 3, 4}, 10) == 1);
    assert(subarraySumEqualsK({0, 0, 0}, 0) == 6);
    assert(subarraySumEqualsK({2, 2, 2, 2}, 4) == 3);
    assert(subarraySumEqualsK({1, -1, 2, -2}, 0) == 3);

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
