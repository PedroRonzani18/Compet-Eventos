import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-[#FFFFFF] dark:bg-black">
      <h1 className="mb-4 text-center">Cadastro</h1>
      <Link href="/addEvent">
        <button className="bg-green-500 hover:bg-blue-600 text-black font-bold py-2 px-4 rounded">
          Adicionar Evento
        </button>
      </Link>
    </main>
  );
}
