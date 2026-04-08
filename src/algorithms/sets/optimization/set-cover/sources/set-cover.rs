// Greedy Set Cover approximation
// Finds the minimum number of subsets that cover all elements of the universe.
// Time: O(n × m) where n = |universe|, m = |sets|
// Space: O(n + m) for the uncovered set and selected sets tracking

use std::collections::HashSet;

struct SetCoverResult {
    selected_indices: Vec<usize>,
    selected_sets: Vec<Vec<i32>>,
}

fn set_cover(universe: &[i32], sets: &[Vec<i32>]) -> SetCoverResult {
    let mut uncovered: HashSet<i32> = universe.iter().copied().collect(); // @step:initialize
    let mut selected_indices: Vec<usize> = Vec::new();
    let mut selected_sets: Vec<Vec<i32>> = Vec::new();

    while !uncovered.is_empty() {
        // @step:evaluate-set
        let mut best_set_idx: Option<usize> = None;
        let mut best_coverage = 0usize;

        for (set_idx, candidate_set) in sets.iter().enumerate() {
            let coverage = candidate_set.iter().filter(|elem| uncovered.contains(elem)).count(); // @step:evaluate-set
            if coverage > best_coverage {
                best_coverage = coverage;
                best_set_idx = Some(set_idx);
            }
        }

        let Some(chosen_idx) = best_set_idx else {
            break;
        };

        let chosen_set = &sets[chosen_idx];
        selected_indices.push(chosen_idx); // @step:select-set
        selected_sets.push(chosen_set.clone());

        for &element in chosen_set {
            uncovered.remove(&element); // @step:cover-elements
        }
    }

    SetCoverResult { selected_indices, selected_sets } // @step:complete
}

fn main() {
    let universe = vec![1, 2, 3, 4, 5];
    let sets = vec![
        vec![1, 2, 3],
        vec![2, 4],
        vec![3, 4, 5],
        vec![4, 5],
    ];
    let result = set_cover(&universe, &sets);
    println!("Selected indices: {:?}", result.selected_indices);
}
