'use client'

import Image from "next/image";
import { deleteHabit } from "@/app/actions";
export default function DeleteButton ({ habit }: { habit: string }) {
  return(
    <button onClick={() => deleteHabit(habit)}>
      <Image 
        src="/trash.svg" 
        alt="Botão deletar meta"
        width={20}
        height={20}
    />
  </button>
  )
}