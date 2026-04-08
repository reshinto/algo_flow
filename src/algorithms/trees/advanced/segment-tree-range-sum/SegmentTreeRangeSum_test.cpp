// g++ -o seg_sum_test SegmentTreeRangeSum_test.cpp && ./seg_sum_test
#include "sources/SegmentTreeRangeSum.cpp"
#include <cassert>
#include <iostream>

int main() {
    SegmentTreeRangeSum stSum;

    // test: default input
    auto result1 = stSum.segmentTreeRangeSum({1, 3, 5, 7, 9, 11}, {{1, 3}, {0, 5}});
    assert(result1[0] == 15);
    assert(result1[1] == 36);

    // test: single element
    auto result2 = stSum.segmentTreeRangeSum({4, 2, 6}, {{1, 1}});
    assert(result2[0] == 2);

    // test: full range
    auto result3 = stSum.segmentTreeRangeSum({1, 2, 3, 4, 5}, {{0, 4}});
    assert(result3[0] == 15);

    // test: multiple queries
    auto result4 = stSum.segmentTreeRangeSum({10, 20, 30, 40, 50}, {{0, 1}, {2, 4}, {1, 3}});
    assert(result4[0] == 30);
    assert(result4[1] == 120);
    assert(result4[2] == 90);

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
