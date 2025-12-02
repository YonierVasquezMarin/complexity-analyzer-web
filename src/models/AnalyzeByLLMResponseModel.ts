/**
 * Modelo de response para el servicio de análisis por LLM
 * 
 * Representa la respuesta exitosa del endpoint POST /analyze-by-llm
 */

/**
 * Análisis básico de complejidad
 */
export interface BasicComplexity {
  O: string;
  Omega: string;
  Theta: string;
  tight_bound: boolean;
  summary: string;
}

/**
 * Item del análisis paso a paso
 */
export interface StepByStepItem {
  step: number;
  code_line: string;
  explanation: string;
  executions: string;
  complexity_contribution: string;
  detailed_reasoning: string;
}

/**
 * Clasificación de patrones algorítmicos
 */
export interface PatternClassification {
  primary_pattern: string;
  confidence: number;
  characteristics: string[];
  similar_algorithms: string[];
  alternative_approaches?: string | null;
}

/**
 * Representación matemática de la complejidad
 */
export interface MathematicalRepresentation {
  type: string;
  recurrence_relation?: string | null;
  base_case?: string | null;
  solution_method?: string | null;
  solution_steps?: string[] | null;
  summation?: string | null;
  expansion?: string | null;
  final_result: string;
  latex_notation?: string | null;
}

/**
 * Árbol de recursión
 */
export interface RecursionTree {
  format: string;
  diagram: string;
  depth?: string | null;
  nodes_per_level?: number[] | null;
  work_per_level?: string[] | null;
  total_work?: string | null;
}

/**
 * Diagrama de flujo
 */
export interface Flowchart {
  format: string;
  diagram: string;
}

/**
 * Diagramas de ejecución
 */
export interface ExecutionDiagram {
  recursion_tree?: RecursionTree | null;
  flowchart?: Flowchart | null;
}

/**
 * Desglose de costo por instrucción
 */
export interface InstructionBreakdown {
  line: number;
  code: string;
  operation_type: string;
  executions_count: string;
  time_per_execution_us: number;
  total_time_formula: string;
  total_time_n_1000: string;
}

/**
 * Resumen de costos
 */
export interface CostSummary {
  total_time_formula: string;
  for_n_10: string;
  for_n_100: string;
  for_n_1000: string;
  for_n_10000: string;
}

/**
 * Análisis de costo por instrucción
 */
export interface CostAnalysis {
  instruction_breakdown: InstructionBreakdown[];
  summary: CostSummary;
}

/**
 * Uso de tokens
 */
export interface TokenUsage {
  input: number;
  output: number;
  total: number;
}

/**
 * Metadatos del LLM
 */
export interface LLMMetadata {
  model_used: string;
  tokens: TokenUsage;
  estimated_cost_usd?: number | null;
  processing_time_ms?: number | null;
}

/**
 * Modelo de respuesta exitosa para el endpoint POST /analyze-by-llm
 */
export interface AnalyzeByLLMResponseModel {
  pseudocode: string;
  basic_complexity: BasicComplexity;
  step_by_step_analysis: StepByStepItem[];
  pattern_classification: PatternClassification;
  mathematical_representation: MathematicalRepresentation;
  execution_diagram?: ExecutionDiagram | null;
  cost_analysis?: CostAnalysis | null;
  llm_metadata: LLMMetadata;
}

/**
 * Modelo de respuesta con error para el endpoint POST /analyze-by-llm
 */
export interface AnalyzeByLLMErrorResponseModel {
  error: string;
  details: string;
}

