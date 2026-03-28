---
name: learner-engagement-review
description: Evaluate features and algorithms for learner engagement using adapted Hook Model and AIDA frameworks for educational effectiveness
user-invocable: true
---

# Learner Engagement Review

## Task

Evaluate a proposed feature, new algorithm, or UI change for its impact on learner engagement and educational effectiveness.

## Instructions

1. Identify what is being reviewed: new algorithm, feature, UI change, or educational content
2. Evaluate against the engagement frameworks below
3. Provide actionable feedback for improving educational value

## Evaluation Frameworks

### Hook Model (Adapted for Learning)

Evaluate whether the feature creates a sustainable learning loop:

- **Trigger**: Does it spark curiosity? (e.g., "What happens if I change the input?", "How does this compare to the other algorithm?")
- **Action**: Is the interaction intuitive? Can the learner visualize/run with minimal friction?
- **Variable Reward**: Does each step reveal something new? Are the aha moments distributed across the execution, not front-loaded?
- **Investment**: Does the learner invest in understanding? (modify inputs, try edge cases, compare algorithms)

### AIDA (Adapted for Algorithm Presentation)

Evaluate the algorithm's presentation flow:

- **Attention**: Does the visualization immediately show what the algorithm does? (animated bars, expanding wavefront, path drawing)
- **Interest**: Do step descriptions explain WHY each operation happens, not just WHAT?
- **Desire**: Does the educational content make the learner want to understand deeply? (real-world uses, when to choose this over alternatives)
- **Action**: Is there a clear next step? (try different input, explore related algorithm, read educational content)

### Progressive Complexity

- Simpler concepts presented before complex ones within each category
- Educational content builds from intuition to formal definition
- Visualization complexity matches the algorithm's complexity level

### Input Experimentation

- Can the learner easily modify inputs to test hypotheses?
- Are edge cases discoverable? (empty array, single element, already sorted)
- Does the input editor provide enough feedback for the learner to understand the input format?

## Output Format

- ALIGNED: [feature] - how it serves learner engagement + which framework elements it satisfies
- ADJUST: [feature] - specific reframing to improve educational value
- REJECT: [feature] - why it doesn't serve the learning mission
