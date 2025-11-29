'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirecionar para login
    router.push('/login');
  }, [router]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-[#D60000] mb-4">SafeCycle</h1>
        <Loader2 className="w-8 h-8 text-[#D60000] animate-spin mx-auto" />
        <p className="text-gray-400 mt-4">Carregando...</p>
      </div>
    </div>
  );
}
