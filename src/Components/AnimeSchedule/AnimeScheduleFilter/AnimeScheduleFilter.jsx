import React from 'react';
import styles from './AnimeScheduleFilter.module.scss';

const AnimeScheduleFilter = (setDay) => {
  const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]

  const dayHandler = (e) => {
    setDay.setDay(e.target.value);
  }

  return (
    <div className={styles.filtersWrapper}>
        <select className={styles.dayFilter} onChange={dayHandler}>
          {days.map(day=>
            <option key={day} value={day}>{day}</option>
          )}
        </select>
        </div>
    );
}

export default AnimeScheduleFilter;