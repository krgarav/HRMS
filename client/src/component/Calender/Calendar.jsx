import React, { useState } from "react";
import styles from "./Calendar.module.css";

const Calendar = () => {
  const [viewDate, setViewDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const startOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1);
  const endOfMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0);

  const renderDays = () => {
    const start = startOfMonth(viewDate);
    const end = endOfMonth(viewDate);
    const startDayIndex = start.getDay();
    const daysInMonth = end.getDate();
    const prevMonthEnd = new Date(viewDate.getFullYear(), viewDate.getMonth(), 0).getDate();

    const totalCells = Math.ceil((startDayIndex + daysInMonth) / 7) * 7;
    const today = new Date();

    let days = [];
    for (let i = 0; i < totalCells; i++) {
      const dayNum = i - startDayIndex + 1;

      if (i < startDayIndex) {
        days.push(
          <div key={`prev-${i}`} className={`${styles.day} ${styles.inactive}`}>
            <span className={styles.num}>
              {prevMonthEnd - (startDayIndex - 1 - i)}
            </span>
          </div>
        );
      } else if (dayNum <= daysInMonth) {
        const dateObj = new Date(viewDate.getFullYear(), viewDate.getMonth(), dayNum);
        const isToday = dateObj.toDateString() === today.toDateString();
        const isSelected =
          selectedDate && dateObj.toDateString() === selectedDate.toDateString();

        days.push(
          <button
            key={`current-${i}`}
            className={`${styles.day} ${isToday ? styles.today : ""} ${
              isSelected ? styles.selected : ""
            }`}
            onClick={() => setSelectedDate(dateObj)}
          >
            <span className={styles.num}>{dayNum}</span>
          </button>
        );
      } else {
        days.push(
          <div key={`next-${i}`} className={`${styles.day} ${styles.inactive}`}>
            <span className={styles.num}>{dayNum - daysInMonth}</span>
          </div>
        );
      }
    }
    return days;
  };

  return (
    <div className={styles.calendar}>
      <div className={styles.header}>
        <button
          className={styles.navBtn}
          onClick={() =>
            setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1))
          }
        >
          ◀
        </button>
        <div className={styles.monthTitle}>
          {viewDate.toLocaleString("default", { month: "long" })} {viewDate.getFullYear()}
        </div>
        <button
          className={styles.navBtn}
          onClick={() =>
            setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1))
          }
        >
          ▶
        </button>
      </div>

      <div className={styles.weekDays}>
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
          <div key={d} className={styles.weekDay}>{d}</div>
        ))}
      </div>

      <div className={styles.days}>{renderDays()}</div>
    </div>
  );
};

export default Calendar;
