import { useSideMenuState } from '@/lib/store';
import { SignInButton, SignOutButton, SignUpButton, useAuth } from '@clerk/nextjs';

export function AuthButtons() {
  const { userId } = useAuth();
  const { setIsOpen } = useSideMenuState();

  return (
    <>
      {!userId ? (
        <div className='py-2 flex items-center justify-between gap-4'>
          <div
            onClick={() => setIsOpen(false)}
            className='bg-muted flex items-center justify-center w-28 h-9 border rounded text-sm hover:bg-foreground/10 *:w-full *:px-6 *:py-2'>
            <SignInButton fallbackRedirectUrl={'/products'} mode='modal'>
              Login
            </SignInButton>
          </div>
          <div
            onClick={() => setIsOpen(false)}
            className='bg-foreground flex items-center justify-center w-28 h-9 rounded text-sm text-background hover:bg-primary/80 *:w-full *:px-6 *:py-2'>
            <SignUpButton fallbackRedirectUrl={'/products'} mode='modal'>
              Sign up
            </SignUpButton>
          </div>
        </div>
      ) : (
        <div
          onClick={() => setIsOpen(false)}
          className='bg-primary text-secondary rounded hover:bg-foreground/80 *:w-full *:px-6 *:py-2'>
          <SignOutButton redirectUrl='/' />
        </div>
      )}
    </>
  );
}