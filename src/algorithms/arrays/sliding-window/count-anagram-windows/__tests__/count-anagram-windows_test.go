package countanagramwindows

import "testing"

func TestBasicArray(t *testing.T) {
	count, positions := countAnagramWindows([]int{1, 2, 3, 1, 2, 1, 3, 2, 1}, []int{1, 2, 3})
	if count == 0 {
		t.Error("Expected count > 0")
	}
	found := false
	for _, pos := range positions {
		if pos == 0 {
			found = true
		}
	}
	if !found {
		t.Error("Expected position 0 in results")
	}
}

func TestAnagramAtFirstPosition(t *testing.T) {
	_, positions := countAnagramWindows([]int{3, 1, 2, 4, 5}, []int{1, 2, 3})
	found := false
	for _, pos := range positions {
		if pos == 0 {
			found = true
		}
	}
	if !found {
		t.Error("Expected position 0 in results")
	}
}

func TestNoAnagram(t *testing.T) {
	count, positions := countAnagramWindows([]int{1, 1, 1, 1}, []int{1, 2})
	if count != 0 || len(positions) != 0 {
		t.Error("Expected no matches")
	}
}

func TestPatternEqualsTextLength(t *testing.T) {
	count, positions := countAnagramWindows([]int{3, 1, 2}, []int{1, 2, 3})
	if count != 1 {
		t.Errorf("Expected count=1, got %d", count)
	}
	if len(positions) != 1 || positions[0] != 0 {
		t.Errorf("Expected positions=[0], got %v", positions)
	}
}

func TestPatternLongerThanText(t *testing.T) {
	count, _ := countAnagramWindows([]int{1, 2}, []int{1, 2, 3})
	if count != 0 {
		t.Errorf("Expected count=0, got %d", count)
	}
}

func TestEmptyText(t *testing.T) {
	count, _ := countAnagramWindows([]int{}, []int{1, 2})
	if count != 0 {
		t.Errorf("Expected count=0, got %d", count)
	}
}

func TestEmptyPattern(t *testing.T) {
	count, _ := countAnagramWindows([]int{1, 2, 3}, []int{})
	if count != 0 {
		t.Errorf("Expected count=0, got %d", count)
	}
}

func TestCountMatchesPositionsLength(t *testing.T) {
	count, positions := countAnagramWindows([]int{1, 2, 3, 1, 2, 1, 3, 2, 1}, []int{1, 2, 3})
	if count != len(positions) {
		t.Errorf("count=%d does not match len(positions)=%d", count, len(positions))
	}
}
