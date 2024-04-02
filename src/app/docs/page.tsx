"use client";

import { StarsAI } from "@/components/Icons";
import SheetButton from "@/components/SheetButton";
import { Alert, AlertDescription, Button, Input, Label, Separator, Switch, Textarea } from "@/components/ui";
import { ResponseAI, TONE_DOCS, TOOL } from "@/utils/types";
import { cn } from "@/utils/utils";
import { Copy, FileDown } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { getGeneratedDocs } from "@/services/getDocs";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import ImageVisualizer from "@/components/ImageVisualizer";
import { toast } from "sonner";
import { useGSAP } from "@gsap/react";
import './docs.css';
import gsap from "gsap";

const PageDocs = () => {
  const [tone, setTone] = useState(TONE_DOCS.FORMAL);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [initialMessage, setInitialMessage] = useState('');
  const [tools, setTools] = useState<TOOL[]>();
  const [generatedText, setGeneratedText] = useState('');
  const [error, setError] = useState({
    message: '',
    show: false
  });
  const [loading, setLoading] = useState(false);
  const [countText, setCountText] = useState(0);
  const MAX_CHARACTERS = 5500;

  const fetchAI = async () => {
    const formData = new FormData();

    formData.append('image', imageFile as File);

    try {
      const result = await fetch('/api/docs/images', {
        method: 'POST', // Cambia el método a POST
        body: formData
      });

      const data = await result.json();
      return data;
    } catch (error) {
      console.error('Error fetching AI:', error);
    }
  };

  const onSubmit = () => {
    if (initialMessage === '') {
      setError({
        message: 'Opps te olvidaste de algo. Recuerda ingresar la idea principal',
        show: true
      });
      return;
    }

    if (initialMessage.length < 50) {
      setError({
        message: 'La idea principal debe tener al menos 50 caracteres',
        show: true
      });
      return;
    }

    if (!imageFile) {
      setError({
        message: 'Opps, te olvidaste de algo. Es necesario subir una imagen.',
        show: true
      });
      return;
    }

    if (
      tone === TONE_DOCS.FORMAL ||
      tone === TONE_DOCS.CASUAL ||
      tone === TONE_DOCS.OBJETIVE
    ) {
      setError({
        message: '',
        show: false
      });

      setLoading(true);

      fetchAI()
        .then((data: ResponseAI) => {
          const text = data.message.candidates[0].content.parts[0].text;
          getGeneratedDocs(tone, text, tools || [], initialMessage)
            .then((generatedText) => {
              setGeneratedText(generatedText);
            })
            .catch((error: any) => {
              console.error('Error:', error);

              setError({
                message: 'Error al generar el texto',
                show: true
              });
            })
            .finally(() => {
              setLoading(false);
            });
        })
        .catch((error) => {
          console.error('Error:', error);
          setError({
            message: 'Error al generar el texto',
            show: true
          });
          setLoading(false);
        });
    }

  };

  const setHandleImages = (e: ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files;
    if (image) {
      setImageFile(image[0]);
    }
  };

  const handleTextArea = (message: string) => {

    if (message.length >= MAX_CHARACTERS) return;
    setInitialMessage(message);
    setCountText(message.length);
  };

  const handleTool = (tool: TOOL) => {
    if (tool) {
      setTools((prevTools) => {
        if (prevTools?.includes(tool)) {
          return prevTools.filter((prevTool) => prevTool !== tool);
        } else {
          return [...(prevTools || []), tool];
        }
      });
    }
  };

  const onCopy = () => {
    if (generatedText) {
      navigator.clipboard.writeText(generatedText);
      toast.success('Texto copiado al portapapeles');
    }
  };

  useGSAP(() => {
    gsap.to('#stars-loader-animation', {
      duration: 1,
      scale: 1.7,
      yoyo: true,
      repeat: -1,
      ease: 'power1.inOut'
    });
  }, []);

  return (
    <div className="docs-page">
      <div className="left-column">
        <SheetButton />
        <h1 className="title-docs">Textify <strong>Docs</strong></h1>
        <p className="mt-3">Crea documentación a partir de imágenes.</p>
        <Separator className="my-5" />
        <div className="group-field">
          <Label className="title-label">Tono</Label>
          <p>Reemplaza algunas palabras para cambiar el tono.</p>

          <div className="rounded-sm border border-gray-100 dark:border-slate-800 grid grid-cols-3">
            <button
              role="button"
              className={cn('text-[15px] w-full grid place-content-center py-2 px-4 hover:bg-gray-200 dark:hover:bg-slate-800/50 duration-200 transition-all ease-in-out', tone === TONE_DOCS.CASUAL && 'bg-gray-200 dark:bg-slate-800')}
              onClick={() => setTone(TONE_DOCS.CASUAL)}
            >
              Casual
            </button>
            <button
              role="button"
              className={cn('text-[15px] w-full grid place-content-center py-2 px-4 hover:bg-gray-200 dark:hover:bg-slate-800/50 duration-200 transition-all ease-in-out', tone === TONE_DOCS.OBJETIVE && 'bg-gray-200 dark:bg-slate-800')}
              onClick={() => setTone(TONE_DOCS.OBJETIVE)}
            >
              Objetivo
            </button>
            <button
              role="button"
              className={cn('text-[15px] w-full grid place-content-center py-2 px-4 hover:bg-gray-200 dark:hover:bg-slate-800/50 duration-200 transition-all ease-in-out', tone === TONE_DOCS.FORMAL && 'bg-gray-200 dark:bg-slate-800')}
              onClick={() => setTone(TONE_DOCS.FORMAL)}
            >
              Formal
            </button>
          </div>

        </div>
        <div className="group-field">
          <Label className="title-label" htmlFor="grammar">Ortografía y gramática</Label>
          <p>Corrige rápidamente todos los errores ortográficos, tipográficos y gramaticales.</p>
          <Switch id="grammar" onCheckedChange={() => handleTool(TOOL.GRAMMAR)} />
        </div>
        <div className="group-field">
          <Label className="title-label" htmlFor="improving-writting">Redacción</Label>
          <p>Optimiza tus textos para que sean más claros y fáciles de leer.</p>
          <Switch id="improving-writting" onCheckedChange={() => handleTool(TOOL.STRUCTURE)} />
        </div>
        <div className="group-field">
          <Label className="title-label" htmlFor="condense">Condensar</Label>
          <p>Puedes acortar el texto sin alterar la esencia y la idea del mismo.</p>
          <Switch id="condense" onCheckedChange={() => handleTool(TOOL.CONDENSE)} />
        </div>
      </div>

      <Separator orientation="vertical" className="hidden lg:flex w-[2px] h-[95vh]" />
      <Separator orientation="horizontal" className="lg:hidden w-full h-[2px] mb-20" />

      <div className="right-column">
        <div className="group-field">
          <Label htmlFor="initial-message">Ingresa la idea principal</Label>
          <Textarea
            name="initial-message"
            placeholder="Añade instrucciones complementarias"
            onChange={({ target }) => handleTextArea(target.value)}
            maxLength={MAX_CHARACTERS}
          />
          <p className={cn('text-[12px] mt-2', countText > MAX_CHARACTERS - 200 && 'text-yellow-400', countText > MAX_CHARACTERS - 50 && 'text-red-500')}><span>{countText}</span> / <span>{MAX_CHARACTERS}</span></p>
        </div>
        <div className="group-field -mt-5">
          <Label>Sube las imagenes de contexto</Label>
          <div className="flex gap-2">
            <Input type="file" accept="jpg,png,jpeg,webp" onChange={setHandleImages} />
            {imageFile && (
              <ImageVisualizer image={imageFile} />
            )}
          </div>
          <Button className="space-x-3" onClick={onSubmit}>
            <span>
              {!generatedText ? 'Generar' : 'Generar otra versión'}
            </span>
            <div className="text-white dark:text-black size-4" >
              <StarsAI />
            </div>
          </Button>
        </div>

        {error.show && (
          <div>
            <Alert variant="destructive">
              <ExclamationTriangleIcon className="h-4 w-4" />
              <AlertDescription>
                {error.message}
              </AlertDescription>
            </Alert>
          </div>
        )}
        <Separator className="my-5" />
        {!loading ? (
          <div className="group-field">
            <Label htmlFor="generated-document">Documentación generado</Label>
            <Textarea name="generated-document" defaultValue={generatedText} rows={18} placeholder="Aquí estará tu documentación generada" />
            <div className="space-x-4">
              <Button variant="secondary" className="space-x-3" onClick={onCopy}>
                <Copy size={16} />
                <span>Copiar</span>
              </Button>
              {/* <Button variant="secondary" className="space-x-3 mt-3">
                <FileDown size={16} />
                <span>Descargar texto generado en .txt</span>
              </Button> */}
            </div>
          </div>
        ) : (
          <div className="w-full h-[30vh] flex flex-col justify-center items-center">
            <div className="size-20 text-center" id="stars-loader-animation">
              <StarsAI />
            </div>
            <p className="mt-10">Generando...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PageDocs;