import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { redis } from "../redis"


export default function NewHabit () {
   async function newHabit(formData: FormData) {
     "use server";
    
     const habit = formData.get("habit");
     await redis.set('habits', {[habit as string]: {}});

     revalidatePath("/");
     redirect("/");
   }
  return (
    <main className="container relative gap-8 flex flex-col px-12 pt-16"> 
      <h1 className="text-4xl text-center font-display text-white">
        Novo hábito
      </h1>
      
       <form 
        className="flex flex-col gap-4 mt-4"
        action={newHabit}>
        <input 
         type="text" 
         name="habit" 
         id="habit" 
         className="p-2 font-sans text-white rounded-md bg-neutral-800"/>

        <button 
         type="submit"
         className="p-2 bg-[#45EDAD] font-display font-regular text-2xl mt-8 
          rounded-md">
           cadastrar
        </button>
        <button 
         className="p-2 font-display font-regular text-red-500 text-2xl
          rounded-md bg-neutral-800">
          cancelar 
        </button>
       </form>
    </main>
  )
}