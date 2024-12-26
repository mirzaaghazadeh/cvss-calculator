// CVSS Vector mapping
export const vectorMapping = {
  attackVector: {
    0.85: "N", // Network
    0.62: "A", // Adjacent
    0.55: "L", // Local
    0.20: "P", // Physical
  },
  attackComplexity: {
    0.77: "L", // Low
    0.44: "H", // High
  },
  privilegesRequired: {
    0.85: "N", // None
    0.62: "L", // Low
    0.27: "H", // High
  },
  userInteraction: {
    0.85: "N", // None
    0.62: "R", // Required
  },
  scope: {
    1.0: "U",  // Unchanged
    1.08: "C", // Changed
  },
  confidentiality: {
    0.0: "N",   // None
    0.275: "L", // Low
    0.660: "H", // High
  },
  integrity: {
    0.0: "N",   // None
    0.275: "L", // Low
    0.660: "H", // High
  },
  availability: {
    0.0: "N",   // None
    0.275: "L", // Low
    0.660: "H", // High
  },
} as const;

// Helper type to get the metric name from the mapping
type MetricName = keyof typeof vectorMapping;

// Generate CVSS v3.1 vector string from metric values
export function generateVector(metrics: Record<string, number>): string {
  const vectorParts = Object.entries(metrics).map(([metric, value]) => {
    const metricMap = vectorMapping[metric as MetricName];
    const vectorValue = metricMap[value as keyof typeof metricMap] || "N";
    return `${metric.toUpperCase().slice(0, 2)}:${vectorValue}`;
  });

  return `CVSS:3.1/${vectorParts.join("/")}`;
}