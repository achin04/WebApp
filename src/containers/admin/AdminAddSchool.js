'use client';
import { ButtonPrimary } from '@/components/Button';
import { useAuth } from '@/lib/useAuth';
import { setSchoolDoc } from '@/lib/writes';
import { useState } from 'react';

export const AdminAddSchool = () => {
  const [schoolName, setschoolName] = useState('');
  const { isAdmin } = useAuth();

  if (!isAdmin) {
    return null;
  }

  const submitSchool = async (e) => {
    e.preventDefault();

    try {
      if (schoolName.length === 0) {
        window.alert('Enter a school');
        return;
      }
      
      const { getAuth } = await import('firebase/auth');
      const auth = getAuth();
      const currentUser = auth.currentUser;

      console.log("Auth user:", currentUser);
      if (!currentUser) {
        console.warn("No user is signed in!");
      }

      await setSchoolDoc(schoolName);
      window.alert(`${schoolName} added`);
      setschoolName('');
    } catch (e) {
      window.alert(e.message);
    }
  };

  return (
    <form
      onSubmit={submitSchool}
      className='space-y-2 bg-gray-100 border rounded p-4'
    >
      <p className='font-medium'>Admin</p>

      <div className='space-x-2'>
        <input
          name='schoolName'
          className='border border-gray-400 rounded p-2'
          type='text'
          placeholder='School Name'
          value={schoolName}
          onChange={(e) => {
            setschoolName(e.target.value);
          }}
        />

        <ButtonPrimary buttonType='submit' onClick={submitSchool}>
          Add School
        </ButtonPrimary>
      </div>
    </form>
  );
};