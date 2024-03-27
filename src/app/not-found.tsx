import { Button } from '@/components/ui/button';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Error 404 - Textify'
};

export default function NotFound() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-[80%] md:w-[50%] flex flex-col items-center">
        <h2 className="text-[10rem] leading-[9rem] font-bold">404</h2>
        <h1 className="text-3xl font-semibold mb-5">Not Found</h1>
        <div className="text-center">
          <p>¡Oops! Parece que has llegado a un callejón sin salida digital.</p>
          <p>Pero no te preocupes, estamos aquí para ayudarte a encontrar el camino de vuelta.</p>
          <p className="mt-3">Haz clic en <mask className="underline font-semibold">Regresar al Home</mask> y continúa tu viaje digital. </p>
        </div>
        <Link href="/">
          <Button className="mt-4" variant="default">Regresar al Home</Button>
        </Link>
      </div>
    </div>
  );
}