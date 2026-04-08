// g++ -o ImplementQueueUsingStacks_test ImplementQueueUsingStacks_test.cpp && ./ImplementQueueUsingStacks_test
#define TESTING
#include "../sources/ImplementQueueUsingStacks.cpp"
#include <cassert>
#include <iostream>
#include <vector>

int main() {
    assert((implementQueueUsingStacks({1, 2, 3, 4, 5}) == std::vector<int>{1, 2, 3, 4, 5}));
    assert((implementQueueUsingStacks({10, 20}) == std::vector<int>{10, 20}));
    assert((implementQueueUsingStacks({42}) == std::vector<int>{42}));
    assert((implementQueueUsingStacks({}) == std::vector<int>{}));
    assert((implementQueueUsingStacks({7, 7, 7}) == std::vector<int>{7, 7, 7}));
    assert((implementQueueUsingStacks({5, 4, 3, 2, 1}) == std::vector<int>{5, 4, 3, 2, 1}));
    assert((implementQueueUsingStacks({-3, -1, 0, 2}) == std::vector<int>{-3, -1, 0, 2}));

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
