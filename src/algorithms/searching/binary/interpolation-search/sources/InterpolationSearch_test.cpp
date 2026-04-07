#include "InterpolationSearch.cpp"
#include <cassert>
#include <vector>

int main() {
    std::vector<int> standardArray = {2, 5, 8, 12, 16, 23, 38, 56, 72, 91};

    assert(interpolationSearch(standardArray, 23) == 5);
    assert(interpolationSearch(standardArray, 50) == -1);
    assert(interpolationSearch({}, 5) == -1);
    assert(interpolationSearch({42}, 42) == 0);
    assert(interpolationSearch({42}, 10) == -1);
    assert(interpolationSearch(standardArray, 2) == 0);
    assert(interpolationSearch(standardArray, 91) == 9);
    assert(interpolationSearch({10, 20, 30, 40, 50}, 30) == 2);
    assert(interpolationSearch({5, 10, 15, 20}, 1) == -1);
    assert(interpolationSearch({5, 10, 15, 20}, 100) == -1);
    assert(interpolationSearch({10, 20, 30, 40, 50, 60, 70, 80, 90, 100}, 70) == 6);
    assert(interpolationSearch({5, 5, 5, 5, 5}, 5) == 0);
    assert(interpolationSearch({5, 5, 5, 5, 5}, 7) == -1);

    return 0;
}
