import profile from "../assets/profile-default.jpg";

import { FaPen } from "react-icons/fa";
import { LiaDumbbellSolid } from "react-icons/lia";
import { BiWorld } from "react-icons/bi";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import boy from "../assets/boy.png";
import girl from "../assets/girl.png";
import { useEffect, useState } from "react";

export function Profile() {
  const [isOpen, setIsOpen] = useState(false);
  const [photo, setPhoto] = useState(profile);

  useEffect(() => {
    const savedPhoto = localStorage.getItem("profilePhoto");
    if (savedPhoto) {
      setPhoto(savedPhoto);
    }
  }, []);

  function handlePhotoSelect(image) {
    setPhoto(image);
    localStorage.setItem("profilePhoto", image);
    setIsOpen(false);
  }

  return (
    <>
      <div className="flex flex-1 flex-col items-center space-y-8 py-16">
        {/* PHOTO AND NAME */}
        <div className="relative">
          <img src={photo} alt="" className="h-72 w-72 rounded-xl" />
          <button
            onClick={() => setIsOpen(true)}
            className="absolute right-2 bottom-2 cursor-pointer rounded-full bg-zinc-700 p-2 transition duration-150 ease-in hover:scale-105"
          >
            <FaPen />
          </button>
        </div>
        <p className="text-xl font-bold">Leandro Farias</p>

        {/* STRICKS */}
        <div className="flex flex-col items-center space-y-6 pt-10 sm:flex-row sm:space-y-0 sm:space-x-6 sm:pt-0">
          <div className="flex w-60 justify-center space-x-2 rounded-md border-2 border-neutral-600/80 bg-zinc-700/50 py-3 pl-8">
            <LiaDumbbellSolid className="text-3xl" />
            <p className="flex-1 self-end text-xl font-bold">0 Exercícios</p>
          </div>
          <div className="flex w-60 justify-center space-x-2 rounded-md border-2 border-neutral-600/80 bg-zinc-700/50 py-3 pl-8">
            <BiWorld className="text-3xl" />
            <p className="flex-1 self-end text-xl font-bold">0 Listas</p>
          </div>
        </div>
      </div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Escolha sua foto</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div className="flex items-center justify-center space-x-6">
            <img
              src={boy}
              alt="Menino"
              onClick={() => handlePhotoSelect(boy)}
              className="w-[180px] cursor-pointer rounded-full transition duration-150 hover:scale-105 hover:opacity-80"
            />
            <img
              src={girl}
              alt="Menina"
              onClick={() => handlePhotoSelect(girl)}
              className="w-[180px] cursor-pointer rounded-full transition duration-150 hover:scale-105 hover:opacity-80"
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
