// Roman to Integer — convert a Roman numeral string to its integer value using a lookup map
#include <string>
#include <unordered_map>

int romanToInteger(const std::string& text) {
    std::unordered_map<char, int> romanMap; // @step:initialize
    romanMap['I'] = 1; // @step:insert-key
    romanMap['V'] = 5; // @step:insert-key
    romanMap['X'] = 10; // @step:insert-key
    romanMap['L'] = 50; // @step:insert-key
    romanMap['C'] = 100; // @step:insert-key
    romanMap['D'] = 500; // @step:insert-key
    romanMap['M'] = 1000; // @step:insert-key
    int totalValue = 0;
    for (int charIndex = 0; charIndex < (int)text.size(); charIndex++) {
        char currentSymbol = text[charIndex]; // @step:lookup-key
        int currentValue = romanMap[currentSymbol]; // @step:key-found
        int nextValue = (charIndex + 1 < (int)text.size()) ? romanMap[text[charIndex + 1]] : 0;
        if (currentValue < nextValue) {
            totalValue -= currentValue; // @step:key-found
        } else {
            totalValue += currentValue; // @step:key-found
        }
    }
    return totalValue; // @step:complete
}
