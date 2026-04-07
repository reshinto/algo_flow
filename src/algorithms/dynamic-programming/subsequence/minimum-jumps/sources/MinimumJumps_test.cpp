// g++ -o MinimumJumps_test MinimumJumps_test.cpp && ./MinimumJumps_test
#include "MinimumJumps.cpp"
#include <cassert>
#include <iostream>

int main() {
    assert(minimumJumps({2, 3, 1, 1, 4}) == 2);
    assert(minimumJumps({1, 1, 1, 1}) == 3);
    assert(minimumJumps({2, 1}) == 1);
    assert(minimumJumps({0}) == 0);
    assert(minimumJumps({1, 0, 1}) == -1);
    assert(minimumJumps({}) == 0);
    assert(minimumJumps({5, 1, 1, 1, 1}) == 1);

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
