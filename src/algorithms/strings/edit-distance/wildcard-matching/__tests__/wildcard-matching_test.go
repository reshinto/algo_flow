package main

import "testing"

func TestWildcardMatchingAdcebStarAStarB(t *testing.T) {
	if !wildcardMatching("adceb", "*a*b") {
		t.Error("expected true")
	}
}

func TestWildcardMatchingAaAFalse(t *testing.T) {
	if wildcardMatching("aa", "a") {
		t.Error("expected false")
	}
}

func TestWildcardMatchingAaStar(t *testing.T) {
	if !wildcardMatching("aa", "*") {
		t.Error("expected true")
	}
}

func TestWildcardMatchingEmptyMatchesEmpty(t *testing.T) {
	if !wildcardMatching("", "") {
		t.Error("expected true")
	}
}

func TestWildcardMatchingAbcAQuestionC(t *testing.T) {
	if !wildcardMatching("abc", "a?c") {
		t.Error("expected true")
	}
}

func TestWildcardMatchingAbcAQuestionBFalse(t *testing.T) {
	if wildcardMatching("abc", "a?b") {
		t.Error("expected false")
	}
}

func TestWildcardMatchingAnyStringStar(t *testing.T) {
	if !wildcardMatching("anylongstring", "*") {
		t.Error("expected true")
	}
}

func TestWildcardMatchingEmptyTripleStar(t *testing.T) {
	if !wildcardMatching("", "***") {
		t.Error("expected true")
	}
}

func TestWildcardMatchingCbQuestionAFalse(t *testing.T) {
	if wildcardMatching("cb", "?a") {
		t.Error("expected false")
	}
}

func TestWildcardMatchingAdcebStarAStar(t *testing.T) {
	if !wildcardMatching("adceb", "*a*") {
		t.Error("expected true")
	}
}

func TestWildcardMatchingEmptyAFalse(t *testing.T) {
	if wildcardMatching("", "a") {
		t.Error("expected false")
	}
}

func TestWildcardMatchingAbcStarBc(t *testing.T) {
	if !wildcardMatching("abc", "*bc") {
		t.Error("expected true")
	}
}

func TestWildcardMatchingAbcAbc(t *testing.T) {
	if !wildcardMatching("abc", "abc") {
		t.Error("expected true")
	}
}

func TestWildcardMatchingAbcAbcdFalse(t *testing.T) {
	if wildcardMatching("abc", "abcd") {
		t.Error("expected false")
	}
}

func TestWildcardMatchingSingleCharQuestion(t *testing.T) {
	if !wildcardMatching("a", "?") {
		t.Error("expected true")
	}
}
