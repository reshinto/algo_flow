#define TESTING
#include "sources/CountMinSketch.cpp"
#include <cassert>
#include <algorithm>
#include <iostream>

int main() {
    // returns results for inserted elements
    auto results1 = countMinSketch({3, 3, 7, 7, 7, 11}, {3, 7, 11, 5}, 8, 3);
    auto hasValue3 = std::any_of(results1.begin(), results1.end(), [](const EstimatedResult& r){ return r.value == 3; });
    auto hasValue7 = std::any_of(results1.begin(), results1.end(), [](const EstimatedResult& r){ return r.value == 7; });
    auto hasValue11 = std::any_of(results1.begin(), results1.end(), [](const EstimatedResult& r){ return r.value == 11; });
    assert(hasValue3);
    assert(hasValue7);
    assert(hasValue11);

    // non-inserted element should not appear
    auto hasValue5 = std::any_of(results1.begin(), results1.end(), [](const EstimatedResult& r){ return r.value == 5; });
    assert(!hasValue5);

    // estimated count for element 7 at least 3
    auto results2 = countMinSketch({3, 3, 7, 7, 7, 11}, {7}, 8, 3);
    auto it7 = std::find_if(results2.begin(), results2.end(), [](const EstimatedResult& r){ return r.value == 7; });
    assert(it7 != results2.end());
    assert(it7->estimatedCount >= 3);

    // empty elements returns empty results
    auto results3 = countMinSketch({}, {3, 7}, 8, 3);
    assert(results3.empty());

    // never undercounts
    auto results4 = countMinSketch({1, 1, 1, 2, 2, 3}, {1, 2, 3}, 16, 4);
    auto it1 = std::find_if(results4.begin(), results4.end(), [](const EstimatedResult& r){ return r.value == 1; });
    auto it2 = std::find_if(results4.begin(), results4.end(), [](const EstimatedResult& r){ return r.value == 2; });
    auto it3 = std::find_if(results4.begin(), results4.end(), [](const EstimatedResult& r){ return r.value == 3; });
    assert(it1->estimatedCount >= 3);
    assert(it2->estimatedCount >= 2);
    assert(it3->estimatedCount >= 1);

    // single element inserted once
    auto results5 = countMinSketch({42}, {42}, 8, 3);
    assert(results5.size() == 1);
    assert(results5[0].estimatedCount >= 1);

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
