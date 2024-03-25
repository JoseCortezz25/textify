"use client";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { placeholderExamples as placeholders } from "@/utils/data";
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import { cn } from "@/utils/utils";
import { FORMAT, LANGUAGE, LENGTH, TONES } from "@/utils/types";
import { toast } from "sonner";
import { Blog, Documentation, Email, ListBullet, Paragraph, TwitterX } from "@/components/Icons";
import { OptionButton } from "@/components/OptionButton";
import { LanguageOption } from "@/components/LanguageOption";
import { fetchAltFromAI } from "@/services/fetch";
import SheetButton from "@/components/SheetButton";
import { ERROR_MESSAGES } from "@/utils/labels";


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
    if (!previewTextArea.current) return;
    previewTextArea.current.defaultValue = '';
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

    fetchAltFromAI(
      initialMessage,
      tone,
      length,
      format,
      language
    )
      .then((text: any) => {
        setPreview(text);
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

  const randomPlaceholder = placeholders[Math.floor(Math.random() * placeholders.length)].placeholder;
  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-16 sm:py-24">
      <div className="max-w-[780px] mx-auto px-6 sm:px-4 md:px-0">
        <div className="max-w-[780px] w-full mx-auto space-y-3 mb-8 pb-9 border-b border-neutral-200">
          <SheetButton />
          <h1 className="font-[600] text-3xl">Textify</h1>
          <p>Convierta tus ideas en borradores pulcros con facilidad, optimizando su tiempo y garantizando el tono adecuado, en cualquier plataforma de escritura en internet.</p>
        </div>

        <div>
          <div className="group-field">
            <Label htmlFor="message">Escribir sobre</Label>
            <div>
              <Textarea placeholder={randomPlaceholder} id="message" rows={4} maxLength={MAX_CHARACTERS} onChange={({ target }) => handleTextArea(target)} />
              <p className={cn('text-[12px] mt-2', countText > MAX_CHARACTERS - 200 && 'text-yellow-400', countText > MAX_CHARACTERS - 50 && 'text-red-500')}><span>{countText}</span> / <span>{MAX_CHARACTERS}</span></p>
            </div>
          </div>

          <div className="group-field">
            <Label htmlFor="message">Elige el tono</Label>
            <RadioGroup className="flex gap-[20px] flex-wrap" >
              <div className="flex items-center space-x-2" onClick={() => setTone(TONES.PROFESSIONAL)}>
                <RadioGroupItem value="Profesional" id="r1" />
                <Label htmlFor="r1" className="cursor-pointer">Profesional</Label>
              </div>

              <div className="flex items-center space-x-2" onClick={() => setTone(TONES.INFORMAL)}>
                <RadioGroupItem value="Informal" id="r2" />
                <Label htmlFor="r2" className="cursor-pointer">Informal</Label>
              </div>

              <div className="flex items-center space-x-2" onClick={() => setTone(TONES.ENTHUSIASTIC)}>
                <RadioGroupItem value="Entusiasta" id="r3" />
                <Label htmlFor="r3" className="cursor-pointer">Entusiasta</Label>
              </div>

              <div className="flex items-center space-x-2" onClick={() => setTone(TONES.INFORMATIVE)}>
                <RadioGroupItem value="Informativo" id="r4" />
                <Label htmlFor="r4" className="cursor-pointer">Informativo</Label>
              </div>

              <div className="flex items-center space-x-2" onClick={() => setTone(TONES.FUNNY)}>
                <RadioGroupItem value="Divertido" id="r5" />
                <Label htmlFor="r5" className="cursor-pointer">Divertido</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="group-field">
            <Label htmlFor="message">Formato</Label>

            <div className="flex flex-wrap gap-[25px]">
              <OptionButton label="Párrafo" onClick={() => setFormat(FORMAT.PARAGRAPH)} selected={format === FORMAT.PARAGRAPH}>
                <Paragraph />
              </OptionButton>
              <OptionButton label="Correo Electrónico" onClick={() => setFormat(FORMAT.EMAIL)} selected={format === FORMAT.EMAIL} >
                <Email />
              </OptionButton>
              <OptionButton label="Ideas" onClick={() => setFormat(FORMAT.IDEAS)} selected={format === FORMAT.IDEAS}>
                <ListBullet />
              </OptionButton>
              <OptionButton label="Entrada de Blog" onClick={() => setFormat(FORMAT.BLOG)} selected={format === FORMAT.BLOG} >
                <Blog />
              </OptionButton>
              <OptionButton label="Tweet" onClick={() => setFormat(FORMAT.TWEET)} selected={format === FORMAT.TWEET}>
                <TwitterX />
              </OptionButton>
              <OptionButton label="Documentación" onClick={() => setFormat(FORMAT.DOCUMENTATION)} selected={format === FORMAT.DOCUMENTATION}>
                <Documentation />
              </OptionButton>
            </div>

          </div>

          <div className="group-field">
            <Label htmlFor="message">Logitud</Label>
            <RadioGroup className="flex gap-[20px] flex-wrap">
              <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setLength(LENGTH.SHORT)}>
                <RadioGroupItem value="Corto" id="r-corto" />
                <Label htmlFor="r-corto" className="cursor-pointer">Corto</Label>
              </div>

              <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setLength(LENGTH.MEDIUM)}>
                <RadioGroupItem value="Medio" id="r-medio" />
                <Label htmlFor="r-medio" className="cursor-pointer">Medio</Label>
              </div>

              <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setLength(LENGTH.LONG)}>
                <RadioGroupItem value="Largo" id="r-largo" />
                <Label htmlFor="r-largo" className="cursor-pointer">Largo</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="group-field">
            <Label htmlFor="message">Idioma</Label>
            <div className="w-full flex flex-wrap gap-5">
              <LanguageOption label="Español" icon="/icons/flag-colombia.svg" selected={language === LANGUAGE.SPANISH} onClick={() => setLanguage(LANGUAGE.SPANISH)} />
              <LanguageOption label="Inglés" icon="/icons/flag-united-states.svg" selected={language === LANGUAGE.ENGLISH} onClick={() => setLanguage(LANGUAGE.ENGLISH)} />
              <LanguageOption label="Portugues" icon="/icons/flag-brazil.svg" selected={language === LANGUAGE.PORTUGUESE} onClick={() => setLanguage(LANGUAGE.PORTUGUESE)} />
            </div>
          </div>

          {/* <div className="group-field">
            <Separator className="my-10" />
            <Typography as="h2">Configuración complementaria</Typography>

            <div className="group-field">
              <Label htmlFor="target">Objetivo</Label>
              <Textarea name="target" placeholder="Ingresa el objetivo del texto" />
            </div>

            <div className="group-field">
              <Label htmlFor="audience">Audiencia</Label>
              <Textarea name="audience" placeholder="Describe la audiencia" />
            </div>

            <div className="group-field">
              <Label htmlFor="instructions">Intrucciones personalizadas</Label>
              <Textarea name="instructions" placeholder="Describe tus instrucciones personalizadas para mejor resultados" />
            </div>
          </div> */}

          <div className="group-field">
            <Button onClick={onSubmit}>{!preview ? 'Generar borrador' : 'Generar otra versión'}</Button>
          </div>

          <div className="mt-10">
            {error.error && <p className="text-red-500 font-bold">{error.message}</p>}
          </div>

          <Separator className="my-10" />

          <div className="group-field">
            <Label>Vista previa</Label>
            {loading ? <TextareaSkeleton /> : (
              <>
                <Textarea ref={previewTextArea} placeholder="Aqui estará tu borrador generado" rows={8} defaultValue={preview} />
                <div className="flex space-x-3">
                  <Button variant="secondary" className="mt-4" onClick={onCopy}>Copiar</Button>
                  <Button variant="outline" className="mt-4" onClick={onClear}>Limpiar</Button>
                </div>
              </>
            )}

          </div>
        </div>
      </div>
    </main>
  );
}
