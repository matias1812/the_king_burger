// userContext.js
import create from 'zustand';
import { app, auth } from '../firebaseConfig';
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

const useUserStore = create((set) => {
  const storedUser = JSON.parse(localStorage.getItem('user'));

  return {
    user: storedUser || null,
    setUser: (user) => {
      localStorage.setItem('user', JSON.stringify(user));
      set({ user });
    },
    logout: async () => {
      localStorage.removeItem('user');
      await signOut(auth);
      set({ user: null });
    },
  };
});

export const loginUserWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    useUserStore.getState().setUser(result.user);
  } catch (error) {
    console.error('Error al iniciar sesión con Google:', error.message);
  }
};

export const logoutUser = async () => {
  await useUserStore.getState().logout();
};

export default useUserStore;
