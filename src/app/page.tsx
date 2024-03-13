"use client";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { placeholderExamples as placeholders } from "@/utils/data";
import { Button } from "@/components/ui/button";
import { ReactNode, useRef, useState } from "react";
import { cn } from "@/utils/utils";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { generatePrompt } from "@/utils/prompts";
import { FORMAT, LANGUAGE, LENGTH, TONES } from "@/utils/types";
import { toast } from "sonner";
import { ModeToggle } from "@/components/ModeToggle";
import { Blog, Email, ListBullet, Paragraph } from "@/components/Icons";
import { OptionButton } from "@/components/OptionButton";
import { LanguageOption } from "@/components/LanguageOption";
import { Typography } from "@/components/typography";


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

  const fetchAltFromAI = async () => {
    try {
      const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_API_KEY as string);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      const result = await model.generateContent(generatePrompt(initialMessage, tone as TONES, length as LENGTH, format as FORMAT, language as LANGUAGE));
      const response = await result.response;
      const text = response.text();

      return text as string;

    } catch (error) {
      console.error(error);
    }
  };

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
    setCountText(target.value.length);
    setInitialMessage(target.value);
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    previewTextArea.current?.scrollIntoView({ behavior: 'smooth' });

    if (!initialMessage || !tone || !format || !length) {
      setError({ error: true, message: 'Todos los campos son obligatorios' });
      return;
    }
    setError({ error: false, message: '' });
    setLoading(true);

    fetchAltFromAI()
      .then((text: any) => {
        setPreview(text);

      })
      .catch((error) => {
        console.error(error);
        setError({ error: true, message: 'Ocurrió un error al generar el borrador' });
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
          <ModeToggle />
          <h1 className="font-[600] text-3xl">Textify</h1>
          <p>Convierta tus ideas en borradores pulcros con facilidad, optimizando su tiempo y garantizando el tono adecuado, en cualquier plataforma de escritura en internet.</p>
          <a href="https://github.com/JoseCortezz25/textify" className="inline-block" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" className="button-repo">
              <div className="text-black dark:text-white">
                <svg width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg">
                  <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                    <g id="Dribbble-Light-Preview" transform="translate(-140.000000, -7559.000000)" fill="currentColor">
                      <g id="icons" transform="translate(56.000000, 160.000000)">
                        <path d="M94,7399 C99.523,7399 104,7403.59 104,7409.253 C104,7413.782 101.138,7417.624 97.167,7418.981 C96.66,7419.082 96.48,7418.762 96.48,7418.489 C96.48,7418.151 96.492,7417.047 96.492,7415.675 C96.492,7414.719 96.172,7414.095 95.813,7413.777 C98.04,7413.523 100.38,7412.656 100.38,7408.718 C100.38,7407.598 99.992,7406.684 99.35,7405.966 C99.454,7405.707 99.797,7404.664 99.252,7403.252 C99.252,7403.252 98.414,7402.977 96.505,7404.303 C95.706,7404.076 94.85,7403.962 94,7403.958 C93.15,7403.962 92.295,7404.076 91.497,7404.303 C89.586,7402.977 88.746,7403.252 88.746,7403.252 C88.203,7404.664 88.546,7405.707 88.649,7405.966 C88.01,7406.684 87.619,7407.598 87.619,7408.718 C87.619,7412.646 89.954,7413.526 92.175,7413.785 C91.889,7414.041 91.63,7414.493 91.54,7415.156 C90.97,7415.418 89.522,7415.871 88.63,7414.304 C88.63,7414.304 88.101,7413.319 87.097,7413.247 C87.097,7413.247 86.122,7413.234 87.029,7413.87 C87.029,7413.87 87.684,7414.185 88.139,7415.37 C88.139,7415.37 88.726,7417.2 91.508,7416.58 C91.513,7417.437 91.522,7418.245 91.522,7418.489 C91.522,7418.76 91.338,7419.077 90.839,7418.982 C86.865,7417.627 84,7413.783 84,7409.253 C84,7403.59 88.478,7399 94,7399" id="github-[#142]">

                        </path>
                      </g>
                    </g>
                  </g>
                </svg>
              </div>
              <p>Repositorio</p>
            </Button>
          </a>
        </div>

        <div>
          <div className="group-field">
            <Label htmlFor="message">Escribir sobre</Label>
            <div>
              <Textarea placeholder={randomPlaceholder} id="message" rows={4} maxLength={1500} onChange={({ target }) => handleTextArea(target)} />
              <p className={cn('text-[12px] mt-2', countText > 1400 && 'text-yellow-400', countText > 1450 && 'text-red-500')}><span>{countText}</span> / <span>1500</span></p>
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
