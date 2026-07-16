# Local PostgreSQL Security — IPLAY Platform

> **Development only.** This document describes the isolated PostgreSQL cluster used
> for local development. It must never be used as a production configuration.

## Overview

| Setting | Value |
|---------|-------|
| PostgreSQL version | 18 |
| Data directory | `.local/pgdata` (git-ignored) |
| Port | **5433** (avoids conflict with system PostgreSQL on 5432) |
| Database name | `iplay` |
| Database user | `iplay` |
| Connection string (dev) | `postgresql://iplay@localhost:5433/iplay` |

The `.local/` directory is excluded from Git and must not be deployed or uploaded.

## Network binding

Verified settings (2026-07-15):

```sql
SHOW listen_addresses;  -- localhost
SHOW port;              -- 5433
```

PostgreSQL listens on **localhost only**. It does not bind to `0.0.0.0` or `*`.

## Authentication (`pg_hba.conf`)

Trust authentication is enabled **only** for local connections:

```text
host  all  all  127.0.0.1/32  trust
host  all  all  ::1/128       trust
local all  all                trust
```

There are **no** rules such as `0.0.0.0/0` or `all` for remote hosts. External
network connections are not permitted by these rules combined with
`listen_addresses = localhost`.

> **Warning:** `trust` is acceptable only on an isolated local development machine.
> It must **never** be used in production or on any server reachable from a network.

## Production requirements

Production and staging environments must:

1. Use strong, unique passwords stored in hosting secrets (not in the repository).
2. Prefer `scram-sha-256` authentication (PostgreSQL default encryption:
   `password_encryption = scram-sha-256`).
3. Restrict `listen_addresses` and firewall rules to trusted application hosts only.
4. Never commit `.env` files or database credentials.
5. Never use the `.local/pgdata` directory outside local development.

## Starting and stopping the local cluster

From the repository root (Windows, PostgreSQL 18):

**Start:**

```powershell
& "C:\Program Files\PostgreSQL\18\bin\pg_ctl.exe" -D .local\pgdata -o "-p 5433" -l .local\pg.log -w start
```

**Stop:**

```powershell
& "C:\Program Files\PostgreSQL\18\bin\pg_ctl.exe" -D .local\pgdata -w stop
```

**Status:**

```powershell
& "C:\Program Files\PostgreSQL\18\bin\pg_ctl.exe" -D .local\pgdata status
```

After a reboot, only the **start** command is needed (the data directory persists).

## Docker alternative

When Docker is available, use `docker/docker-compose.yml`. That configuration:

- Binds PostgreSQL to `127.0.0.1:5433` only.
- Uses password authentication via environment variables (not `trust`).
- Does not contain production credentials.

**Stop** the API dev server before running `npx prisma generate` on Windows —
a running NestJS process locks the Prisma query engine DLL and causes `EPERM`.
This is not a schema failure; validate and migrate work independently.

## Related files

- `apps/api/.env.example` — example `DATABASE_URL` (no secrets)
- `.gitignore` — ignores `.local/` and all `.env` files
- `docs/PRE-DAY-02-AUDIT.md` — pre-Day-2 security verification record
