import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import type { Response } from "express";

interface ErrorBody {
  statusCode: number;
  code?: string;
  message: string;
}

const MESSAGE_TO_CODE: Record<string, string> = {
  "An account with this email already exists": "EMAIL_EXISTS",
  "An account with this phone already exists": "PHONE_EXISTS",
  "Invalid email or password": "INVALID_CREDENTIALS",
  "This account has been suspended": "ACCOUNT_SUSPENDED",
  "This account request was rejected": "ACCOUNT_REJECTED",
  "Your account has not been approved yet": "ACCOUNT_PENDING",
  "You do not have permission to perform this action": "FORBIDDEN",
  "You cannot change your own status": "FORBIDDEN",
  "Only a super admin can modify admin accounts": "FORBIDDEN",
  "Invalid account status transition": "INVALID_STATUS_TRANSITION",
  "Refresh token is invalid or expired": "UNAUTHORIZED",
  "Access token is invalid or expired": "UNAUTHORIZED",
  "Missing bearer token": "UNAUTHORIZED",
  "Account no longer exists": "UNAUTHORIZED",
  "Account not found": "NOT_FOUND",
};

@Catch()
export class ApiExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = "Internal server error";
    let code: string | undefined = undefined;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const payload = exception.getResponse();
      if (typeof payload === "string") {
        message = payload;
      } else if (payload && typeof payload === "object") {
        const obj = payload as Record<string, unknown>;
        if (typeof obj.message === "string") {
          message = obj.message;
        } else if (Array.isArray(obj.message)) {
          message = obj.message.join("; ");
          code = "VALIDATION_FAILED";
        }
        if (typeof obj.code === "string") {
          code = obj.code;
        }
      }
      if (status === HttpStatus.TOO_MANY_REQUESTS) {
        code = "RATE_LIMITED";
      }
    } else if (process.env.NODE_ENV !== "production") {
      message =
        exception instanceof Error ? exception.message : "Unexpected error";
    }

    if (!code) {
      code = MESSAGE_TO_CODE[message];
    }

    const body: ErrorBody = { statusCode: status, message };
    if (code) body.code = code;

    response.status(status).json(body);
  }
}
