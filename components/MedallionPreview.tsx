"use client";

import { useMemo } from "react";

type MedallionPreviewProps = {
  shapeId: string;
  size: string; // e.g., "8 x 10", "6 1/8 x 4 3/8", "2 1/2" (for round)
  finish: "bw" | "color";
};

/**
 * Parse a size string like "8 x 10" or "6 1/8 x 4 3/8" into numeric dimensions
 * For round medallions, the size is just a diameter like "2 1/2"
 */
function parseDimensions(size: string): { width: number; height: number } {
  const cleaned = size.trim();

  // Check if it's a round medallion (single dimension)
  if (!cleaned.includes("x")) {
    const diameter = parseFraction(cleaned);
    return { width: diameter, height: diameter };
  }

  // Parse width x height
  const parts = cleaned.split("x").map((p) => p.trim());
  if (parts.length !== 2) {
    return { width: 4, height: 4 }; // fallback
  }

  const width = parseFraction(parts[0]);
  const height = parseFraction(parts[1]);

  return { width, height };
}

/**
 * Parse a fraction string like "6 1/8" or "2.5" into a decimal number
 */
function parseFraction(str: string): number {
  const cleaned = str.trim();

  // Check for whole number with fraction (e.g., "6 1/8")
  const match = cleaned.match(/^(\d+)\s+(\d+)\/(\d+)$/);
  if (match) {
    const whole = parseInt(match[1], 10);
    const numerator = parseInt(match[2], 10);
    const denominator = parseInt(match[3], 10);
    return whole + numerator / denominator;
  }

  // Check for fraction only (e.g., "3/4")
  const fractionMatch = cleaned.match(/^(\d+)\/(\d+)$/);
  if (fractionMatch) {
    const numerator = parseInt(fractionMatch[1], 10);
    const denominator = parseInt(fractionMatch[2], 10);
    return numerator / denominator;
  }

  // Otherwise parse as decimal
  return parseFloat(cleaned) || 0;
}

