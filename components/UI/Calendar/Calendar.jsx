import React, { useState } from 'react';
import className from 'classnames/bind';
import styles from './Calendar.module.scss';
let cx = className.bind(styles);

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const days = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const handleDateClick = (day) => {
    setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day));
    setShowModal(true);
  };

  const renderCalendarDays = () => {
    const daysArray = [];
    const totalDays = 42; // 6 rows of 7 days

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      daysArray.push(<div key={`empty-${i}`} className={cx('day', 'empty')}></div>);
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      daysArray.push(
        <div
          key={day}
          className={cx('day')}
          onClick={() => handleDateClick(day)}
        >
          {day}
        </div>
      );
    }

    // Add empty cells for remaining days
    const remainingDays = totalDays - (firstDayOfMonth + daysInMonth);
    for (let i = 0; i < remainingDays; i++) {
      daysArray.push(<div key={`empty-end-${i}`} className={cx('day', 'empty')}></div>);
    }

    return daysArray;
  };

  return (
    <div className={cx('calendar')}>
      <div className={cx('header')}>
        <button onClick={handlePrevMonth}>&lt;</button>
        <h2>{months[currentDate.getMonth()]} {currentDate.getFullYear()}</h2>
        <button onClick={handleNextMonth}>&gt;</button>
      </div>
      
      <div className={cx('days-header')}>
        {days.map(day => (
          <div key={day} className={cx('day-name')}>{day}</div>
        ))}
      </div>
      
      <div className={cx('days-grid')}>
        {renderCalendarDays()}
      </div>

      {showModal && selectedDate && (
        <div className={cx('modal')}>
          <div className={cx('modal-content')}>
            <h3>Eventos para {selectedDate.toLocaleDateString()}</h3>
            <p>Aquí irá la información de los eventos</p>
            <button onClick={() => setShowModal(false)}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar; 