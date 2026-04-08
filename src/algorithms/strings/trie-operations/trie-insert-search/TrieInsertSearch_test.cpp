/** Correctness tests for the trieInsertSearch function. */
#include "sources/TrieInsertSearch.cpp"
#include <cassert>
#include <iostream>
#include <vector>
#include <string>

int main() {
    assert(trieInsertSearch({"apple", "app"}, "app") == true);
    assert(trieInsertSearch({"apple"}, "ap") == false);
    assert(trieInsertSearch({"apple", "app"}, "apple") == true);
    assert(trieInsertSearch({"apple", "app", "apricot"}, "banana") == false);
    assert(trieInsertSearch({}, "app") == false);
    assert(trieInsertSearch({"hello"}, "hello") == true);
    assert(trieInsertSearch({"app"}, "apple") == false);
    assert(trieInsertSearch({"cat", "dog", "bird"}, "dog") == true);
    assert(trieInsertSearch({"cat", "dog", "bird"}, "fox") == false);
    assert(trieInsertSearch({"apple", "apple"}, "apple") == true);
    assert(trieInsertSearch({"a", "b", "c"}, "b") == true);
    assert(trieInsertSearch({"apple", "app"}, "") == false);
    std::cout << "All tests passed!" << std::endl;
    return 0;
}
