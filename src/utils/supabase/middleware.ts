import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
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

  const redirect = (path: string) => {
    return NextResponse.redirect(new URL(path, request.url));
  };
  const pathname = (path: string) => {
    return request.nextUrl.pathname === path;
  };

  if (
    user &&
    (pathname("/") ||
      pathname("/auth") ||
      pathname("/auth/login") ||
      pathname("/auth/signup") ||
      pathname("/edit"))
  ) {
    // Navigable: edit/links & edit/profile
    // Generic: terms & user by username
    return redirect("/edit/profile");
  }

  if (
    !user &&
    (pathname("/") ||
      pathname("/auth") ||
      pathname("/edit") ||
      pathname("/edit/profile") ||
      pathname("/edit/links"))
  ) {
    // Navigable: auth/login & auth/signup
    // Generic: terms & user by username
    return redirect("/auth/login");
  }

  return supabaseResponse;
}
