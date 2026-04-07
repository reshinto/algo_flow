#include "LowerBoundSearch.cpp"
#include <cassert>
#include <vector>

int main() {
    assert(lowerBoundSearch({1, 3, 3, 5, 5, 5, 8, 12}, 5) == 3);
    assert(lowerBoundSearch({2, 5, 8, 12, 16, 23, 38, 56, 72, 91}, 23) == 5);
    assert(lowerBoundSearch({1, 3, 5, 7, 9}, 10) == 5);
    assert(lowerBoundSearch({5, 10, 15, 20}, 3) == 0);
    assert(lowerBoundSearch({}, 5) == 0);
    assert(lowerBoundSearch({42}, 42) == 0);
    assert(lowerBoundSearch({42}, 100) == 1);
    assert(lowerBoundSearch({5, 10, 15, 20}, 1) == 0);
    assert(lowerBoundSearch({2, 5, 8, 12, 16, 23}, 2) == 0);
    assert(lowerBoundSearch({2, 5, 8, 12, 16}, 6) == 2);
    assert(lowerBoundSearch({5, 5, 5, 5, 5}, 5) == 0);
    assert(lowerBoundSearch({5, 5, 5, 5, 5}, 6) == 5);
    assert(lowerBoundSearch({3, 3, 3, 5, 7}, 3) == 0);

    return 0;
}
