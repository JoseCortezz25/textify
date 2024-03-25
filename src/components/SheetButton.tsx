import { Settings } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Label } from "./ui/label";
import { ModeToggle } from "./ModeToggle";

const SheetButton = () => {

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
      </SheetContent>
    </Sheet>

  );
};

export default SheetButton;