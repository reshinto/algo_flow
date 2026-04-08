#include "../sources/GroupAnagrams.cpp"
#include <cassert>
#include <iostream>
#include <vector>
#include <string>
#include <algorithm>

static bool groupContains(const std::vector<std::string>& grp, const std::string& word) {
    return std::find(grp.begin(), grp.end(), word) != grp.end();
}

int main() {
    std::vector<std::vector<std::string>> result1 = groupAnagrams({"eat", "tea", "tan", "ate", "nat", "bat"});
    assert(result1.size() == 3);

    const std::vector<std::string>* eatGroup = nullptr;
    for (const auto& grp : result1) {
        if (groupContains(grp, "eat")) { eatGroup = &grp; break; }
    }
    assert(eatGroup != nullptr);
    assert(groupContains(*eatGroup, "tea"));
    assert(groupContains(*eatGroup, "ate"));

    const std::vector<std::string>* batGroup = nullptr;
    for (const auto& grp : result1) {
        if (groupContains(grp, "bat")) { batGroup = &grp; break; }
    }
    assert(batGroup != nullptr && batGroup->size() == 1);

    auto result2 = groupAnagrams({"hello"});
    assert(result2.size() == 1);

    auto result3 = groupAnagrams({"abc", "bca", "cab"});
    assert(result3.size() == 1 && result3[0].size() == 3);

    auto result4 = groupAnagrams({"abc", "def", "ghi"});
    assert(result4.size() == 3);

    auto result5 = groupAnagrams({"", ""});
    assert(result5.size() == 1 && result5[0].size() == 2);

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
