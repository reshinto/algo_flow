package main

import "testing"

func groupContainsWord(grp []string, word string) bool {
	for _, item := range grp {
		if item == word {
			return true
		}
	}
	return false
}

func TestGroupAnagrams_GroupsIntoThreeBuckets(t *testing.T) {
	result := groupAnagrams([]string{"eat", "tea", "tan", "ate", "nat", "bat"})
	if len(result) != 3 {
		t.Errorf("expected 3 groups, got %d", len(result))
	}
}

func TestGroupAnagrams_PlacesEatTeaAteInSameGroup(t *testing.T) {
	result := groupAnagrams([]string{"eat", "tea", "tan", "ate", "nat", "bat"})
	var eatGroup []string
	for _, grp := range result {
		if groupContainsWord(grp, "eat") {
			eatGroup = grp
			break
		}
	}
	if eatGroup == nil {
		t.Fatal("expected group containing 'eat'")
	}
	if !groupContainsWord(eatGroup, "tea") || !groupContainsWord(eatGroup, "ate") {
		t.Error("eat group should contain 'tea' and 'ate'")
	}
}

func TestGroupAnagrams_PlacesBatAlone(t *testing.T) {
	result := groupAnagrams([]string{"eat", "tea", "tan", "ate", "nat", "bat"})
	for _, grp := range result {
		if groupContainsWord(grp, "bat") && len(grp) != 1 {
			t.Error("bat group should have size 1")
		}
	}
}

func TestGroupAnagrams_HandlesSingleWord(t *testing.T) {
	result := groupAnagrams([]string{"hello"})
	if len(result) != 1 {
		t.Errorf("expected 1 group, got %d", len(result))
	}
}

func TestGroupAnagrams_HandlesAllSameAnagram(t *testing.T) {
	result := groupAnagrams([]string{"abc", "bca", "cab"})
	if len(result) != 1 || len(result[0]) != 3 {
		t.Errorf("expected 1 group of 3, got %v", result)
	}
}

func TestGroupAnagrams_HandlesNoSharedAnagrams(t *testing.T) {
	result := groupAnagrams([]string{"abc", "def", "ghi"})
	if len(result) != 3 {
		t.Errorf("expected 3 groups, got %d", len(result))
	}
	for _, grp := range result {
		if len(grp) != 1 {
			t.Errorf("each group should have size 1, got %v", grp)
		}
	}
}

func TestGroupAnagrams_HandlesEmptyStrings(t *testing.T) {
	result := groupAnagrams([]string{"", ""})
	if len(result) != 1 || len(result[0]) != 2 {
		t.Errorf("expected 1 group of 2 empty strings, got %v", result)
	}
}
