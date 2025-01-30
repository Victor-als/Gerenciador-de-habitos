import DayState from "@/components/DayState";
import Link from "next/link";
import DeleteButton from "@/components/DeleteButton";
import { redis } from "./redis"


  type Habits = {
   [habit: string] : Record<string, boolean> 
 } | null;
export default async function Home() {
  let habits: Habits = null;

  try {
    habits = await redis.hgetall("habits");

    // Valida se o retorno está no formato esperado
    if (habits && typeof habits !== "object") {
      throw new Error("Formato inválido de dados no Redis");
    }
  } catch (error) {
    console.error("Erro ao buscar hábitos do Redis:", error);
  }


  const today = new Date();
  const todayWeekDay = today.getDay();
  const weekDays = ["Dom", "Seg", "Ter","Qua", "Qui", "Sex", "Sab"]

  const sorteWeekDay = weekDays
  .slice(todayWeekDay + 1)
  .concat(weekDays.slice(0, todayWeekDay + 1));

  const lastSevenDays = weekDays.map((_, index) => {
    const date = new Date();

    date.setDate(date.getDate() - index); 

    return date.toISOString().slice(0, 10);
  }).reverse();

 

  return (
    <main className="container relative flex flex-col gap-8 px-4 pt-16">
      {habits === null || Object.keys(habits).length === 0 && (
        <h1 
          className="mt-20 text-4xl font-light text-white font-display text-center">
           Você não tem hábitos cadastrados
        </h1>
      )}

      {habits !== null && Object.entries(habits).map(
       ([ habit, habitStreak]) => (
          <div key={habit}>
            <div className="flex justify-between items-center">
              <span className="text-xl font-light text-white font-sans">
                {habit}
              </span>
               <DeleteButton habit={""} />
            </div>
            <Link href={`HabitDetails/${habit}`}>
              <section className="grid grid-cols-7 bg-neutral-800 rounded-md p-2 mt-3">
                {sorteWeekDay.map((day, index) => (
                  <div key={day} className="flex flex-col last:font-bold">
                    <span className="text-white font-sans text-xs flex justify-center">
                      {day}
                      </span>
                      {/* day state */}
                      <DayState day={habitStreak[lastSevenDays[index]]}/>
                  </div>
                ))}
              </section>
            </Link>
          </div>
       )
      )}

      <Link 
       className="fixed text-center bottom-10 w-2/3 left-1/2 -translate-x-1/2
        text-neutral-900 bg-[#45EDAD] font-display font-medium text-2xl
        p-2 rounded-md "
       href="NewHabit">
       Novo Hábito
      </Link>
    </main>
  );
}

             