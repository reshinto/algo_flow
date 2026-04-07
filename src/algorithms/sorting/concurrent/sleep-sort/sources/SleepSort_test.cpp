#include "SleepSort.cpp"
#include <cassert>
#include <vector>
#include <iostream>

int main() {
    assert((sleepSort({5, 3, 8, 1, 4, 2, 7, 6}) == std::vector<int>{1, 2, 3, 4, 5, 6, 7, 8}));
    assert((sleepSort({1, 2, 3, 4, 5}) == std::vector<int>{1, 2, 3, 4, 5}));
    assert((sleepSort({5, 4, 3, 2, 1}) == std::vector<int>{1, 2, 3, 4, 5}));
    assert((sleepSort({3, 1, 4, 1, 5, 9, 2, 6}) == std::vector<int>{1, 1, 2, 3, 4, 5, 6, 9}));
    assert((sleepSort({42}) == std::vector<int>{42}));
    assert((sleepSort({}) == std::vector<int>{}));

    std::vector<int> original = {3, 1, 2};
    std::vector<int> sorted = sleepSort(original);
    assert((sorted == std::vector<int>{1, 2, 3}));
    assert((original == std::vector<int>{3, 1, 2}));

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
