import React from 'react';
import { Button, Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, Input, Label } from './ui';
import { Eye } from 'lucide-react';
import Image from 'next/image';

const ImageVisualizer = ({ image }: { image: MediaSource | Blob }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline"><Eye /></Button>
      </DialogTrigger>
      <DialogContent className=" sm:max-w-[90%] h-[80vh] p-6">
        <div className="w-[90%] h-[90%]">
          <Image src={URL.createObjectURL(image)} alt="See Icon" fill className="object-contain" />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageVisualizer;