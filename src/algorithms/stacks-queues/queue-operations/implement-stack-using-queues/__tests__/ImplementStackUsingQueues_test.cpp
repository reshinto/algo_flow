// g++ -o ImplementStackUsingQueues_test ImplementStackUsingQueues_test.cpp && ./ImplementStackUsingQueues_test
#define TESTING
#include "../sources/ImplementStackUsingQueues.cpp"
#include <cassert>
#include <iostream>
#include <vector>

int main() {
    assert((implementStackUsingQueues({1, 2, 3, 4, 5}) == std::vector<int>{5, 4, 3, 2, 1}));
    assert((implementStackUsingQueues({10, 20}) == std::vector<int>{20, 10}));
    assert((implementStackUsingQueues({42}) == std::vector<int>{42}));
    assert((implementStackUsingQueues({}) == std::vector<int>{}));
    assert((implementStackUsingQueues({7, 7, 7}) == std::vector<int>{7, 7, 7}));
    assert((implementStackUsingQueues({5, 4, 3, 2, 1}) == std::vector<int>{1, 2, 3, 4, 5}));
    assert((implementStackUsingQueues({1, 2, 3}) == std::vector<int>{3, 2, 1}));
    assert((implementStackUsingQueues({-3, -1, 0, 2}) == std::vector<int>{2, 0, -1, -3}));

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
