import importlib

group_anagrams = importlib.import_module("group-anagrams").group_anagrams


def test_groups_into_three_anagram_buckets():
    result = group_anagrams(["eat", "tea", "tan", "ate", "nat", "bat"])
    assert len(result) == 3


def test_places_eat_tea_ate_in_same_group():
    result = group_anagrams(["eat", "tea", "tan", "ate", "nat", "bat"])
    eat_group = next(grp for grp in result if "eat" in grp)
    assert "tea" in eat_group
    assert "ate" in eat_group


def test_places_tan_nat_in_same_group():
    result = group_anagrams(["eat", "tea", "tan", "ate", "nat", "bat"])
    tan_group = next(grp for grp in result if "tan" in grp)
    assert "nat" in tan_group


def test_places_bat_alone():
    result = group_anagrams(["eat", "tea", "tan", "ate", "nat", "bat"])
    bat_group = next(grp for grp in result if "bat" in grp)
    assert len(bat_group) == 1


def test_handles_single_word():
    result = group_anagrams(["hello"])
    assert len(result) == 1
    assert result[0] == ["hello"]


def test_handles_all_same_anagram():
    result = group_anagrams(["abc", "bca", "cab"])
    assert len(result) == 1
    assert len(result[0]) == 3


def test_handles_no_shared_anagrams():
    result = group_anagrams(["abc", "def", "ghi"])
    assert len(result) == 3
    for grp in result:
        assert len(grp) == 1


def test_handles_empty_strings():
    result = group_anagrams(["", ""])
    assert len(result) == 1
    assert len(result[0]) == 2


def test_returns_all_original_words():
    words = ["eat", "tea", "tan", "ate", "nat", "bat"]
    result = group_anagrams(words)
    all_words = sorted([word for grp in result for word in grp])
    assert all_words == sorted(words)


if __name__ == "__main__":
    test_groups_into_three_anagram_buckets()
    test_places_eat_tea_ate_in_same_group()
    test_places_tan_nat_in_same_group()
    test_places_bat_alone()
    test_handles_single_word()
    test_handles_all_same_anagram()
    test_handles_no_shared_anagrams()
    test_handles_empty_strings()
    test_returns_all_original_words()
    print("All tests passed!")
