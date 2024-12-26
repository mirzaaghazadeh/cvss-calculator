// CVSS v3.1 Metrics with precise decimal values
export const metrics = {
  attackVector: [
    { value: 0.85, label: "Network" },
    { value: 0.62, label: "Adjacent Network" },
    { value: 0.55, label: "Local" },
    { value: 0.20, label: "Physical" },
  ],
  attackComplexity: [
    { value: 0.77, label: "Low" },
    { value: 0.44, label: "High" },
  ],
  privilegesRequired: [
    { value: 0.85, label: "None" },
    { value: 0.62, label: "Low" },
    { value: 0.27, label: "High" },
  ],
  userInteraction: [
    { value: 0.85, label: "None" },
    { value: 0.62, label: "Required" },
  ],
  scope: [
    { value: 1.0, label: "Unchanged" },
    { value: 1.08, label: "Changed" },
  ],
  confidentiality: [
    { value: 0.0, label: "None" },
    { value: 0.275, label: "Low" },
    { value: 0.660, label: "High" },
  ],
  integrity: [
    { value: 0.0, label: "None" },
    { value: 0.275, label: "Low" },
    { value: 0.660, label: "High" },
  ],
  availability: [
    { value: 0.0, label: "None" },
    { value: 0.275, label: "Low" },
    { value: 0.660, label: "High" },
  ],
} as const;

export const calculateCVSSScore = (values: Record<string, number>): number => {
  // Calculate Impact Sub-Score (ISC)
  const ISC = 1 - (
    (1 - values.confidentiality) *
    (1 - values.integrity) *
    (1 - values.availability)
  );

  // Calculate Impact
  const Impact = values.scope === 1.0
    ? 6.42 * ISC
    : 7.52 * (ISC - 0.029) - 3.25 * Math.pow(ISC - 0.02, 15);

  // Calculate Exploitability
  const Exploitability = 8.22 *
    values.attackVector *
    values.attackComplexity *
    values.privilegesRequired *
    values.userInteraction;

  // If Impact <= 0, the Base Score is 0
  if (Impact <= 0) return 0;

  // Calculate Base Score
  const BaseScore = Math.min(10, Impact + Exploitability);
  
  // Round to 1 decimal place
  return Math.round(BaseScore * 10) / 10;
};

export const getSeverityLevel = (score: number): {
  level: string;
  color: string;
} => {
  if (score >= 9.0) return { level: "Critical (P1)", color: "destructive" };
  if (score >= 7.0) return { level: "High (P2)", color: "orange-500" };
  if (score >= 4.0) return { level: "Medium (P3)", color: "yellow-500" };
  if (score > 0.0) return { level: "Low (P4)", color: "green-500" };
  return { level: "None", color: "gray-500" };
};