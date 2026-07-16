"use client";

import { useEffect, useState } from "react";
import { apiGet } from "@/lib/api-client";
import type { HealthResponse, DatabaseHealthResponse } from "@/types";
import { Badge } from "./Badge";
import { Loader2 } from "lucide-react";

type ConnectionState = "loading" | "connected" | "error";

interface ServiceStatus {
  label: string;
  state: ConnectionState;
}

export function StatusBadge({ label, state }: ServiceStatus) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground">{label}:</span>
      {state === "loading" && (
        <Badge variant="neutral">
          <Loader2 className="me-1 h-3 w-3 animate-spin" />
          جار التحميل
        </Badge>
      )}
      {state === "connected" && <Badge variant="success">متصل</Badge>}
      {state === "error" && <Badge variant="danger">خطأ</Badge>}
    </div>
  );
}

export function ConnectionStatus() {
  // If this component renders at all, the frontend itself is up.
  const frontend: ConnectionState = "connected";
  const [api, setApi] = useState<ConnectionState>("loading");
  const [database, setDatabase] = useState<ConnectionState>("loading");

  useEffect(() => {
    async function checkApi() {
      try {
        const health = await apiGet<HealthResponse>("/health");
        setApi(health.status === "ok" ? "connected" : "error");

        const dbHealth = await apiGet<DatabaseHealthResponse>("/health/database");
        setDatabase(dbHealth.database === "connected" ? "connected" : "error");
      } catch {
        setApi("error");
        setDatabase("error");
      }
    }

    checkApi();
  }, []);

  return (
    <div className="flex flex-wrap gap-4 rounded-lg border border-border bg-surface p-4">
      <StatusBadge label="الواجهة الأمامية" state={frontend} />
      <StatusBadge label="API" state={api} />
      <StatusBadge label="قاعدة البيانات" state={database} />
    </div>
  );
}
