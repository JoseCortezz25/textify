"use client";

import { Button, Label, Separator, Skeleton, Textarea } from '@/components/ui';
import './copy-page.css';
import { cn } from '@/utils/utils';
import { FORMAT, LENGTH, TONES } from '@/utils/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import SheetButton from '@/components/SheetButton';
import { useState } from 'react';
import { generateCopy } from '@/services/getDocs';
import { generateCopyPrompt } from '@/utils/prompts';
import Warning from '@/components/Warning';
import { toast } from 'sonner';
import { Copy } from 'lucide-react';

const PageCopy = () => {
  const MAX_CHARACTERS = 4000;
  // const countText = 0;
  const [countText, setCountText] = useState<number>(0);
  const [instruction, setInstruction] = useState('');
  const [objective, setObjective] = useState<string>('');
  const [audience, setAudience] = useState<string>('');
  const [tone, setTone] = useState<TONES>(TONES.PROFESSIONAL);
  const [format, setFormat] = useState<FORMAT>(FORMAT.PARAGRAPH);
  const [length, setLength] = useState<LENGTH>(LENGTH.MEDIUM);
  const [generatedText, setGeneratedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const submitGenerateCopy = () => {
    if (!instruction) {
      toast.error('Debes ingresar una instrucción');
      return;
    }

    setIsLoading(true);
    generateCopy(instruction, objective, audience, tone, format)
      .then((response) => {
        setGeneratedText(response);
      })
      .catch((error) => {
        console.error('Error generating copy', error);
        toast.error('Error generando el texto');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  const onCopy = () => {
    if (!generatedText) return;
    navigator.clipboard.writeText(generatedText);
    toast.success('Texto copiado al portapapeles');
  };

  const handleIntruction = (value: string) => {
    if (value.length >= MAX_CHARACTERS) return;
    setInstruction(value);
    setCountText(value.length);
  };


  const SkeletonTextarea = () => {
    return (
      <div className="space-y-2">
        <Skeleton className="w-[95%] h-[20px] bg-black/20 dark:bg-white/20" />
        <Skeleton className="w-full h-[20px] bg-black/20 dark:bg-white/20" />
        <Skeleton className="w-[70%] h-[20px] bg-black/20 dark:bg-white/20" />
        <Skeleton className="w-[40%] h-[20px] bg-black/20 dark:bg-white/20" />
        <Skeleton className="w-[92%] h-[20px] bg-black/20 dark:bg-white/20" />
        <Skeleton className="w-[22%] h-[20px] bg-black/20 dark:bg-white/20" />
      </div>
    );
  };

  return (
    <div className="copy-page">
      <div className="left-column">
        <SheetButton />
        <h1 className="title-page">Textify <strong>Copy</strong></h1>
        <p className="mt-3">
          Herramienta que permite generar contenido de calidad.
        </p>
        <Separator className="my-5" />

        <div className="group-field">
          <Label className='subtitle-group'>Objetivo del mensaje</Label>
          <Textarea
            placeholder='Describe el objetivo del mensaje que deseas transmitir'
            className='min-h-[110px] max-h-[190px]'
            onChange={(e) => setObjective(e.target.value)}
            value={objective}
          />
        </div>

        <div className="group-field">
          <Label className='subtitle-group'>Audiencia</Label>
          <Textarea
            placeholder='Describe la audiencia objetiva de tu mensaje'
            className='min-h-[110px] max-h-[190px]'
            onChange={(e) => setAudience(e.target.value)}
            value={audience}
          />
        </div>

        <div className="group-field">
          <Label className='subtitle-group' htmlFor="message">Tamaño del texto</Label>
          <div className="rounded-md overflow-hidden border border-gray-200 dark:border-slate-800 grid grid-cols-3">
            <button
              role="button"
              className={cn('text-[15px] w-full grid place-content-center py-2 px-4 hover:bg-gray-200 dark:hover:bg-slate-800/50 duration-200 transition-all ease-in-out', length === LENGTH.SHORT && 'bg-gray-200 dark:bg-slate-800')}
              onClick={() => setLength(LENGTH.SHORT)}
            >
              Corto
            </button>
            <button
              role="button"
              className={cn('text-[15px] w-full grid place-content-center py-2 px-4 hover:bg-gray-200 dark:hover:bg-slate-800/50 duration-200 transition-all ease-in-out', length === LENGTH.MEDIUM && 'bg-gray-200 dark:bg-slate-800')}
              onClick={() => setLength(LENGTH.MEDIUM)}
            >
              Mediano
            </button>
            <button
              role="button"
              className={cn('text-[15px] w-full grid place-content-center py-2 px-4 hover:bg-gray-200 dark:hover:bg-slate-800/50 duration-200 transition-all ease-in-out', length === LENGTH.LONG && 'bg-gray-200 dark:bg-slate-800')}
              onClick={() => setLength(LENGTH.LONG)}
            >
              Largo
            </button>
          </div>

        </div>

        <div className="group-field">
          <Label className="subtitle-group" htmlFor="message">Elige el tono</Label>

          <Select>
            <SelectTrigger className="w-full" onChange={(e) => setTone('profesional')}>
              <SelectValue placeholder="Elige el tono de tu preferencia" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="profesional" className="cursor-pointer
">
                <div className="flex space-x-3 items-center py-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
                  </svg>

                  <p>Profesional</p>
                </div>
              </SelectItem>
              <SelectItem value="antusiasmado" className="cursor-pointer
">
                <div className="flex space-x-3 items-center py-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                  </svg>

                  <p>Entusiasta</p>
                </div>
              </SelectItem>
              <SelectItem value="informativo" className="cursor-pointer
">
                <div className="flex space-x-3 items-center py-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                  </svg>

                  <p>Informativo</p>
                </div>
              </SelectItem>
              <SelectItem value="divertido" className="cursor-pointer
">
                <div className="flex space-x-3 items-center py-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
                  </svg>

                  <p>Divertido</p>
                </div>
              </SelectItem>
              <SelectItem value="informal" className="cursor-pointer
">
                <div className="flex space-x-3 items-center py-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
                  </svg>

                  <p>Informal</p>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="group-field">
          <Label className="subtitle-group" htmlFor="message">Estructura</Label>

          <Select onValueChange={(value: FORMAT) => setFormat(value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Elige el tono de tu preferencia" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={FORMAT.PARAGRAPH} className="cursor-pointer">
                <div className="flex space-x-3 items-center py-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
                  </svg>

                  <p>Parrafo</p>
                </div>
              </SelectItem>
              <SelectItem value={FORMAT.IDEAS} className="cursor-pointer">
                <div className="flex space-x-3 items-center py-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-5">
                    <path strokeLinecap="round" stroke-linejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                  </svg>

                  <p>Bullet</p>
                </div>
              </SelectItem>

            </SelectContent>
          </Select>
        </div>

      </div>

      <Separator orientation="vertical" className="hidden lg:flex w-[2px] h-[95vh]" />
      <Separator orientation="horizontal" className="lg:hidden w-full h-[2px] mb-20" />

      <div className="right-column">
        <div className="bg-[#F9F9FA] dark:bg-[#030b1d] rounded-xl py-3 px-5">
          <div className="group-field mt-3">
            <Label htmlFor="initial-message">Ingresa la idea principal</Label>
            <div className="relative">
              <Textarea
                name="initial-message"
                placeholder="Añade instrucciones complementarias"
                className='min-h-[180px] max-h-[450px] resize-none'
                onChange={(e) => handleIntruction(e.target.value)}
                value={instruction}
              />
              <Button className="absolute bottom-3 right-3" onClick={submitGenerateCopy}>Generar texto</Button>
            </div>
          </div>
          <p className={cn('text-[12px] mb-4 -mt-4', countText > MAX_CHARACTERS - 200 && 'text-yellow-400', countText > MAX_CHARACTERS - 50 && 'text-red-500')}><span>{countText}</span> / <span>{MAX_CHARACTERS}</span></p>

          <div className="min-h-[500px]">
            {!isLoading ? (
              <div>
                <Textarea
                  className="min-h-[500px] bg-transparent mt-4 border-none without-ring resize-none"
                  value={generatedText}
                  onChange={(e) => setGeneratedText(e.target.value)}
                />
                <Button
                  variant="secondary"
                  className="mt-4 space-x-2"
                  onClick={onCopy}
                >
                  <Copy className='size-4' />
                  <span>Copiar</span>
                </Button>
              </div>
            ) : (
              <SkeletonTextarea />
            )}
          </div>
        </div>
      </div>
    </div >
  )
}

export default PageCopy