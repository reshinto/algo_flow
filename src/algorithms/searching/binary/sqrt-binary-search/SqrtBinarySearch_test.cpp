#include "sources/SqrtBinarySearch.cpp"
#include <cassert>

int main() {
    assert(sqrtBinarySearch(49) == 7);
    assert(sqrtBinarySearch(8) == 2);
    assert(sqrtBinarySearch(0) == 0);
    assert(sqrtBinarySearch(1) == 1);
    assert(sqrtBinarySearch(4) == 2);
    assert(sqrtBinarySearch(9) == 3);
    assert(sqrtBinarySearch(16) == 4);
    assert(sqrtBinarySearch(2) == 1);
    assert(sqrtBinarySearch(3) == 1);
    assert(sqrtBinarySearch(100) == 10);
    assert(sqrtBinarySearch(99) == 9);
    assert(sqrtBinarySearch(144) == 12);
    assert(sqrtBinarySearch(10) == 3);

    return 0;
}
