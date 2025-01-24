import ArrowIcon from "@/components/ArrowIcon";
import Calendar from "@/components/Calendar";
import Link from "next/link";



export default function HabitDetails ({ params: { habit }}: { params: { habit: string }} ) {
  const decodeHabit = decodeURI(habit);

  return (
    <main className="container relative flex flex-col gap-8 px-12 pt-16">
      <h1 className="text-2xl font-light text-center text-white font-display">
        {decodeHabit}
      </h1>

      <Link
       className="flex items-center font-sans text-xs text-neutral-300 gap-2" 
       href="/">
        <ArrowIcon width={12} height={12}/>
          Voltar
      </Link>

      <Calendar habit={decodeHabit}/>
    </main>
  )
}