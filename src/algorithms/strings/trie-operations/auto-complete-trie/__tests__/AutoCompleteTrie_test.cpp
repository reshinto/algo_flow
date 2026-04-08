/** Correctness tests for the autoCompleteTrie function. */
#include "../sources/AutoCompleteTrie.cpp"
#include <cassert>
#include <iostream>
#include <vector>
#include <string>
#include <algorithm>

bool containsStr(const std::vector<std::string>& vec, const std::string& val) {
    return std::find(vec.begin(), vec.end(), val) != vec.end();
}

int main() {
    std::vector<std::string> result1 = autoCompleteTrie({"apple", "app", "apricot", "banana", "bat"}, "ap");
    assert(result1.size() == 3);
    assert(containsStr(result1, "app"));
    assert(containsStr(result1, "apple"));
    assert(containsStr(result1, "apricot"));

    std::vector<std::string> singleMatch = autoCompleteTrie({"apple", "banana", "cherry"}, "ban");
    assert(singleMatch.size() == 1 && containsStr(singleMatch, "banana"));

    assert(autoCompleteTrie({"apple", "app", "apricot"}, "ba").empty());
    assert(autoCompleteTrie({"apple", "app"}, "xyz").empty());
    assert(autoCompleteTrie({}, "ap").empty());

    std::vector<std::string> prefixResult = autoCompleteTrie({"apple", "app", "apricot"}, "app");
    assert(prefixResult.size() == 2);
    assert(containsStr(prefixResult, "app") && containsStr(prefixResult, "apple"));

    std::vector<std::string> helloResult = autoCompleteTrie({"hello"}, "hel");
    assert(helloResult.size() == 1 && helloResult[0] == "hello");

    assert(autoCompleteTrie({"hello"}, "world").empty());

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
