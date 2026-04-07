// g++ -std=c++17 -o FlattenNestedListIterator_test FlattenNestedListIterator_test.cpp && ./FlattenNestedListIterator_test
#include "FlattenNestedListIterator.cpp"
#include <cassert>
#include <iostream>
#include <vector>

int main() {
    // [[1,[2]],3,[4,[5,6]]]
    NestedItem n1{NestedItemVariant{std::in_place_index<0>, 1}};
    NestedItem n2{NestedItemVariant{std::in_place_index<0>, 2}};
    NestedItem n3{NestedItemVariant{std::in_place_index<0>, 3}};
    NestedItem n4{NestedItemVariant{std::in_place_index<0>, 4}};
    NestedItem n5{NestedItemVariant{std::in_place_index<0>, 5}};
    NestedItem n6{NestedItemVariant{std::in_place_index<0>, 6}};

    NestedItem nested2{NestedItemVariant{std::in_place_index<1>, std::vector<NestedItem>{n2}}};
    NestedItem nested12{NestedItemVariant{std::in_place_index<1>, std::vector<NestedItem>{n1, nested2}}};
    NestedItem nested56{NestedItemVariant{std::in_place_index<1>, std::vector<NestedItem>{n5, n6}}};
    NestedItem nested456{NestedItemVariant{std::in_place_index<1>, std::vector<NestedItem>{n4, nested56}}};

    assert((flattenNestedListIterator({nested12, n3, nested456}) == std::vector<int>{1, 2, 3, 4, 5, 6}));

    // Flat list
    assert((flattenNestedListIterator({n1, n2, n3, n4}) == std::vector<int>{1, 2, 3, 4}));

    // Empty
    assert((flattenNestedListIterator({}) == std::vector<int>{}));

    // [1,[1,1],2,[1,1]] -> [[1,1],2,[1,1]]
    NestedItem a{NestedItemVariant{std::in_place_index<0>, 1}};
    NestedItem b{NestedItemVariant{std::in_place_index<0>, 2}};
    NestedItem listA{NestedItemVariant{std::in_place_index<1>, std::vector<NestedItem>{
        NestedItem{NestedItemVariant{std::in_place_index<0>, 1}},
        NestedItem{NestedItemVariant{std::in_place_index<0>, 1}}
    }}};
    NestedItem listB{NestedItemVariant{std::in_place_index<1>, std::vector<NestedItem>{
        NestedItem{NestedItemVariant{std::in_place_index<0>, 1}},
        NestedItem{NestedItemVariant{std::in_place_index<0>, 1}}
    }}};
    assert((flattenNestedListIterator({listA, b, listB}) == std::vector<int>{1, 1, 2, 1, 1}));

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
