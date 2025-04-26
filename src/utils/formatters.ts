/**
 * Utility functions for formatting values
 */

/**
 * Format a number as Indian Rupees (₹)
 * @param value The number to format
 * @param precision Number of decimal places
 * @returns Formatted string with ₹ symbol before the number
 */
export const formatIndianRupees = (value: number | string, precision: number = 0): string => {
  const numValue = typeof value === 'string' ? parseFloat(value) : value;

  if (isNaN(numValue)) {
    return `₹ ${value}`;
  }

  // Format with commas for thousands separator (Indian format)
  const formatter = new Intl.NumberFormat('en-IN', {
    minimumFractionDigits: precision,
    maximumFractionDigits: precision,
  });

  return `₹ ${formatter.format(numValue)}`;
};

/**
 * Format a percentage value
 * @param value The number to format
 * @param precision Number of decimal places
 * @returns Formatted string with % symbol
 */
export const formatPercentage = (value: number | string, precision: number = 1): string => {
  const numValue = typeof value === 'string' ? parseFloat(value) : value;

  if (isNaN(numValue)) {
    return `${value}%`;
  }

  return `${numValue.toFixed(precision)}%`;
};
