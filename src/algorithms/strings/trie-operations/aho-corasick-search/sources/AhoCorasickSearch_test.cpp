/** Correctness tests for the ahoCorasickSearch function. */
#include "AhoCorasickSearch.cpp"
#include <cassert>
#include <iostream>
#include <vector>
#include <string>
#include <algorithm>

bool contains(const std::vector<std::string>& vec, const std::string& val) {
    return std::find(vec.begin(), vec.end(), val) != vec.end();
}

int main() {
    // classic example
    std::vector<std::string> classicResult = ahoCorasickSearch("ahishers", {"he", "she", "his", "hers"});
    assert(classicResult.size() == 4);
    assert(contains(classicResult, "he"));
    assert(contains(classicResult, "she"));
    assert(contains(classicResult, "his"));
    assert(contains(classicResult, "hers"));

    // no patterns found
    assert(ahoCorasickSearch("hello world", {"xyz", "abc"}).empty());

    // empty patterns
    assert(ahoCorasickSearch("hello", {}).empty());

    // empty text
    assert(ahoCorasickSearch("", {"hello", "world"}).empty());

    // single pattern
    std::vector<std::string> nanResult = ahoCorasickSearch("banana", {"nan"});
    assert(nanResult.size() == 1 && contains(nanResult, "nan"));

    // deduplication
    std::vector<std::string> dedupResult = ahoCorasickSearch("aaaa", {"aa"});
    assert(dedupResult.size() == 1 && contains(dedupResult, "aa"));

    // returns only found
    std::vector<std::string> catResult = ahoCorasickSearch("cat", {"cat", "dog", "bird"});
    assert(catResult.size() == 1 && contains(catResult, "cat"));

    // case sensitive
    assert(ahoCorasickSearch("Hello", {"hello"}).empty());

    // at end
    std::vector<std::string> endResult = ahoCorasickSearch("xyzabc", {"abc"});
    assert(endResult.size() == 1 && contains(endResult, "abc"));

    // at start
    std::vector<std::string> startResult = ahoCorasickSearch("abcxyz", {"abc"});
    assert(startResult.size() == 1 && contains(startResult, "abc"));

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
