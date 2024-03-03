import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { placeholderExamples as placeholders } from "@/utils/data";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";

interface OptionButtonProps {
  label: string;
  icon: string;
}

const OptionButton = ({ label, icon, ...props }: OptionButtonProps) => {
  return (
    <button className="option-card" {...props}>
      <div className="option-card__image">
        <Image src={icon} width={24} height={24} alt="option-card" className="pointer-events-none" />
      </div>
      <p className="option-card__label">{label}</p>
    </button>
  );
};

export default function Home() {

  const randomPlaceholder = placeholders[Math.floor(Math.random() * placeholders.length)].placeholder;
  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-16 sm:py-24">
      <div className="max-w-[980px] mx-auto px-6 sm:px-4 md:px-0">
        <div className="max-w-[980px] w-full mx-auto space-y-3 mb-8 pb-9 border-b border-neutral-200">
          <h1 className="font-[600] text-3xl">Textify</h1>
          <p>Genera contenido de calidad en segundos con AI</p>
          <Button variant="outline" className="space-x-2">
            <Image src="/icons/github.svg" width={20} height={20} alt="github" />
            <p>Repositorio</p>
          </Button>
        </div>

        <div>
          <div className="group-field">
            <Label htmlFor="message">Escribir sobre</Label>
            <div>
              <Textarea placeholder={randomPlaceholder} id="message" maxLength={2000} />
              <p className="text-[12px] mt-2"><span>0000</span> / <span>2000</span></p>
            </div>
          </div>

          <div className="group-field">
            <Label htmlFor="message">Elige el tono</Label>
            <RadioGroup className="flex gap-[20px] flex-wrap">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Profesional" id="r1" />
                <Label htmlFor="r1" className="cursor-pointer">Profesional</Label>
              </div>

              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Informal" id="r2" />
                <Label htmlFor="r2" className="cursor-pointer">Informal</Label>
              </div>

              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Entusiasta" id="r3" />
                <Label htmlFor="r3" className="cursor-pointer">Entusiasta</Label>
              </div>

              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Informativo" id="r4" />
                <Label htmlFor="r4" className="cursor-pointer">Informativo</Label>
              </div>

              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Divertido" id="r5" />
                <Label htmlFor="r5" className="cursor-pointer">Divertido</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="group-field">
            <Label htmlFor="message">Formato</Label>

            <div className="flex flex-wrap gap-[25px]">
              <OptionButton label="Párrafo" icon="/icons/paragraph.svg" />
              <OptionButton label="Correo Electrónico" icon="/icons/email.svg" />
              <OptionButton label="Ideas" icon="/icons/list-bullet.svg" />
              <OptionButton label="Entrada de Blog" icon="/icons/blog.svg" />
              <OptionButton label="Publicación LinkedIn" icon="/icons/linkedin.svg" />
            </div>

          </div>

          <div className="group-field">
            <Label htmlFor="message">Logitud</Label>
            <RadioGroup className="flex gap-[20px] flex-wrap">
              <div className="flex items-center space-x-2 cursor-pointer">
                <RadioGroupItem value="Corto" id="r-corto" />
                <Label htmlFor="r-corto" className="cursor-pointer">Corto</Label>
              </div>

              <div className="flex items-center space-x-2 cursor-pointer">
                <RadioGroupItem value="Medio" id="r-medio" />
                <Label htmlFor="r-medio" className="cursor-pointer">Medio</Label>
              </div>

              <div className="flex items-center space-x-2 cursor-pointer">
                <RadioGroupItem value="Largo" id="r-largo" />
                <Label htmlFor="r-largo" className="cursor-pointer">Largo</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="group-field">
            <Label>Vista previa</Label>
            <Textarea placeholder="Type your message here." id="message" rows={6} />
          </div>
        </div>
      </div>
    </main>
  );
}
