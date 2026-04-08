#include "sources/SentinelLinearSearch.cpp"
#include <cassert>
#include <vector>

int main() {
    assert(sentinelLinearSearch({4, 2, 7, 1, 9, 3, 8, 5}, 9) == 4);
    assert(sentinelLinearSearch({4, 2, 7, 1, 9, 3, 8, 5}, 6) == -1);
    assert(sentinelLinearSearch({}, 5) == -1);
    assert(sentinelLinearSearch({42}, 42) == 0);
    assert(sentinelLinearSearch({42}, 10) == -1);
    assert(sentinelLinearSearch({4, 2, 7, 1, 9, 3, 8, 5}, 4) == 0);
    assert(sentinelLinearSearch({4, 2, 7, 1, 9, 3, 8, 5}, 5) == 7);
    assert(sentinelLinearSearch({3, 1, 3, 5, 3}, 3) == 0);
    assert(sentinelLinearSearch({7, 7, 7, 7}, 7) == 0);
    assert(sentinelLinearSearch({7, 7, 7, 7}, 5) == -1);
    assert(sentinelLinearSearch({-5, -3, 0, 2, 4}, -3) == 1);
    assert(sentinelLinearSearch({-5, -3, 0, 2, 4}, -1) == -1);

    return 0;
}
