#define TESTING
#include "../sources/CuckooFilter.cpp"
#include <cassert>
#include <iostream>

int main() {
    // finds all inserted elements
    auto results1 = cuckooFilter({3, 7, 11, 15}, {3, 7, 11, 15}, 32);
    for (const auto& entry : results1) {
        assert(entry.found);
    }

    // returns result entry for every query
    std::vector<int> queries = {1, 2, 3, 4, 5};
    auto results2 = cuckooFilter({1, 3}, queries, 8);
    assert(results2.size() == 5);
    for (int queryIdx = 0; queryIdx < (int)queries.size(); queryIdx++) {
        assert(results2[queryIdx].value == queries[queryIdx]);
    }

    // empty elements — all queries not found
    auto results3 = cuckooFilter({}, {5, 10, 15}, 8);
    for (const auto& entry : results3) {
        assert(!entry.found);
    }

    // empty queries — empty results
    auto results4 = cuckooFilter({1, 2, 3}, {}, 8);
    assert(results4.empty());

    // single element and single matching query
    auto results5 = cuckooFilter({42}, {42}, 16);
    assert(results5[0].found);

    // large bucket count — all inserted elements found
    auto results6 = cuckooFilter({100, 200, 300}, {100, 200, 300}, 1024);
    for (const auto& entry : results6) {
        assert(entry.found);
    }

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
