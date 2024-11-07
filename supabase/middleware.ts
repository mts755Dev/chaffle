import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value: '',
            ...options,
          });
        },
      },
    }
  );

  await supabase.auth.getUser();

  let userIp = request.ip;

  if (!userIp && process.env.NODE_ENV === 'development')
    userIp = '91.219.212.89' || '198.199.208.0';

  console.log('User IP', userIp);

  if (userIp) {
    response.cookies.set('ck-user-ip', userIp, { httpOnly: true });
    const userLocation = await (
      await fetch(`http://ip-api.com/json/${userIp}`)
    ).json();

    response.cookies.set('ck-user-location', userLocation.regionName, {
      httpOnly: true,
    });

    response.cookies.set('ck-user-location-short', userLocation.region, {
      httpOnly: true,
    });
  }
  return response;
}
