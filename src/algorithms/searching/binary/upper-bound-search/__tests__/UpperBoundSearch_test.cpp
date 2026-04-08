#include "../sources/UpperBoundSearch.cpp"
#include <cassert>
#include <vector>

int main() {
    assert(upperBoundSearch({1, 3, 3, 5, 5, 5, 8, 12}, 5) == 6);
    assert(upperBoundSearch({2, 4, 6, 8}, 0) == 0);
    assert(upperBoundSearch({1, 2, 3, 4}, 4) == 4);
    assert(upperBoundSearch({1, 2, 3, 4}, 99) == 4);
    assert(upperBoundSearch({}, 5) == 0);
    assert(upperBoundSearch({10}, 5) == 0);
    assert(upperBoundSearch({10}, 10) == 1);
    assert(upperBoundSearch({10}, 20) == 1);
    assert(upperBoundSearch({5, 5, 5, 5, 5}, 5) == 5);
    assert(upperBoundSearch({1, 3, 5, 7, 9}, 1) == 1);
    assert(upperBoundSearch({1, 3, 5, 7, 9}, 9) == 5);
    assert(upperBoundSearch({1, 3, 3, 3, 7}, 3) == 4);

    return 0;
}
