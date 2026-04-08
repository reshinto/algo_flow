#include "sources/HashSearch.cpp"
#include <cassert>
#include <vector>

int main() {
    std::vector<int> standardArray = {4, 2, 7, 1, 9, 3, 8, 5};

    assert(hashSearch(standardArray, 9) == 4);
    assert(hashSearch(standardArray, 6) == -1);
    assert(hashSearch({}, 5) == -1);
    assert(hashSearch({42}, 42) == 0);
    assert(hashSearch({42}, 10) == -1);
    assert(hashSearch(standardArray, 4) == 0);
    assert(hashSearch(standardArray, 5) == 7);
    assert(hashSearch({10, 20, 30, 40, 50}, 30) == 2);
    assert(hashSearch({5, 10, 15, 20}, 1) == -1);
    assert(hashSearch({-10, -5, 0, 3, 7}, -5) == 1);
    assert(hashSearch({9, 3, 1, 7, 2, 5}, 7) == 3);

    return 0;
}
