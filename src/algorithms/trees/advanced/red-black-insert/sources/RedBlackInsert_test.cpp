// g++ -o rb_test RedBlackInsert_test.cpp && ./rb_test
#include "RedBlackInsert.cpp"
#include <cassert>
#include <iostream>
#include <algorithm>

int main() {
    RedBlackInsert rbi;

    // test: single value
    assert(rbi.redBlackInsert({5}) == (std::vector<int>{5}));

    // test: sorted inorder for default input
    std::vector<int> values = {7, 3, 18, 10, 22, 8, 11, 26};
    auto result = rbi.redBlackInsert(values);
    std::sort(values.begin(), values.end());
    assert(result == values);

    // test: ascending insert
    assert(rbi.redBlackInsert({1, 2, 3, 4, 5}) == (std::vector<int>{1, 2, 3, 4, 5}));

    // test: descending insert
    assert(rbi.redBlackInsert({5, 4, 3, 2, 1}) == (std::vector<int>{1, 2, 3, 4, 5}));

    // test: empty input
    assert(rbi.redBlackInsert({}).empty());

    // test: duplicates handled
    assert(!rbi.redBlackInsert({5, 3, 5}).empty());

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
