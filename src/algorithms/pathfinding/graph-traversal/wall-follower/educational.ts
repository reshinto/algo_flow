import type { EducationalContent } from "@/types";

export const wallFollowerEducational: EducationalContent = {
  overview:
    "**Wall Follower** (right-hand rule) solves mazes by always keeping the right hand in contact with a wall. The agent starts facing a direction, and at each step tries to turn right; if blocked, it continues forward; if still blocked, it turns left; if all three are blocked, it reverses.\n\nThis simple local rule guarantees maze exit in any simply-connected maze (one with no isolated walls forming loops) without any map or memory.",

  howItWorks:
    "1. Start at the origin, facing right.\n" +
    "2. At each step, evaluate movement priority:\n" +
    "   - **Turn right** and move if the right cell is open.\n" +
    "   - **Move forward** if the right is blocked but forward is open.\n" +
    "   - **Turn left** and move if right and forward are blocked but left is open.\n" +
    "   - **Reverse** (turn 180°) if all three are blocked.\n" +
    "3. Move to the new cell and repeat until the goal is reached or the step limit is exceeded.\n\n" +
    "### Direction Priority Diagram\n\n" +
    "```\n" +
    "Current facing: →\n" +
    "Priority 1: ↓ (right turn)   — if open, turn and move\n" +
    "Priority 2: → (forward)      — if open, move ahead\n" +
    "Priority 3: ↑ (left turn)    — if open, turn and move\n" +
    "Priority 4: ← (reverse)      — last resort\n" +
    "```\n\n" +
    "> *The wall always stays to the right — the agent hugs surfaces like a hand trailing along a wall.*\n\n" +
    "```mermaid\n" +
    "graph TD\n" +
    "    Robot((Robot)) --\"Right Wall Detected\"--> MoveForward((Move Forward))\n" +
    "    MoveForward --\"Wall Ahead\"--> TurnLeft((Turn Left))\n" +
    "    TurnLeft --\"No Wall\"--> TurnRight((Turn Right))\n" +
    "```\n\n" ,

  timeAndSpaceComplexity:
    "**Time Complexity: `O(V)`**\n\n" +
    "- In simply-connected mazes, the agent visits at most `V` cells before exiting. In the worst case (loops), the step limit `O(V)` terminates the search.\n\n" +
    "**Space Complexity: `O(1)`**\n\n" +
    "- Only the current position and facing direction are stored — no queue, visited set, or parent map required.",

  bestAndWorstCase:
    "**Best case** is a direct corridor from start to end aligned with the initial facing — the agent moves straight through without any turns.\n\n" +
    "**Worst case** occurs in mazes with loops or isolated obstacles — the agent may circle around a loop without reaching the goal, requiring the step limit to terminate.",

  realWorldUses: [
    "**Autonomous Robots:** Simple embedded robots use wall-following to navigate physical mazes without maps.",
    "**Micromouse Competitions:** Wall-following is a baseline strategy for the maze-solving robot competition.",
    "**Video Game AI:** Ghost AI in older games like Pac-Man used wall-following variants for simple navigation.",
    "**Emergency Egress:** The advice to always follow one wall when lost in a building applies this exact rule.",
  ],

  strengthsAndLimitations: {
    strengths: [
      "O(1) extra space — no data structures needed beyond current position and direction.",
      "Conceptually simple: a 4-priority direction rule is all that is required.",
      "Guarantees maze exit in any simply-connected (loop-free) maze.",
    ],
    limitations: [
      "Fails in mazes with loops or isolated wall islands — the agent can circle indefinitely.",
      "Does not find the shortest path — may traverse a much longer route than optimal.",
      "Not guaranteed to reach all cells — only follows walls, leaving interior regions unexplored.",
    ],
  },

  whenToUseIt:
    "Choose **Wall Follower** when operating with extremely limited memory (embedded hardware), navigating simply-connected mazes, or as a baseline strategy in robotic maze challenges.\n\nAvoid it when the maze has loops or isolated walls, when shortest paths are required, or when complete coverage of the grid is needed.",
};
