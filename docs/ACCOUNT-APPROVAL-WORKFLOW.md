# Account Approval Workflow — Velvet Kids

## Public registration roles

Allowed:

- `CUSTOMER` → initial status `APPROVED`
- `MARKETER` → initial status `PENDING`
- `WHOLESALE_TRADER` → initial status `PENDING`

Rejected by DTO validation (never created via public registration):

- `ORDER_EMPLOYEE`
- `SALES_MANAGER`
- `ADMIN`
- `SUPER_ADMIN`

## Statuses

```text
PENDING | APPROVED | REJECTED | SUSPENDED
```

## Allowed transitions

| From | To |
|---|---|
| PENDING | APPROVED, REJECTED |
| APPROVED | SUSPENDED |
| SUSPENDED | APPROVED |
| REJECTED | _(none)_ |

## Admin review UI

Route: `/[locale]/admin/accounts`

Allowed roles: `ADMIN`, `SUPER_ADMIN` (must also be `APPROVED`).

Actions: Approve, Reject, Suspend, Reactivate — each requires confirmation.

Filters: status and role.

Partner profile summary is shown when `MarketerProfile` or `WholesaleTraderProfile` exists.

## Safety rules

- An administrator cannot change their own status.
- Only a `SUPER_ADMIN` may modify `ADMIN` / `SUPER_ADMIN` accounts.
- Backend RBAC and status checks are authoritative; the frontend only improves UX.

## Audit history

Model: `AccountStatusHistory`

Records on every status change:

- user being reviewed
- reviewer
- previous status
- new status
- optional note
- timestamp

This is a dedicated status-history table, not a full platform-wide audit module.

## Partner experience

- Pending partners may sign in and land on `/account/pending`.
- Rejected / suspended partners see the matching status pages.
- Approved-only partner trading features remain future work; public shopping and WhatsApp ordering stay available without approval.
