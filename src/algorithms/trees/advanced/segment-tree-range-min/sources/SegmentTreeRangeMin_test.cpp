// g++ -o seg_min_test SegmentTreeRangeMin_test.cpp && ./seg_min_test
#include "SegmentTreeRangeMin.cpp"
#include <cassert>
#include <iostream>

int main() {
    SegmentTreeRangeMin stMin;

    // test: range min for default input
    auto result1 = stMin.segmentTreeRangeMin({2, 5, 1, 4, 9, 3}, {{0, 2}, {3, 5}});
    assert(result1[0] == 1);
    assert(result1[1] == 3);

    // test: single element query
    auto result2 = stMin.segmentTreeRangeMin({4, 2, 6}, {{1, 1}});
    assert(result2[0] == 2);

    // test: full range query
    auto result3 = stMin.segmentTreeRangeMin({3, 1, 4, 1, 5, 9}, {{0, 5}});
    assert(result3[0] == 1);

    // test: multiple queries
    auto result4 = stMin.segmentTreeRangeMin({10, 3, 8, 1, 7}, {{0, 2}, {1, 4}, {3, 4}});
    assert(result4[0] == 3);
    assert(result4[1] == 1);
    assert(result4[2] == 1);

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
