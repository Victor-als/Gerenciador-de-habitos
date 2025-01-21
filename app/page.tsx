import DayState from "@/components/DayState";
import Image from "next/image";
import Link from "next/link";


export default function Home() {
  const habits = {
    'Beber Agua': {
     '2024-20-01': true,
     '2024-19-01': false,
     '2024-18-01': true,
    },
    'Ler': {
     '2024-20-01': true,
     '2024-19-01': false,
     '2024-18-01': true,
    },
  };

  const today = new Date();
  const todayWeekDay = today.getDay();
  const weekDays = ["Dom", "Seg", "Ter","Qua", "Qui", "Sex", "Sab"]

  const sorteWeekDay = weekDays
  .slice(todayWeekDay + 1)
  .concat(weekDays.slice(0, todayWeekDay + 1));

  return (
    <main className="container relative flex flex-col gap-8 px-4 pt-16">
      {habits === null || Object.keys(habits).length === 0 && (
        <h1 
          className="mt-20 text-4xl font-light text-white font-display text-center">
           Você não tem hábitos cadastrados
        </h1>
      )}

      {habits !== null && Object.entries(habits).map(
       ([ habit, habitStreak ]) => (
          <div key={habit}>
            <div className="flex justify-between items-center">
              <span className="text-xl font-light text-white font-sans">
                {habit}
              </span>
              <button>
                <Image 
                 src="/trash.svg" 
                 alt="Botão deletar meta"
                 width={20}
                 height={20}
                />
              </button>
            </div>
             <section className="grid grid-cols-7 bg-neutral-800 rounded-md p-2 mt-3">
               {sorteWeekDay.map((day) => (
                <div key={day} className="flex flex-col last:font-bold">
                  <span className="text-white font-sans text-xs flex justify-center">
                    {day}
                    </span>
                    {/* day state */}
                    <DayState day={undefined}/>
                </div>
               ))}
             </section>
             {/* - {JSON.stringify(habitStreak)} */}
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
