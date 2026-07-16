export type UserRole =
  | "CUSTOMER"
  | "MARKETER"
  | "WHOLESALE_TRADER"
  | "ORDER_EMPLOYEE"
  | "SALES_MANAGER"
  | "ADMIN"
  | "SUPER_ADMIN";

export type AccountStatus = "PENDING" | "APPROVED" | "REJECTED" | "SUSPENDED";

export interface HealthResponse {
  status: "ok" | "error";
  service: string;
  timestamp: string;
}

export interface DatabaseHealthResponse {
  status: "ok" | "error";
  database: string;
}
