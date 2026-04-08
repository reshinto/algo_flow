#include "../sources/MergeKSortedArrays.cpp"
#include <cassert>
#include <vector>
#include <iostream>

int main() {
    assert((mergeKSortedArrays({{1,4,7},{2,5,8},{3,6,9}}) == std::vector<int>{1,2,3,4,5,6,7,8,9}));
    assert((mergeKSortedArrays({{1},{2,3,4},{5,6}}) == std::vector<int>{1,2,3,4,5,6}));
    assert((mergeKSortedArrays({{1,2,3}}) == std::vector<int>{1,2,3}));
    assert((mergeKSortedArrays({{1,3,5},{2,4,6}}) == std::vector<int>{1,2,3,4,5,6}));
    assert((mergeKSortedArrays({{3},{1},{2}}) == std::vector<int>{1,2,3}));
    assert((mergeKSortedArrays({{1,3,3},{2,3,4}}) == std::vector<int>{1,2,3,3,3,4}));
    assert((mergeKSortedArrays({{-3,-1,0},{-2,1,2}}) == std::vector<int>{-3,-2,-1,0,1,2}));
    std::cout << "All tests passed!" << std::endl;
    return 0;
}
