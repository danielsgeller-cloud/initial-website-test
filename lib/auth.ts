import crypto from "crypto";

export function sha256(input: string): string {
  return crypto.createHash("sha256").update(input).digest("hex");
}

export function generateToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

export function validatePassword(password: string): { valid: boolean; error?: string } {
  if (password.length < 8) {
    return { valid: false, error: "Password must be at least 8 characters" };
  }
  return { valid: true };
}
