#define TESTING
#include "sources/UnionFind.cpp"
#include <cassert>
#include <algorithm>
#include <vector>
#include <numeric>
#include <iostream>

int main() {
    // merges all 8 elements into one component
    std::vector<std::pair<int,int>> ops1 = {{0,1},{2,3},{4,5},{6,7},{0,2},{4,6},{0,4}};
    auto components1 = unionFind(8, ops1);
    assert(components1.size() == 1);
    assert(components1[0].size() == 8);

    // no operations — each element in its own component
    auto components2 = unionFind(4, {});
    assert(components2.size() == 4);
    for (const auto& component : components2) {
        assert(component.size() == 1);
    }

    // single union merges exactly two elements
    auto components3 = unionFind(4, {{0, 1}});
    assert(components3.size() == 3);
    bool foundMerged = false;
    for (const auto& component : components3) {
        if (component.size() == 2) {
            foundMerged = true;
        }
    }
    assert(foundMerged);

    // duplicate union leaves count unchanged
    auto components4 = unionFind(4, {{0, 1}, {0, 1}});
    assert(components4.size() == 3);

    // single element
    auto components5 = unionFind(1, {});
    assert(components5.size() == 1);
    assert(components5[0] == std::vector<int>{0});

    // chain of unions
    auto components6 = unionFind(4, {{0, 1}, {1, 2}, {2, 3}});
    assert(components6.size() == 1);
    assert(components6[0].size() == 4);

    // all elements accounted for
    auto components7 = unionFind(6, {{0, 1}, {2, 3}});
    std::vector<int> allElements;
    for (const auto& component : components7) {
        for (int elem : component) allElements.push_back(elem);
    }
    std::sort(allElements.begin(), allElements.end());
    assert((allElements == std::vector<int>{0, 1, 2, 3, 4, 5}));

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
