package heaps

import "testing"

func hasAdjacentDuplicatesRS(text string) bool {
	runes := []rune(text)
	for idx := 1; idx < len(runes); idx++ {
		if runes[idx] == runes[idx-1] {
			return true
		}
	}
	return false
}

func TestReorganizeStringAabbc(t *testing.T) {
	result := reorganizeString("aabbc")
	if len(result) != 5 {
		t.Errorf("Expected length 5, got %d", len(result))
	}
	if hasAdjacentDuplicatesRS(result) {
		t.Error("Result has adjacent duplicates")
	}
}

func TestReorganizeStringImpossibleAaab(t *testing.T) {
	if reorganizeString("aaab") != "" {
		t.Error("Expected empty string for impossible case")
	}
}

func TestReorganizeStringSingleChar(t *testing.T) {
	if reorganizeString("a") != "a" {
		t.Error("Expected 'a'")
	}
}

func TestReorganizeStringTwoDifferent(t *testing.T) {
	result := reorganizeString("ab")
	if len(result) != 2 || hasAdjacentDuplicatesRS(result) {
		t.Errorf("Expected valid 2-char rearrangement, got %q", result)
	}
}

func TestReorganizeStringAab(t *testing.T) {
	result := reorganizeString("aab")
	if len(result) != 3 || hasAdjacentDuplicatesRS(result) {
		t.Errorf("Expected valid 3-char rearrangement, got %q", result)
	}
}

func TestReorganizeStringImpossibleAaa(t *testing.T) {
	if reorganizeString("aaa") != "" {
		t.Error("Expected empty string for impossible case")
	}
}

func TestReorganizeStringImpossibleAa(t *testing.T) {
	if reorganizeString("aa") != "" {
		t.Error("Expected empty string for impossible case")
	}
}

func TestReorganizeStringAllUnique(t *testing.T) {
	result := reorganizeString("abcde")
	if len(result) != 5 || hasAdjacentDuplicatesRS(result) {
		t.Errorf("Expected valid 5-char rearrangement, got %q", result)
	}
}
