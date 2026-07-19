import { NextRequest, NextResponse } from "next/server";

const BACKEND_API_URL =
  process.env.BACKEND_API_URL ||
  process.env.API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:4000/api";

function backendBase(): string {
  return BACKEND_API_URL.replace(/\/$/, "");
}

async function proxy(request: NextRequest, pathSegments: string[]) {
  const targetPath = pathSegments.join("/");
  const url = new URL(request.url);
  const target = `${backendBase()}/${targetPath}${url.search}`;

  const headers = new Headers();
  const contentType = request.headers.get("content-type");
  if (contentType) headers.set("content-type", contentType);
  const authorization = request.headers.get("authorization");
  if (authorization) headers.set("authorization", authorization);
  const cookie = request.headers.get("cookie");
  if (cookie) headers.set("cookie", cookie);
  const accept = request.headers.get("accept");
  if (accept) headers.set("accept", accept);

  const init: RequestInit = {
    method: request.method,
    headers,
    redirect: "manual",
  };

  if (request.method !== "GET" && request.method !== "HEAD") {
    const body = await request.arrayBuffer();
    if (body.byteLength > 0) {
      init.body = body;
    }
  }

  let upstream: Response;
  try {
    upstream = await fetch(target, init);
  } catch {
    return NextResponse.json(
      {
        statusCode: 503,
        code: "API_UNAVAILABLE",
        message: "Authentication API is unavailable",
      },
      { status: 503 },
    );
  }

  const responseHeaders = new Headers();
  const upstreamType = upstream.headers.get("content-type");
  if (upstreamType) responseHeaders.set("content-type", upstreamType);

  // Forward Set-Cookie so HttpOnly refresh cookies attach to the frontend origin.
  const setCookies =
    typeof upstream.headers.getSetCookie === "function"
      ? upstream.headers.getSetCookie()
      : [];
  for (const value of setCookies) {
    // Rewrite cookie Path so the browser sends it to the Next proxy, not only /api/auth on the API host.
    const rewritten = value.replace(/Path=\/api\/auth/gi, "Path=/api/backend/auth");
    responseHeaders.append("set-cookie", rewritten);
  }

  const buffer = await upstream.arrayBuffer();
  return new NextResponse(buffer, {
    status: upstream.status,
    headers: responseHeaders,
  });
}

type RouteContext = { params: Promise<{ path: string[] }> };

export async function GET(request: NextRequest, context: RouteContext) {
  const { path } = await context.params;
  return proxy(request, path);
}

export async function POST(request: NextRequest, context: RouteContext) {
  const { path } = await context.params;
  return proxy(request, path);
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  const { path } = await context.params;
  return proxy(request, path);
}

export async function PUT(request: NextRequest, context: RouteContext) {
  const { path } = await context.params;
  return proxy(request, path);
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  const { path } = await context.params;
  return proxy(request, path);
}
