#define TESTING
#include "../sources/BloomFilter.cpp"
#include <cassert>
#include <iostream>

int main() {
    // returns results for default input
    auto results1 = bloomFilter({3, 7, 11, 15}, {3, 5, 7, 9, 11}, 16, 3);
    assert(results1.size() == 5);

    // no false negatives for inserted elements
    auto results2 = bloomFilter({3, 7, 11, 15}, {3, 7, 11, 15}, 16, 3);
    for (const auto& entry : results2) {
        assert(entry.found);
    }

    // no insertions — all queries not found
    auto results3 = bloomFilter({}, {1, 2, 3, 4, 5}, 16, 3);
    for (const auto& entry : results3) {
        assert(!entry.found);
    }

    // empty queries returns empty results
    auto results4 = bloomFilter({3, 7, 11}, {}, 16, 3);
    assert(results4.empty());

    // larger bit array — no false negatives
    auto results5 = bloomFilter({100, 200, 300}, {100, 200, 300}, 512, 5);
    for (const auto& entry : results5) {
        assert(entry.found);
    }

    // single inserted element found
    auto results6 = bloomFilter({42}, {42}, 16, 3);
    assert(results6[0].found);

    // preserves query order
    std::vector<int> queries = {3, 5, 7, 9, 11};
    auto results7 = bloomFilter({3, 7, 11, 15}, queries, 16, 3);
    for (int queryIdx = 0; queryIdx < (int)queries.size(); queryIdx++) {
        assert(results7[queryIdx].value == queries[queryIdx]);
    }

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
