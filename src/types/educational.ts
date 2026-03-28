/**
 * @file educational.ts
 * @module types/educational
 *
 * Structure for per-algorithm educational content rendered in the info drawer.
 */

/**
 * Educational material for one algorithm, formatted as Markdown with optional Mermaid diagrams.
 */
export interface EducationalContent {
  /** High-level explanation of what the algorithm does. */
  overview: string;
  /** Step-by-step walkthrough, often with Mermaid flowcharts. */
  howItWorks: string;
  /** Big-O analysis for time and space. */
  timeAndSpaceComplexity: string;
  /** Performance under best-case and worst-case inputs. */
  bestAndWorstCase: string;
  /** Practical applications and use cases. */
  realWorldUses: string[];
  /** Pros and cons compared to alternative approaches. */
  strengthsAndLimitations: {
    strengths: string[];
    limitations: string[];
  };
  /** When to choose this algorithm over alternatives. */
  whenToUseIt: string;
}
