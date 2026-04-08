#include "sources/MinRotatedArray.cpp"
#include <cassert>
#include <vector>

int main() {
    assert(minRotatedArray({4, 5, 6, 7, 0, 1, 2}) == 0);
    assert(minRotatedArray({1, 2, 3, 4, 5}) == 1);
    assert(minRotatedArray({2, 3, 4, 5, 1}) == 1);
    assert(minRotatedArray({42}) == 42);
    assert(minRotatedArray({2, 1}) == 1);
    assert(minRotatedArray({1, 2}) == 1);
    assert(minRotatedArray({0, 1, 2, 4, 5, 6, 7}) == 0);
    assert(minRotatedArray({11, 13, 15, 17, 2, 5, 6, 7}) == 2);
    assert(minRotatedArray({3, 4, 5, 6, 7, 8, 1}) == 1);
    assert(minRotatedArray({6, 7, 0, 1, 2, 3, 4, 5}) == 0);
    assert(minRotatedArray({3, 1, 2}) == 1);
    assert(minRotatedArray({5, 6, 7, 1, 2, 3, 4}) == 1);

    return 0;
}
