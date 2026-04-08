#include "sources/BogoSort.cpp"
#include <cassert>
#include <vector>
#include <iostream>

int main() {
    // sorts a small array using seeded PRNG
    assert((bogoSort({3, 1, 2}) == std::vector<int>{1, 2, 3}));

    // handles an already sorted array
    assert((bogoSort({1, 2, 3}) == std::vector<int>{1, 2, 3}));

    // handles a single element array
    assert((bogoSort({42}) == std::vector<int>{42}));

    // handles an empty array
    assert((bogoSort({}) == std::vector<int>{}));

    // does not mutate the original array
    std::vector<int> original = {3, 1, 2};
    std::vector<int> sorted = bogoSort(original);
    assert((sorted == std::vector<int>{1, 2, 3}));
    assert((original == std::vector<int>{3, 1, 2}));

    // produces a sorted result within cap
    std::vector<int> twoElement = bogoSort({2, 1});
    assert(twoElement.size() == 2);
    assert(twoElement[0] <= twoElement[1]);

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
