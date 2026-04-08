// g++ -o SumOfSubarrayMinimums_test SumOfSubarrayMinimums_test.cpp && ./SumOfSubarrayMinimums_test
#define TESTING
#include "sources/SumOfSubarrayMinimums.cpp"
#include <cassert>
#include <iostream>
#include <vector>

int main() {
    assert(sumOfSubarrayMinimums({3, 1, 2, 4}) == 17);
    assert(sumOfSubarrayMinimums({11, 81, 94, 43, 3}) == 444);
    assert(sumOfSubarrayMinimums({5}) == 5);
    assert(sumOfSubarrayMinimums({2, 2, 2}) == 12);
    assert(sumOfSubarrayMinimums({1, 2, 3}) == 10);
    assert(sumOfSubarrayMinimums({3, 2, 1}) == 10);
    assert(sumOfSubarrayMinimums({1, 1}) == 3);

    std::vector<long long> largeArray(100, 30000);
    long long largeResult = sumOfSubarrayMinimums(largeArray);
    assert(largeResult >= 0 && largeResult < 1000000007LL);

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
