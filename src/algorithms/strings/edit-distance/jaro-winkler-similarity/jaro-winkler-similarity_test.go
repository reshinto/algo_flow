package main

import (
	"math"
	"testing"
)

func TestJaroWinklerSimilarityMarthaMarhta(t *testing.T) {
	score := jaroWinklerSimilarity("martha", "marhta")
	if math.Abs(score-0.9611) > 0.0001 {
		t.Errorf("expected ~0.9611, got: %f", score)
	}
}

func TestJaroWinklerSimilarityIdenticalStrings(t *testing.T) {
	if jaroWinklerSimilarity("abc", "abc") != 1.0 {
		t.Error("expected 1.0 for identical strings")
	}
}

func TestJaroWinklerSimilarityTwoEmptyStrings(t *testing.T) {
	if jaroWinklerSimilarity("", "") != 1.0 {
		t.Error("expected 1.0 for two empty strings")
	}
}

func TestJaroWinklerSimilaritySourceEmpty(t *testing.T) {
	if jaroWinklerSimilarity("", "abc") != 0.0 {
		t.Error("expected 0.0 when source is empty")
	}
}

func TestJaroWinklerSimilarityTargetEmpty(t *testing.T) {
	if jaroWinklerSimilarity("abc", "") != 0.0 {
		t.Error("expected 0.0 when target is empty")
	}
}

func TestJaroWinklerSimilarityCompletelyDifferent(t *testing.T) {
	if jaroWinklerSimilarity("abc", "xyz") != 0.0 {
		t.Error("expected 0.0 for completely different strings")
	}
}

func TestJaroWinklerSimilarityCrateTrace(t *testing.T) {
	score := jaroWinklerSimilarity("CRATE", "TRACE")
	if score <= 0.7 || score >= 0.8 {
		t.Errorf("expected score between 0.7 and 0.8, got: %f", score)
	}
}

func TestJaroWinklerSimilarityDwayneDuane(t *testing.T) {
	score := jaroWinklerSimilarity("DwAyNE", "DuANE")
	if score < 0.84 {
		t.Errorf("expected >= 0.84, got: %f", score)
	}
}

func TestJaroWinklerSimilarityIdenticalSingleChars(t *testing.T) {
	if jaroWinklerSimilarity("a", "a") != 1.0 {
		t.Error("expected 1.0 for identical single chars")
	}
}

func TestJaroWinklerSimilarityValueInRange(t *testing.T) {
	score := jaroWinklerSimilarity("algorithm", "logarithm")
	if score < 0.0 || score > 1.0 {
		t.Errorf("expected value between 0.0 and 1.0, got: %f", score)
	}
}

func TestJaroWinklerSimilaritySymmetric(t *testing.T) {
	forward := jaroWinklerSimilarity("martha", "marhta")
	backward := jaroWinklerSimilarity("marhta", "martha")
	if forward != backward {
		t.Errorf("expected symmetric: forward=%f backward=%f", forward, backward)
	}
}

func TestJaroWinklerSimilarityPrefixBonus(t *testing.T) {
	withPrefix := jaroWinklerSimilarity("JOHNSON", "JHNSON")
	withoutPrefix := jaroWinklerSimilarity("AOHNSON", "JHNSON")
	if withPrefix <= withoutPrefix {
		t.Error("expected withPrefix > withoutPrefix")
	}
}

func TestJaroWinklerSimilarityPrefixCappedAtFour(t *testing.T) {
	fourPrefix := jaroWinklerSimilarity("abcdefgh", "abcdXXXX")
	threePrefix := jaroWinklerSimilarity("abcXefgh", "abcdXXXX")
	if fourPrefix <= threePrefix {
		t.Error("expected fourPrefix > threePrefix")
	}
}
