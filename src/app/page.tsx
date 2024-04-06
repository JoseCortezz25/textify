'use client';

import { placeholderExamples as placeholders } from '@/utils/data';
import { useRef, useState } from 'react';
import { cn } from '@/utils/utils';
import { FORMAT, LANGUAGE, LENGTH, TONES } from '@/utils/types';
import { toast } from 'sonner';
import {
  Blog,
  Documentation,
  Email,
  ListBullet,
  Paragraph,
  StarsAI,
  TwitterX
} from '@/components/Icons';
import { OptionButton } from '@/components/OptionButton';
import { LanguageOption } from '@/components/LanguageOption';
import { fetchTextFromAI } from '@/services/fetch';
import SheetButton from '@/components/SheetButton';
import { ERROR_MESSAGES } from '@/utils/labels';
import { sendGAEvent } from '@next/third-parties/google';
import {
  Button,
  Label,
  RadioGroup,
  RadioGroupItem,
  Separator,
  Skeleton,
  Textarea
} from '@/components/ui';
import { Copy, Trash2 } from 'lucide-react';

const TextareaSkeleton = () => {
  return (
    <>
      <Skeleton className="h-[20px] w-[60%]" />
      <Skeleton className="h-[20px] w-[55%]" />
      <Skeleton className="h-[20px] w-[65%]" />
      <Skeleton className="h-[20px] w-[63%]" />
      <Skeleton className="h-[20px] w-[43%]" />
    </>
  );
};