export default function MedallionPreview({ shapeId, size, finish }: MedallionPreviewProps) {
  const dimensions = useMemo(() => parseDimensions(size), [size]);

  // SVG viewport configuration
  // We'll use 1 inch = 40 units for good visual scaling
  const scale = 40;
  const padding = 60; // padding for axis labels
  const gridSpacing = scale; // 1 inch grid

  const viewportWidth = dimensions.width * scale + padding * 2;
  const viewportHeight = dimensions.height * scale + padding * 2;

  // Calculate grid lines
  const verticalLines = Math.ceil(dimensions.width) + 1;
  const horizontalLines = Math.ceil(dimensions.height) + 1;

  // Generate the shape path
  const shapeX = padding;
  const shapeY = padding;
  const shapeWidth = dimensions.width * scale;
  const shapeHeight = dimensions.height * scale;

  let shapePath = "";
  let shapeElement;

  switch (shapeId) {
    case "oval":
    case "additional-oval":
      // Oval (ellipse)
      shapeElement = (
        <ellipse
          cx={shapeX + shapeWidth / 2}
          cy={shapeY + shapeHeight / 2}
          rx={shapeWidth / 2}
          ry={shapeHeight / 2}
          fill={finish === "color" ? "#f59e0b" : "#737373"}
          fillOpacity={0.3}
          stroke={finish === "color" ? "#d97706" : "#404040"}
          strokeWidth={2}
        />
      );
      break;

    case "rectangle":
      // Rectangle
      shapeElement = (
        <rect
          x={shapeX}
          y={shapeY}
          width={shapeWidth}
          height={shapeHeight}
          fill={finish === "color" ? "#f59e0b" : "#737373"}
          fillOpacity={0.3}
          stroke={finish === "color" ? "#d97706" : "#404040"}
          strokeWidth={2}
          rx={4}
        />
      );
      break;

    case "heart":
      // Heart shape (approximated with path)
      const heartCenterX = shapeX + shapeWidth / 2;
      const heartCenterY = shapeY + shapeHeight / 2;
      const heartW = shapeWidth;
      const heartH = shapeHeight;

      shapePath = `
        M ${heartCenterX} ${heartCenterY + heartH * 0.3}
        C ${heartCenterX} ${heartCenterY + heartH * 0.3},
          ${heartCenterX - heartW * 0.5} ${heartCenterY - heartH * 0.1},
          ${heartCenterX - heartW * 0.25} ${heartCenterY - heartH * 0.4}
        C ${heartCenterX - heartW * 0.25} ${heartCenterY - heartH * 0.5},
          ${heartCenterX} ${heartCenterY - heartH * 0.5},
          ${heartCenterX} ${heartCenterY - heartH * 0.3}
        C ${heartCenterX} ${heartCenterY - heartH * 0.5},
          ${heartCenterX + heartW * 0.25} ${heartCenterY - heartH * 0.5},
          ${heartCenterX + heartW * 0.25} ${heartCenterY - heartH * 0.4}
        C ${heartCenterX + heartW * 0.5} ${heartCenterY - heartH * 0.1},
          ${heartCenterX} ${heartCenterY + heartH * 0.3},
          ${heartCenterX} ${heartCenterY + heartH * 0.3}
        Z
      `;

      shapeElement = (
        <path
          d={shapePath}
          fill={finish === "color" ? "#f59e0b" : "#737373"}
          fillOpacity={0.3}
          stroke={finish === "color" ? "#d97706" : "#404040"}
          strokeWidth={2}
        />
      );
      break;

    case "round":
      // Circle
      shapeElement = (
        <circle
          cx={shapeX + shapeWidth / 2}
          cy={shapeY + shapeHeight / 2}
          r={shapeWidth / 2}
          fill={finish === "color" ? "#f59e0b" : "#737373"}
          fillOpacity={0.3}
          stroke={finish === "color" ? "#d97706" : "#404040"}
          strokeWidth={2}
        />
      );
      break;

    default:
      // Default to oval
      shapeElement = (
        <ellipse
          cx={shapeX + shapeWidth / 2}
          cy={shapeY + shapeHeight / 2}
          rx={shapeWidth / 2}
          ry={shapeHeight / 2}
          fill={finish === "color" ? "#f59e0b" : "#737373"}
          fillOpacity={0.3}
          stroke={finish === "color" ? "#d97706" : "#404040"}
          strokeWidth={2}
        />
      );
  }

  return (
    <div className="rounded-lg border border-neutral-200 bg-white p-4">
      <div className="mb-2">
        <h3 className="text-sm font-semibold text-neutral-700">Medallion Preview</h3>
        <p className="text-xs text-neutral-500">
          {dimensions.width}" × {dimensions.height}" {finish === "color" ? "(Color)" : "(B&W)"}
        </p>
      </div>

      <div className="flex items-center justify-center">
        <svg
          width={viewportWidth}
          height={viewportHeight}
          viewBox={`0 0 ${viewportWidth} ${viewportHeight}`}
          className="max-w-full"
        >
          {/* Background */}
          <rect width={viewportWidth} height={viewportHeight} fill="#fafafa" />

          {/* Grid lines */}
          <g stroke="#e5e5e5" strokeWidth={1}>
            {/* Vertical grid lines */}
            {Array.from({ length: verticalLines }).map((_, i) => (
              <line
                key={`v-${i}`}
                x1={padding + i * gridSpacing}
                y1={padding}
                x2={padding + i * gridSpacing}
                y2={padding + dimensions.height * scale}
                strokeDasharray={i === 0 || i === verticalLines - 1 ? "0" : "4,4"}
              />
            ))}

            {/* Horizontal grid lines */}
            {Array.from({ length: horizontalLines }).map((_, i) => (
              <line
                key={`h-${i}`}
                x1={padding}
                y1={padding + i * gridSpacing}
                x2={padding + dimensions.width * scale}
                y2={padding + i * gridSpacing}
                strokeDasharray={i === 0 || i === horizontalLines - 1 ? "0" : "4,4"}
              />
            ))}
          </g>

          {/* Medallion shape */}
          {shapeElement}

          {/* Axis labels */}
          <g fill="#525252" fontSize="11" fontFamily="sans-serif">
            {/* X-axis labels (width) */}
            {Array.from({ length: verticalLines }).map((_, i) => (
              <text
                key={`x-label-${i}`}
                x={padding + i * gridSpacing}
                y={padding + dimensions.height * scale + 20}
                textAnchor="middle"
              >
                {i}"
              </text>
            ))}

            {/* Y-axis labels (height) */}
            {Array.from({ length: horizontalLines }).map((_, i) => (
              <text
                key={`y-label-${i}`}
                x={padding - 20}
                y={padding + i * gridSpacing + 4}
                textAnchor="middle"
              >
                {i}"
              </text>
            ))}

            {/* Axis titles */}
            <text
              x={padding + (dimensions.width * scale) / 2}
              y={viewportHeight - 10}
              textAnchor="middle"
              fontSize="12"
              fontWeight="600"
            >
              Width (inches)
            </text>

            <text
              x={15}
              y={padding + (dimensions.height * scale) / 2}
              textAnchor="middle"
              fontSize="12"
              fontWeight="600"
              transform={`rotate(-90, 15, ${padding + (dimensions.height * scale) / 2})`}
            >
              Height (inches)
            </text>
          </g>
        </svg>
      </div>
    </div>
  );
}
