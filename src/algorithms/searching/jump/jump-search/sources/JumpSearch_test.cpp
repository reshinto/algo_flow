#include "JumpSearch.cpp"
#include <cassert>
#include <vector>

int main() {
    std::vector<int> standardArray = {2, 5, 8, 12, 16, 23, 38, 56, 72, 91};

    assert(jumpSearch(standardArray, 56) == 7);
    assert(jumpSearch(standardArray, 50) == -1);
    assert(jumpSearch({}, 5) == -1);
    assert(jumpSearch({42}, 42) == 0);
    assert(jumpSearch({42}, 10) == -1);
    assert(jumpSearch(standardArray, 2) == 0);
    assert(jumpSearch(standardArray, 91) == 9);
    assert(jumpSearch({10, 20, 30, 40, 50}, 30) == 2);
    assert(jumpSearch({5, 10, 15, 20}, 1) == -1);
    assert(jumpSearch({5, 10, 15, 20}, 100) == -1);
    assert(jumpSearch({-10, -5, 0, 3, 7}, -5) == 1);
    assert(jumpSearch({1, 2}, 2) == 1);

    return 0;
}
