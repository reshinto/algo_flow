// Jewels and Stones — count how many stones are also jewels using a hash set
#include <string>
#include <unordered_set>

int jewelsAndStones(const std::string& jewels, const std::string& stones) {
    std::unordered_set<char> jewelSet; // @step:initialize
    for (char jewelChar : jewels) {
        jewelSet.insert(jewelChar); // @step:insert-key
    }
    int count = 0;
    for (char stone : stones) {
        if (jewelSet.count(stone)) {
            // @step:lookup-key
            count++; // @step:key-found
        } else {
            // @step:key-not-found
        }
    }
    return count; // @step:complete
}
