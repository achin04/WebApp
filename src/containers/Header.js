'use client';
import { signInWithGoogle, signOutFromGoogle } from '@/lib/firebase';
import Link from 'next/link';

export const Header = () => {
  return (
    <div className='py-4 px-8 border-b font-medium flex justify-between'>
      <Link href={'/'}>APP</Link>

      {!loading && (
      <button type='button'
      className='hover:underline'
      onClick={user ?  signOutFromGoogle: signInWithGoogle}
      >
        Log {
            user?<>out</>:<>in</>
        }
      </button>
      )}
    </div>
  );
};