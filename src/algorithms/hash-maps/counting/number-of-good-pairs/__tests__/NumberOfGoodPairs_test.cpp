#include "../sources/NumberOfGoodPairs.cpp"
#include <cassert>
#include <iostream>
#include <vector>

int main() {
    assert(numberOfGoodPairs({1, 2, 3, 1, 1, 3}) == 4);
    assert(numberOfGoodPairs({1, 1, 1, 1}) == 6);
    assert(numberOfGoodPairs({1, 2, 3}) == 0);
    assert(numberOfGoodPairs({1, 1}) == 1);
    assert(numberOfGoodPairs({5}) == 0);
    assert(numberOfGoodPairs({}) == 0);
    assert(numberOfGoodPairs({2, 2, 2}) == 3);
    assert(numberOfGoodPairs({-1, -1, 2}) == 1);

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
