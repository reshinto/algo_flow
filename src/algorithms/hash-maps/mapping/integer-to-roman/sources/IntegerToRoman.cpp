// Integer to Roman — convert an integer to its Roman numeral string using a value-symbol lookup table
#include <string>
#include <vector>
#include <utility>

std::string integerToRoman(int value) {
    std::vector<std::pair<int, std::string>> valuePairs; // @step:initialize
    valuePairs.push_back({1000, "M"}); // @step:insert-key
    valuePairs.push_back({900, "CM"}); // @step:insert-key
    valuePairs.push_back({500, "D"}); // @step:insert-key
    valuePairs.push_back({400, "CD"}); // @step:insert-key
    valuePairs.push_back({100, "C"}); // @step:insert-key
    valuePairs.push_back({90, "XC"}); // @step:insert-key
    valuePairs.push_back({50, "L"}); // @step:insert-key
    valuePairs.push_back({40, "XL"}); // @step:insert-key
    valuePairs.push_back({10, "X"}); // @step:insert-key
    valuePairs.push_back({9, "IX"}); // @step:insert-key
    valuePairs.push_back({5, "V"}); // @step:insert-key
    valuePairs.push_back({4, "IV"}); // @step:insert-key
    valuePairs.push_back({1, "I"}); // @step:insert-key
    int remaining = value;
    std::string result;
    for (const auto& [numericValue, symbol] : valuePairs) {
        while (remaining >= numericValue) {
            remaining -= numericValue; // @step:lookup-key
            result += symbol; // @step:key-found
        }
    }
    return result; // @step:complete
}
