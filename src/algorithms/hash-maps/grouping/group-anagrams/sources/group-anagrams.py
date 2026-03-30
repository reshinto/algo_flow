# Group Anagrams — group words that are anagrams of each other using sorted-key hashing
def group_anagrams(words):
    map = {}  # @step:initialize
    for word_index, word in enumerate(words):
        sorted_key = "".join(sorted(word))  # @step:lookup-key
        if sorted_key in map:
            map[sorted_key].append(word)  # @step:update-value
        else:
            map[sorted_key] = [word]  # @step:insert-key
    return list(map.values())  # @step:complete
