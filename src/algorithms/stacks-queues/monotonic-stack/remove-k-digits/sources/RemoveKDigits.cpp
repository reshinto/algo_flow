// Remove K Digits — greedy monotonic stack to produce the smallest number after k removals
#include <iostream>
#include <string>
#include <vector>

std::string removeKDigits(const std::string& num, int removalCount) {
    std::vector<char> digitStack; // @step:initialize
    int removalsLeft = removalCount; // @step:initialize

    for (char currentDigit : num) {
        // @step:visit
        // While we still have removals and the stack top is greater than the current digit, pop it
        while (removalsLeft > 0 && !digitStack.empty() && digitStack.back() > currentDigit) { // @step:compare
            digitStack.pop_back(); // @step:pop
            removalsLeft--; // @step:maintain-monotonic
        }
        digitStack.push_back(currentDigit); // @step:push
    }

    // Remove remaining digits from the end if we still have removals left
    while (removalsLeft > 0) {
        digitStack.pop_back(); // @step:pop
        removalsLeft--; // @step:complete
    }

    // Strip leading zeros and return; default to "0" for an empty result
    std::string result(digitStack.begin(), digitStack.end()); // @step:complete
    std::size_t nonZeroPos = result.find_first_not_of('0');
    if (nonZeroPos == std::string::npos) return "0";
    return result.substr(nonZeroPos); // @step:complete
}

int main() {
    std::cout << removeKDigits("1432219", 3) << std::endl;
    return 0;
}
