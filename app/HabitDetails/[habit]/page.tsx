import ArrowIcon from "@/components/ArrowIcon";
import Calendar from "@/components/Calendar";
import { Redis } from "@upstash/redis";
import Link from "next/link";

const redis = Redis.fromEnv();

export default async function HabitDetails ({ params: { habit }}: { params: { habit: string }} ) {
  const decodeHabit = decodeURI(habit);
  const habitStreak: Record<string, boolean> | null = await redis.hget("habit", decodeHabit)

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

      <Calendar habit={decodeHabit} habitStreak={habitStreak}/>
    </main>
  )
}