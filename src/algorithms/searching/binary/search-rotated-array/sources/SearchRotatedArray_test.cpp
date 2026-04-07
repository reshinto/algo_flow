#include "SearchRotatedArray.cpp"
#include <cassert>
#include <vector>

int main() {
    assert(searchRotatedArray({4, 5, 6, 7, 0, 1, 2}, 0) == 4);
    assert(searchRotatedArray({4, 5, 6, 7, 0, 1, 2}, 5) == 1);
    assert(searchRotatedArray({4, 5, 6, 7, 0, 1, 2}, 1) == 5);
    assert(searchRotatedArray({4, 5, 6, 7, 0, 1, 2}, 3) == -1);
    assert(searchRotatedArray({1, 2, 3, 4, 5, 6, 7}, 4) == 3);
    assert(searchRotatedArray({6, 7, 0, 1, 2, 3, 4, 5}, 6) == 0);
    assert(searchRotatedArray({5}, 5) == 0);
    assert(searchRotatedArray({5}, 3) == -1);
    assert(searchRotatedArray({3, 4, 5, 1, 2}, 2) == 4);
    assert(searchRotatedArray({3, 4, 5, 1, 2}, 3) == 0);
    assert(searchRotatedArray({2, 1}, 1) == 1);
    assert(searchRotatedArray({2, 1}, 2) == 0);
    assert(searchRotatedArray({}, 5) == -1);

    return 0;
}
