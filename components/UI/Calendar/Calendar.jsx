import React, { useState, useEffect } from 'react';
import className from 'classnames/bind';
import styles from './Calendar.module.scss';
let cx = className.bind(styles);

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [eventoSeleccionado, setEventoSeleccionado] = useState(null);
  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, titulo: '', hora: '' });

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

  function esMismaFecha(date, fechaStr) {
    const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const [anio, mes, dia] = fechaStr.split('-').map(Number);
    return d.getFullYear() === anio && (d.getMonth() + 1) === mes && d.getDate() === dia;
  }

  const handleDateClick = (day) => {
    const fecha = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const evento = eventosDummy.find(e => esMismaFecha(fecha, e.fecha));
    setSelectedDate(fecha);
    setEventoSeleccionado(evento || null);
  };

  const handleMouseEnter = (e, evento) => {
    setTooltip({
      visible: true,
      x: e.clientX,
      y: e.clientY - 40,
      titulo: evento.nombre,
      hora: evento.hora
    });
  };

  const handleMouseLeave = () => {
    setTooltip({ ...tooltip, visible: false });
  };

  const renderCalendarDays = () => {
    const daysArray = [];
    const totalDays = 42; // 6 rows of 7 days

    for (let i = 0; i < firstDayOfMonth; i++) {
      daysArray.push(<div key={`empty-${i}`} className={cx('day', 'empty')}></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const fecha = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const evento = eventosDummy.find(e => esMismaFecha(fecha, e.fecha));
      daysArray.push(
        <div
          key={day}
          className={cx('day', { 'con-evento': !!evento })}
          onClick={() => handleDateClick(day)}
          onMouseEnter={evento ? (e) => handleMouseEnter(e, evento) : undefined}
          onMouseMove={evento ? (e) => handleMouseEnter(e, evento) : undefined}
          onMouseLeave={evento ? handleMouseLeave : undefined}
        >
          {day}
        </div>
      );
    }

    const remainingDays = totalDays - (firstDayOfMonth + daysInMonth);
    for (let i = 0; i < remainingDays; i++) {
      daysArray.push(<div key={`empty-end-${i}`} className={cx('day', 'empty')}></div>);
    }

    return daysArray;
  };

  const eventosDummy = [
    {
      fecha: '2025-05-19',
      hora: '08:00',
      nombre: 'Spring Festival',
      tipo: 'Festival',
      lugar: 'Central Plaza',
      precio: 'Gratis',
      rango: 'May 19',
    },
    {
      fecha: '2025-05-05',
      hora: '10:00',
      nombre: 'Corn Maze',
      tipo: 'Outdoors',
      lugar: 'Forest Park',
      precio: '$10',
      rango: 'May 5',
    },
    {
      fecha: '2025-05-01',
      hora: '09:00',
      nombre: 'Haunted House',
      tipo: 'Attraction',
      lugar: 'Lemp Mansion',
      precio: '$10',
      rango: 'May 1-30',
    },
    {
      fecha: '2025-05-27',
      hora: '18:00',
      nombre: 'Music Night',
      tipo: 'Concert',
      lugar: 'Open Air Stage',
      precio: '$20',
      rango: 'May 27',
    },
  ];

  useEffect(() => {
    const fecha = new Date(2025, 4, 19); // Mes 4 = mayo
    setSelectedDate(fecha);
    setEventoSeleccionado(eventosDummy[0]);
  }, []);

  return (
    <div className={cx('main-layout')}>
      <div className={cx('calendar-panel')}>
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
          {tooltip.visible && (
            <div
              className={cx('tooltip-evento')}
              style={{ left: tooltip.x, top: tooltip.y, display: 'block', position: 'fixed' }}
            >
              <strong>{tooltip.titulo}</strong><br />{tooltip.hora}
            </div>
          )}
        </div>
      </div>
      <div className={cx('event-panel')}>
        <div className={cx('event-header')}>
          <h2>Local Events</h2>
        </div>
        {eventoSeleccionado && (
          <div className={cx('evento-detalle')}>
            <h3>{eventoSeleccionado.nombre}</h3>
            <p><strong>Hora:</strong> {eventoSeleccionado.hora}</p>
            <p><strong>Tipo:</strong> {eventoSeleccionado.tipo}</p>
            <p><strong>Lugar:</strong> {eventoSeleccionado.lugar}</p>
            <p><strong>Precio:</strong> {eventoSeleccionado.precio}</p>
            <p><strong>Rango:</strong> {eventoSeleccionado.rango}</p>
            <button onClick={() => setEventoSeleccionado(null)}>Cerrar</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Calendar; 