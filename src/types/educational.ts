/**
 * @file educational.ts
 * @module types/educational
 *
 * Formal structural requirements dictating how the Right-Hand Informational Drawer receives
 * instructional documentation about a specific algorithm logic base.
 */

/**
 * Structured educational material mapped identically to an individual specific Algorithm node.
 * Native fields define precise text (usually Markdown and Mermaid code) parsed physically by `react-markdown`.
 */
export interface EducationalContent {
  /** Primary initial Tab containing fundamental explanations without deep-diving into syntax */
  overview: string;
  /** Heavy-duty explanation typically utilizing Sub-graph Mermaid flowcharts indicating runtime constraints */
  howItWorks: string;
  timeAndSpaceComplexity: string;
  bestAndWorstCase: string;
  /** Broad examples listing specific software architecture implementations utilizing the algorithm natively */
  realWorldUses: string[];
  strengthsAndLimitations: {
    strengths: string[];
    limitations: string[];
  };
  /** Comparative layout analyzing when to use it over algorithmic Alternatives */
  whenToUseIt: string;
}
