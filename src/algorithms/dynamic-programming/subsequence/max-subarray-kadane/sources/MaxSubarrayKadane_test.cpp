// g++ -o MaxSubarrayKadane_test MaxSubarrayKadane_test.cpp && ./MaxSubarrayKadane_test
#include "MaxSubarrayKadane.cpp"
#include <cassert>
#include <iostream>

int main() {
    assert(maxSubarrayKadane({-2, 1, -3, 4, -1, 2, 1, -5, 4}) == 6);
    assert(maxSubarrayKadane({1}) == 1);
    assert(maxSubarrayKadane({-1}) == -1);
    assert(maxSubarrayKadane({5, 4, -1, 7, 8}) == 23);
    assert(maxSubarrayKadane({-3, -2, -1}) == -1);

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
