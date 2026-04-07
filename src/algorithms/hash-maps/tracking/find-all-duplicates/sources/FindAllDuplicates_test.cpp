#include "FindAllDuplicates.cpp"
#include <cassert>
#include <iostream>
#include <vector>

int main() {
    assert((findAllDuplicates({4, 3, 2, 7, 8, 2, 3, 1}) == std::vector<int>{2, 3}));
    assert((findAllDuplicates({1, 1, 2}) == std::vector<int>{1}));
    assert(findAllDuplicates({1, 2, 3}).empty());
    assert(findAllDuplicates({}).empty());
    assert((findAllDuplicates({5, 5}) == std::vector<int>{5}));
    assert((findAllDuplicates({1, 2, 1, 2}) == std::vector<int>{1, 2}));
    assert(findAllDuplicates({7}).empty());
    assert((findAllDuplicates({3, 3, 3}) == std::vector<int>{3, 3}));

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
