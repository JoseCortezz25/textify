"use client";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { placeholderExamples as placeholders } from "@/utils/data";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/utils/utils";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { generatePrompt } from "@/utils/prompts";

interface OptionButtonProps {
  label: string;
  icon: string;
  onClick?: () => void;
}

const OptionButton = ({ label, icon, onClick, ...props }: OptionButtonProps) => {
  return (
    <button className="option-card" onClick={onClick} {...props}>
      <div className="option-card__image">
        <Image src={icon} width={24} height={24} alt="option-card" className="pointer-events-none" />
      </div>
      <p className="option-card__label">{label}</p>
    </button>
  );
};

export default function Home() {
  const [countText, setCountText] = useState(0);

  const [initialMessage, setInitialMessage] = useState('');
  const [tone, setTone] = useState('');
  const [format, setFormat] = useState('');
  const [length, setLength] = useState('');
  const [preview, setPreview] = useState('');
  const [error, setError] = useState({ error: false, message: '' });

  const fetchAltFromAI = async () => {
    try {
      const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_API_KEY as string);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      const result = await model.generateContent(generatePrompt(initialMessage, tone, length, format));
      const response = await result.response;
      const text = response.text();
      console.log('text', text);

      return text as string;

    } catch (error) {
      console.error(error);
    }
  };

  const handleTextArea = (target: any) => {
    setCountText(target.value.length);
    setInitialMessage(target.value);
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    if (!initialMessage && !tone && !format && !length) {
      setError({ error: true, message: 'Todos los campos son obligatorios' });
      return;
    }

    fetchAltFromAI()
      .then((text: any) => {
        setPreview(text);
      })
      .catch((error) => {
        console.error(error);
      });
    // setPreview(text);
  };

  const randomPlaceholder = placeholders[Math.floor(Math.random() * placeholders.length)].placeholder;
  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-16 sm:py-24">
      <div className="max-w-[780px] mx-auto px-6 sm:px-4 md:px-0">
        <div className="max-w-[780px] w-full mx-auto space-y-3 mb-8 pb-9 border-b border-neutral-200">
          <h1 className="font-[600] text-3xl">Textify</h1>
          <p>Convierta sus ideas en borradores pulcros con facilidad, optimizando su tiempo y garantizando el tono adecuado, en cualquier plataforma de escritura en internet.</p>
          <a href="https://github.com/JoseCortezz25/textify" className="inline-block" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" className="space-x-2">
              <Image src="/icons/github.svg" width={20} height={20} alt="github" />
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
              <div className="flex items-center space-x-2" onClick={() => setTone('profesional')}>
                <RadioGroupItem value="Profesional" id="r1" />
                <Label htmlFor="r1" className="cursor-pointer">Profesional</Label>
              </div>

              <div className="flex items-center space-x-2" onClick={() => setTone('informal')}>
                <RadioGroupItem value="Informal" id="r2" />
                <Label htmlFor="r2" className="cursor-pointer">Informal</Label>
              </div>

              <div className="flex items-center space-x-2" onClick={() => setTone('entusiasta')}>
                <RadioGroupItem value="Entusiasta" id="r3" />
                <Label htmlFor="r3" className="cursor-pointer">Entusiasta</Label>
              </div>

              <div className="flex items-center space-x-2" onClick={() => setTone('informativo')}>
                <RadioGroupItem value="Informativo" id="r4" />
                <Label htmlFor="r4" className="cursor-pointer">Informativo</Label>
              </div>

              <div className="flex items-center space-x-2" onClick={() => setTone('divertido')}>
                <RadioGroupItem value="Divertido" id="r5" />
                <Label htmlFor="r5" className="cursor-pointer">Divertido</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="group-field">
            <Label htmlFor="message">Formato</Label>

            <div className="flex flex-wrap gap-[25px]">
              <OptionButton label="Párrafo" icon="/icons/paragraph.svg" onClick={() => setFormat('paragraph')} />
              <OptionButton label="Correo Electrónico" icon="/icons/email.svg" onClick={() => setFormat('email')} />
              <OptionButton label="Ideas" icon="/icons/list-bullet.svg" onClick={() => setFormat('ideas')} />
              <OptionButton label="Entrada de Blog" icon="/icons/blog.svg" onClick={() => setFormat('blog')} />
              {/* <OptionButton label="Publicación LinkedIn" icon="/icons/linkedin.svg" onClick={() => setFormat('publicacion linkedin')} /> */}
            </div>

          </div>

          <div className="group-field">
            <Label htmlFor="message">Logitud</Label>
            <RadioGroup className="flex gap-[20px] flex-wrap">
              <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setLength('short')}>
                <RadioGroupItem value="Corto" id="r-corto" />
                <Label htmlFor="r-corto" className="cursor-pointer">Corto</Label>
              </div>

              <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setLength('medium')}>
                <RadioGroupItem value="Medio" id="r-medio" />
                <Label htmlFor="r-medio" className="cursor-pointer">Medio</Label>
              </div>

              <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setLength('long')}>
                <RadioGroupItem value="Largo" id="r-largo" />
                <Label htmlFor="r-largo" className="cursor-pointer">Largo</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="group-field">
            <Button onClick={onSubmit}>Generar borrador</Button>
          </div>

          <div className="mt-10">
            {error.error && <p className="text-red-500 font-bold">{error.message}</p>}
          </div>

          <Separator className="my-10" />

          <div className="group-field">
            <Label>Vista previa</Label>
            <Textarea placeholder="Type your message here." id="message" rows={6} value={preview} />
          </div>
        </div>
      </div>
    </main>
  );
}
