const ACCESS_TOKEN_COOKIE = "simonegentili.com-access-token";

function getCookie(name: string): string | null {
    const match = document.cookie.split("; ").find((c) => c.startsWith(`${name}=`));
    return match ? match.slice(name.length + 1) : null;
}

function decodeJwtPayload(token: string): Record<string, unknown> | null {
    const payload = token.split(".")[1];
    if (!payload) return null;
    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    try {
        return JSON.parse(atob(base64));
    } catch {
        return null;
    }
}

// The JWT is issued by api.simonegentili.com and shared via a cookie scoped to
// .simonegentili.com, so a user already logged into quadrato/tome is
// recognized here too, without eddiethor needing its own login flow.
export function getUsername(): string | null {
    const token = getCookie(ACCESS_TOKEN_COOKIE);
    if (!token) return null;
    const payload = decodeJwtPayload(token);
    return typeof payload?.sub === "string" ? payload.sub : null;
}

// A cookie with `domain=.simonegentili.com` or `secure` is silently dropped
// by the browser when set from an origin that isn't an HTTPS
// *.simonegentili.com page (e.g. local dev on http://localhost) - scope those
// attributes to when they'd actually be honored, so login also works locally.
function cookieScopeAttributes(): string {
    const attrs: string[] = [];
    if (location.hostname.endsWith("simonegentili.com")) {
        attrs.push("domain=.simonegentili.com");
    }
    if (location.protocol === "https:") {
        attrs.push("secure");
    }
    return attrs.length ? `; ${attrs.join("; ")}` : "";
}

// Authenticates against the same endpoint quadrato uses, so the resulting
// token cookie is recognized across every .simonegentili.com subdomain.
export async function login(username: string, password: string): Promise<void> {
    const res = await fetch("https://api.simonegentili.com/quadrato/authenticate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    });
    if (!res.ok) {
        throw new Error(`Authentication failed: ${res.status}`);
    }
    const data = await res.json();
    const token = data.token || data.access_token;
    if (!token) {
        throw new Error("No token in response");
    }
    document.cookie = `${ACCESS_TOKEN_COOKIE}=${token}; path=/${cookieScopeAttributes()}; samesite=strict`;
}

export function logout(): void {
    document.cookie = `${ACCESS_TOKEN_COOKIE}=; path=/${cookieScopeAttributes()}; expires=Thu, 01 Jan 1970 00:00:00 GMT; samesite=strict`;
}
