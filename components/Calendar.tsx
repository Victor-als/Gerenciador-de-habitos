'use client'

import { useEffect, useState } from "react";
import ArrowIcon from "./ArrowIcon";
import DayState from "./DayState";
import { toggleHabit } from "@/app/actions";


function getDaysInMonth(month: number, year: number) {
  const date = new Date(year, month, 1);
  const firstDayWeekDay = date.getDay();
  const numberOfEmptyDays = Array(firstDayWeekDay).fill(null)
  const days = [...numberOfEmptyDays];
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
}



const currentDate = new Date();
const currentMonth = currentDate.getMonth();
const currentYear = currentDate.getFullYear();
export default function Calendar ({ habit, habitStreak }: { habit: string; habitStreak: Record<string, boolean> | null; }) {
  const [changeMonth, setChangeMonth] = useState(currentMonth);
  const [changeYear, setChangeYear] = useState(currentYear);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [daysInMonth, setDaysInMonth] = useState(
    getDaysInMonth(currentMonth, currentYear)
  )

  useEffect(() => {
    setDaysInMonth(getDaysInMonth(currentMonth, currentYear))
    setSelectedDate(new Date(changeMonth, changeYear, 1));
  }, [changeMonth, changeYear])

  function goToPreviusMonth () {
    if (changeMonth === 0) {
      setChangeYear(changeYear - 1)
      setChangeMonth(11)
    } else {
      setChangeMonth(changeMonth - 1)
    }
  }
  
  function goToNextMonth () {
    if (changeMonth === 11) {
      setChangeYear(changeYear + 1)
      setChangeMonth(0)
    } else {
      setChangeMonth(changeMonth + 1)
    }
   
  }

  function getFullDateString () {
    const monthName = `${selectedDate.toLocaleString("pt-BR", {month: "long"})}`
    const upperCase = monthName[0].toUpperCase() + monthName.slice(1)
    return  `${upperCase} de ${selectedDate.getFullYear()}`
  }

    function getDayString(day: Date) {
      return `
        ${changeYear.toString()}-${(changeMonth + 1).toString().padStart(2, "0")}-${day
        .getDate()
        .toString()
        .padStart(2, "0")}`;
    }
  
  const weekDays = ["Dom", "Seg", "Ter","Qua", "Qui", "Sex", "Sab"]
  return (
    <section className="w-full my-2 rounded-md bg-neutral-800">
        <div className="flex justify-between mx-2 my-4 font-sans text-neutral-400">
          <button onClick={goToPreviusMonth}>
            <ArrowIcon width={12} height={12} className="stroke-slate-400"/>
          </button>
          <span>{getFullDateString()}</span>
          <button onClick={goToNextMonth}>
           <ArrowIcon width={12} height={12} className="rotate-180 stroke-neutral-400"/>
          </button>
        </div>

        <div className="grid w-full grid-cols-7 mt-2">
          {weekDays.map((day) => (
            <div key={day} className="flex flex-col items-center p-2">
              <span className="font-sans text-xs font-light text-neutral-200">
                {day}
              </span>
            </div>
          ))}
          {daysInMonth.map((day, index) => (
            <div 
             onClick={() => toggleHabit({
              habit, 
              habitStreak,
              date: getDayString(day),
              done: habitStreak ? habitStreak[getDayString(day)] : true,
             })}
             key={index} 
             className="flex flex-col items-center justify-center">
              <span className="font-sans text-xs font-light text-neutral-400">
                {day?.getDate()}
              </span>
              {day && <DayState day={habitStreak ? habitStreak [getDayString(day)] : undefined}/>}
            </div>
          ))}
        </div>
      </section>
  )
}