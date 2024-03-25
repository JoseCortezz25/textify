"use client";

import { Settings } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Input } from "./ui/input";
import { useState } from "react";
import { toast } from "sonner";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";
import { ModeToggle } from "./ModeToggle";

const SheetButton = () => {
  const [apiKeyValue, setApiKeyValue] = useState<string>(localStorage.getItem("api_key") || "");

  const onSave = () => {
    if (apiKeyValue === "") {
      toast.error("Por favor ingresa tu API KEY");
      return;
    }
    localStorage.setItem("api_key", apiKeyValue);
    toast.success("Credencial guardada correctamente");
  };

  return (
    <Sheet>
      <SheetTrigger>
        <Button variant="outline">
          <Settings />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Configuración</SheetTitle>
        </SheetHeader>

        <div className="flex flex-col space-y-2 mt-5 ">
          <Label>Tema</Label>
          <ModeToggle.Large />
        </div>
        <Separator className="my-5" />
        <div className="space-y-2">
          <Label htmlFor="credential">Ingresa tu credencial</Label>
          <p className="text-[14px]"> Registra tu API KEY de Google Gemini Pro para hacer uso. Tu credencial se almacenará de forma segura en tu navegador.</p>
          <Input
            type="text"
            name="credential"
            placeholder="Ingresa tu API KEY"
            onChange={(e) => setApiKeyValue(e.target.value)}
            defaultValue={apiKeyValue}
          />
          <Button className="mt-3" onClick={onSave}>Guardar</Button>
        </div>

      </SheetContent>
    </Sheet>

  );
};

export default SheetButton;