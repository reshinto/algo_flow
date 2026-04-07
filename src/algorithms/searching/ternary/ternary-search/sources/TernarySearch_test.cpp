#include "TernarySearch.cpp"
#include <cassert>
#include <vector>

int main() {
    std::vector<int> standardArray = {2, 5, 8, 12, 16, 23, 38, 56, 72, 91};

    assert(ternarySearch(standardArray, 72) == 8);
    assert(ternarySearch(standardArray, 50) == -1);
    assert(ternarySearch({}, 5) == -1);
    assert(ternarySearch({42}, 42) == 0);
    assert(ternarySearch({42}, 10) == -1);
    assert(ternarySearch(standardArray, 2) == 0);
    assert(ternarySearch(standardArray, 91) == 9);
    assert(ternarySearch({10, 20, 30, 40, 50}, 30) == 2);
    assert(ternarySearch({5, 10, 15, 20}, 1) == -1);
    assert(ternarySearch({5, 10, 15, 20}, 100) == -1);
    assert(ternarySearch({-10, -5, 0, 3, 7}, -5) == 1);
    assert(ternarySearch({1, 2}, 2) == 1);
    assert(ternarySearch({1, 2, 3, 4, 5, 6, 7, 8, 9}, 4) == 3);
    assert(ternarySearch({1, 2, 3, 4, 5, 6, 7, 8, 9}, 7) == 6);

    return 0;
}