export default function Home() {
  const previewTextArea = useRef<HTMLTextAreaElement>(null);
  const [countText, setCountText] = useState(0);
  const [loading, setLoading] = useState(false);
  const [initialMessage, setInitialMessage] = useState('');
  const [tone, setTone] = useState<TONES | undefined>();
  const [format, setFormat] = useState<FORMAT | undefined>();
  const [length, setLength] = useState<LENGTH | undefined>();
  const [preview, setPreview] = useState('');
  const [language, setLanguage] = useState(LANGUAGE.SPANISH);
  const [error, setError] = useState({ error: false, message: '' });

  const MAX_CHARACTERS = 4000;

  const onCopy = () => {
    if (!preview) return;
    navigator.clipboard.writeText(preview);
    toast.success('Texto copiado al portapapeles');
  };

  const onClear = () => {
    setPreview('');

    setLoading(false);
    setTone(undefined);
    setFormat(undefined);
    setLength(undefined);
    setInitialMessage('');
    setLanguage(LANGUAGE.SPANISH);
    setCountText(0);

    setError({ error: false, message: '' });
    if (previewTextArea.current) previewTextArea.current.value = '';

    toast.success('Texto limpiado');
  };

  const handleTextArea = (target: any) => {
    if (target.value.length > MAX_CHARACTERS) return;
    setCountText(target.value.length);
    setInitialMessage(target.value);
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    previewTextArea.current?.scrollIntoView({ behavior: 'smooth' });

    if (!initialMessage || !tone || !format || !length) {
      setError({ error: true, message: ERROR_MESSAGES.EMPTY_FIELDS });
      return;
    }

    setError({ error: false, message: '' });
    setLoading(true);

    fetchTextFromAI(initialMessage, tone, length, format, language, preview)
      .then((text: any) => {
        setPreview(text);
        sendGAEvent({ event: 'GENERATE A NEW DRAFT', value: 'New draft' });
      })
      .catch((error) => {
        console.error(error);
        setError({ error: true, message: ERROR_MESSAGES.ERROR_GENERATE_DRAFT });
        setPreview('');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onGenerateNewVersion = () => {
    if (!initialMessage || !tone || !format || !length) {
      setError({ error: true, message: ERROR_MESSAGES.EMPTY_FIELDS });
      return;
    }

    setError({ error: false, message: '' });
    setLoading(true);

    fetchTextFromAI(initialMessage, tone, length, format, language)
      .then((text: any) => {
        setPreview(text);
        sendGAEvent({ event: 'GENERATE A NEW DRAFT', value: 'New draft' });
      })
      .catch((error) => {
        console.error(error);
        setError({ error: true, message: ERROR_MESSAGES.ERROR_GENERATE_DRAFT });
        setPreview('');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const randomPlaceholder =
    placeholders[Math.floor(Math.random() * placeholders.length)].placeholder;
  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-16 sm:py-24">
      <div className="mx-auto max-w-[780px] px-6 sm:px-4 md:px-0">
        <div className="mx-auto w-full max-w-[780px] space-y-3">
          <SheetButton />
          <h1 className="text-3xl font-[600]">Textify</h1>
          <p>
            Convierte tus ideas en borradores pulcros con facilidad, optimizando
            tu tiempo y garantizando el tono adecuado, en cualquier plataforma
            de escritura en internet.
          </p>
        </div>
        <Separator className="my-10" />

        <div>
          <div className="group-field">
            <Label htmlFor="message">Escribir sobre</Label>
            <div>
              <Textarea
                placeholder={randomPlaceholder}
                id="message"
                rows={4}
                maxLength={MAX_CHARACTERS}
                onChange={({ target }) => handleTextArea(target)}
                value={initialMessage}
              />
              <p
                className={cn(
                  'mt-2 text-[12px]',
                  countText > MAX_CHARACTERS - 200 && 'text-yellow-400',
                  countText > MAX_CHARACTERS - 50 && 'text-red-500'
                )}
              >
                <span>{countText}</span> / <span>{MAX_CHARACTERS}</span>
              </p>
            </div>
          </div>

          <div className="group-field">
            <Label htmlFor="message">Elige el tono</Label>
            <RadioGroup className="flex flex-wrap gap-[20px]">
              <div
                className="flex items-center space-x-2"
                onClick={() => setTone(TONES.PROFESSIONAL)}
              >
                <RadioGroupItem
                  value="Profesional" id="r1" />
                <Label
                  htmlFor="r1" className="cursor-pointer">
                  Profesional
                </Label>
              </div>

              <div
                className="flex items-center space-x-2"
                onClick={() => setTone(TONES.INFORMAL)}
              >
                <RadioGroupItem
                  value="Informal" id="r2" />
                <Label
                  htmlFor="r2" className="cursor-pointer">
                  Informal
                </Label>
              </div>

              <div
                className="flex items-center space-x-2"
                onClick={() => setTone(TONES.ENTHUSIASTIC)}
              >
                <RadioGroupItem
                  value="Entusiasta" id="r3" />
                <Label
                  htmlFor="r3" className="cursor-pointer">
                  Entusiasta
                </Label>
              </div>

              <div
                className="flex items-center space-x-2"
                onClick={() => setTone(TONES.INFORMATIVE)}
              >
                <RadioGroupItem
                  value="Informativo" id="r4" />
                <Label
                  htmlFor="r4" className="cursor-pointer">
                  Informativo
                </Label>
              </div>

              <div
                className="flex items-center space-x-2"
                onClick={() => setTone(TONES.FUNNY)}
              >
                <RadioGroupItem
                  value="Divertido" id="r5" />
                <Label
                  htmlFor="r5" className="cursor-pointer">
                  Divertido
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="group-field">
            <Label htmlFor="message">Formato</Label>

            <div className="flex flex-wrap gap-[25px]">
              <OptionButton
                label="Párrafo"
                onClick={() => setFormat(FORMAT.PARAGRAPH)}
                selected={format === FORMAT.PARAGRAPH}
              >
                <Paragraph />
              </OptionButton>
              <OptionButton
                label="Correo Electrónico"
                onClick={() => setFormat(FORMAT.EMAIL)}
                selected={format === FORMAT.EMAIL}
              >
                <Email />
              </OptionButton>
              <OptionButton
                label="Ideas"
                onClick={() => setFormat(FORMAT.IDEAS)}
                selected={format === FORMAT.IDEAS}
              >
                <ListBullet />
              </OptionButton>
              <OptionButton
                label="Entrada de Blog"
                onClick={() => setFormat(FORMAT.BLOG)}
                selected={format === FORMAT.BLOG}
              >
                <Blog />
              </OptionButton>
              <OptionButton
                label="Tweet"
                onClick={() => setFormat(FORMAT.TWEET)}
                selected={format === FORMAT.TWEET}
              >
                <TwitterX />
              </OptionButton>
              <OptionButton
                label="Documentación"
                onClick={() => setFormat(FORMAT.DOCUMENTATION)}
                selected={format === FORMAT.DOCUMENTATION}
              >
                <Documentation />
              </OptionButton>
            </div>
          </div>

          <div className="group-field">
            <Label htmlFor="message">Logitud</Label>
            <RadioGroup className="flex flex-wrap gap-[20px]">
              <div
                className="flex cursor-pointer items-center space-x-2"
                onClick={() => setLength(LENGTH.SHORT)}
              >
                <RadioGroupItem
                  value="Corto" id="r-corto" />
                <Label
                  htmlFor="r-corto" className="cursor-pointer">
                  Corto
                </Label>
              </div>

              <div
                className="flex cursor-pointer items-center space-x-2"
                onClick={() => setLength(LENGTH.MEDIUM)}
              >
                <RadioGroupItem
                  value="Medio" id="r-medio" />
                <Label
                  htmlFor="r-medio" className="cursor-pointer">
                  Medio
                </Label>
              </div>

              <div
                className="flex cursor-pointer items-center space-x-2"
                onClick={() => setLength(LENGTH.LONG)}
              >
                <RadioGroupItem
                  value="Largo" id="r-largo" />
                <Label
                  htmlFor="r-largo" className="cursor-pointer">
                  Largo
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="group-field">
            <Label htmlFor="message">Idioma</Label>
            <div className="flex w-full flex-wrap gap-5">
              <LanguageOption
                label="Español"
                icon="/icons/flag-colombia.svg"
                selected={language === LANGUAGE.SPANISH}
                onClick={() => setLanguage(LANGUAGE.SPANISH)}
              />
              <LanguageOption
                label="Inglés"
                icon="/icons/flag-united-states.svg"
                selected={language === LANGUAGE.ENGLISH}
                onClick={() => setLanguage(LANGUAGE.ENGLISH)}
              />
              <LanguageOption
                label="Portugues"
                icon="/icons/flag-brazil.svg"
                selected={language === LANGUAGE.PORTUGUESE}
                onClick={() => setLanguage(LANGUAGE.PORTUGUESE)}
              />
            </div>
          </div>

          <div className="group-field">
            <Button onClick={onSubmit}>
              Generar borrador
            </Button>
          </div>

          <div className="mt-10">
            {error.error && (
              <p className="font-bold text-red-500">{error.message}</p>
            )}
          </div>

          <Separator className="my-10" />

          <div className="group-field">
            <Label>Vista previa</Label>
            {loading ? (
              <TextareaSkeleton />
            ) : (
              <>
                <Textarea
                  ref={previewTextArea}
                  placeholder="Aqui estará tu borrador generado"
                  rows={8}
                  defaultValue={preview}
                />
                <div className="flex space-x-3">
                  <Button
                    variant="secondary" className="mt-4 space-x-2" onClick={onCopy}>
                    <Copy className='size-4' />
                    <span>Copiar</span>
                  </Button>
                  <Button
                    variant="secondary" className="mt-4 space-x-2" onClick={onClear}>
                    <Trash2 className='size-4' />
                    <span>Limpiar</span>
                  </Button>
                  {preview && (
                    <Button
                      variant="secondary" className="mt-4 space-x-2" onClick={onGenerateNewVersion}>
                      <div className="size-4 text-black dark:text-white">
                        <StarsAI />
                      </div>
                      <span>Generar otra versión</span>
                    </Button>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
