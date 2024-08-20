import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";

export async function updateSession(request) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const redirect = (path) => NextResponse.redirect(new URL(path, request.url));
  const pathname = (path) => request.nextUrl.pathname === path;

  if (
    user &&
    (pathname("/") ||
      pathname("/auth") ||
      pathname("/auth/login") ||
      pathname("/auth/signup") ||
      pathname("/edit"))
  ) {
    // Navigable: auth/change-password & auth/delete-account & edit/links & edit/profile
    // Generic: terms & users
    return redirect("/edit/profile");
  }

  if (
    !user &&
    (pathname("/") ||
      pathname("/auth") ||
      pathname("/auth/change-password") ||
      pathname("/auth/delete-account") ||
      pathname("/edit") ||
      pathname("/edit/profile") ||
      pathname("/edit/links"))
  ) {
    // Navigable: home & auth/login & auth/signup
    // Generic: terms & users
    return redirect("/auth/login");
  }

  return supabaseResponse;
}
