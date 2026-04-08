#include "../sources/BozoSort.cpp"
#include <cassert>
#include <vector>
#include <iostream>

int main() {
    // sorts a small array using seeded PRNG
    assert((bozoSort({3, 1, 2}) == std::vector<int>{1, 2, 3}));

    // handles an already sorted array
    assert((bozoSort({1, 2, 3}) == std::vector<int>{1, 2, 3}));

    // handles a single element array
    assert((bozoSort({42}) == std::vector<int>{42}));

    // handles an empty array
    assert((bozoSort({}) == std::vector<int>{}));

    // produces a result with the same length as input
    assert(bozoSort({3, 1, 2}).size() == 3);

    // does not mutate the original array
    std::vector<int> original = {3, 1, 2};
    std::vector<int> sorted = bozoSort(original);
    assert((sorted == std::vector<int>{1, 2, 3}));
    assert((original == std::vector<int>{3, 1, 2}));

    // handles a 2-element array
    assert((bozoSort({2, 1}) == std::vector<int>{1, 2}));

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
