#include "SortNearlySorted.cpp"
#include <cassert>
#include <vector>
#include <iostream>

int main() {
    assert((sortNearlySorted({6,5,3,2,8,10,9}, 3) == std::vector<int>{2,3,5,6,8,9,10}));
    assert((sortNearlySorted({1,2,3,4,5}, 0) == std::vector<int>{1,2,3,4,5}));
    assert((sortNearlySorted({2,1,4,3,6,5}, 1) == std::vector<int>{1,2,3,4,5,6}));
    assert((sortNearlySorted({42}, 0) == std::vector<int>{42}));
    assert((sortNearlySorted({2,1}, 1) == std::vector<int>{1,2}));
    assert((sortNearlySorted({5,4,3,2,1}, 4) == std::vector<int>{1,2,3,4,5}));
    assert((sortNearlySorted({3,3,1,1,2}, 2) == std::vector<int>{1,1,2,3,3}));
    std::cout << "All tests passed!" << std::endl;
    return 0;
}
