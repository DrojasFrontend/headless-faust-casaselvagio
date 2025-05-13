import React, { useState, useEffect, useRef } from 'react';
import className from 'classnames/bind';
import styles from './Calendar.module.scss';
let cx = className.bind(styles);

import { Container } from "../../Layout/Container";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [eventoSeleccionado, setEventoSeleccionado] = useState(null);
  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, titulo: '', hora: '' });
  const descripcionRef = useRef(null);

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
    // Scroll en móvil
    if (window.innerWidth < 768 && descripcionRef.current) {
      setTimeout(() => {
        descripcionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100); // pequeño delay para asegurar render
    }
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
          className={cx('day', {
            'con-evento': !!evento,
            'seleccionado': selectedDate && fecha.toDateString() === selectedDate.toDateString()
          })}
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
    // Primer fin de semana - Junio
    {
      fecha: '2025-06-06',
      hora: '17:30',
      nombre: 'Saxofón Sunset',
      descripciones: {
        descripcion1: {
          titulo: '<strong>Saxofón Sunset</strong>',
          hora: '5:30 pm a 6:30 pm',
          detalle: 'Atardecer en la terraza con saxofón en vivo: música suave para despedir el día y dar la bienvenida a la noche.',
          enlace: '#',
        },
        descripcion2: {
          titulo: '<strong>Cena en Forestia</strong>',
          hora: '7:30 pm',
          detalle: 'Acá tendremos una playlist especial x The Music Lab, música con ambiente de fiesta',
          enlace: '#',
        }
      }
    },
    {
      fecha: '2025-06-07',
      hora: '09:00',
      nombre: 'Sábado',
      descripciones: {
        descripcion1: {
          titulo: '<strong>Desayuno Forestia</strong>',
          hora: '9:00 am a 10:00 am',
          detalle: 'La Casa Invita',
          enlace: '#',
        },
        descripcion2: {
          titulo: '<strong>Senderismo</strong>',
          hora: '10:30 am a 12:30 pm',
          detalle: 'Esta experiencia te invita a explorar algunos de los rincones naturales más cautivadores de la región. Desde senderos que conducen a quebradas escondidas, hasta caminos que ascienden cerros con vistas panorámicas, podrás elegir entre varias rutas según tu nivel de energía y tu conexión con el entorno.',
          enlace: '#',
        },
        descripcion3: {
          titulo: '<strong>Almuerzo Forestia</strong>',
          hora: '1:30 pm a 2:30 pm',
          detalle: 'No Incluido',
          enlace: '#',
        },
        descripcion4: {
          titulo: '<strong>Cabalgata Por Senderos Andinos</strong>',
          hora: '3:30 pm a 6:00 pm',
          detalle: 'Sí te gusta la naturaleza y los planes diferentes, este recorrido a caballo es para ti. Durante dos horas y media, recorrerán antiguos Caminos Reales y senderos rurales, cruzando bosques de robles, quebradas y paisajes.',
          enlace: '#',
        },
        descripcion5: {
          titulo: '<strong>Cena en Forestia</strong>',
          hora: '7:30 pm',
          detalle: 'Acá tendremos una playlist especial x The Music Lab, música con ambiente de fiesta',
          enlace: '#',
        }
      }
    },
    {
      fecha: '2025-06-08',
      hora: '08:00',
      nombre: 'Meditación y Yoga',
      descripciones: {
        descripcion1: {
          titulo: '<strong>Meditación y Yoga</strong>',
          hora: '8:00 am a 9:30 am',
          detalle: 'Una experiencia íntima para volver a lo esencial. Respirar juntos, moverse con intención, abrir el corazón y sostenerse mutuamente desde la presencia. Este encuentro propone una pausa consciente para reconectar.',
          enlace: '#',
        },
        descripcion2: {
          titulo: '<strong>Nota</strong>',
          hora: '',
          detalle: '¿Te antojaste de un masaje? ¡Este es el momento perfecto! Espacio para reservar masajes o diferentes clases con nuestros facilitadores (No incluido)',
          enlace: '#',
        },
        descripcion3: {
          titulo: '<strong>Desayuno Forestia</strong>',
          hora: '9:00 am a 10:00 am',
          detalle: 'La Casa Invita',
          enlace: '#',
        },
        descripcion4: {
          titulo: '<strong>Check out</strong>',
          hora: '1:00 pm',
          detalle: '',
          enlace: '#',
        },
        descripcion5: {
          titulo: '<strong>Almuerzo Forestia</strong>',
          hora: '1:30 pm',
          detalle: 'No Incluido',
          enlace: '#',
        }
      }
    },
    {
      fecha: '2025-06-13',
      hora: '17:30',
      nombre: 'Bossa Nova Sunset',
      descripciones: {
        descripcion1: {
          titulo: '<strong>Bossa Nova Sunset</strong>',
          hora: '5:30 pm a 6:30 pm',
          detalle: 'Bossa Nova en vivo en la terraza: ritmos ligeros para cerrar el día y abrir la noche.',
          enlace: '#',
        },
        descripcion2: {
          titulo: '<strong>Cena en Forestia</strong>',
          hora: '7:00 pm',
          detalle: 'Acá tendremos una playlist especial x The Music Lab',
          enlace: '#',
        }
      }
    },
    {
      fecha: '2025-06-14',
      hora: '08:30',
      nombre: 'Clase de Yoga',
      descripciones: {
        descripcion1: {
          titulo: '<strong>Clase de Yoga</strong>',
          hora: '8:30 am a 9:30 am',
          detalle: 'Una experiencia íntima para volver a lo esencial. Respirar juntos, moverse con intención, abrir el corazón y sostenerse mutuamente desde la presencia. Este encuentro sugiere una pausa consciente para reconectar.',
          enlace: '#',
        },
        descripcion2: {
          titulo: '<strong>Desayuno Forestia</strong>',
          hora: '9:30 am a 10:30 am',
          detalle: 'La Casa Invita',
          enlace: '#',
        },
        descripcion3: {
          titulo: '<strong>Alma Samurái</strong>',
          hora: '10:45 am a 11:45 am',
          detalle: 'Experiencia de Artes Marciales Japonesas En esta experiencia vivirás las prácticas de los guerreros Samurái, a través de: las artes marciales, el manejo de la katana (espada japonesa), la meditación Bushidō, la caligrafía y la poesía haiku; y conocerás su filosofía de vida y a cómo aplicarla en tu vida diaria para lograr tus metas y superar tus límites. Una experiencia para todas las edades y niveles',
          enlace: '#',
        },
        descripcion4: {
          titulo: '<strong>Tour de Artesanos</strong>',
          hora: '2:30 pm a 6:00 pm',
          detalle: 'Descubre las tradiciones artesanales y gastronómicas de Tinjacá y San Miguel de Sema en este recorrido que te llevará por las veredas, donde conocerás de cerca dos oficios tradicionales que han dado identidad a la región: la cestería en esparto y la Producción artesanal de quesos.',
          enlace: '#',
        },
        descripcion5: {
          titulo: '<strong>Cena en Forestia</strong>',
          hora: '7:00 pm a 12:00 pm',
          detalle: 'No Incluido',
          enlace: '#',
        }
      }
    },
    {
      fecha: '2025-06-15',
      hora: '10:30',
      nombre: 'Senderismo',
      descripciones: {
        descripcion1: {
          titulo: '<strong>Senderismo</strong>',
          hora: '10:30 am a 12:30 pm',
          detalle: 'Esta experiencia te invita a explorar algunos de los rincones naturales más cautivadores de la región. Desde senderos que conducen a quebradas escondidas, hasta caminos que ascienden cerros con vistas panorámicas, podrás elegir entre varias rutas según tu nivel de energía y tu conexión con el entorno.',
          enlace: '#',
        },
        descripcion2: {
          titulo: '<strong>Check out</strong>',
          hora: '1:00 pm',
          detalle: '',
          enlace: '#',
        },
        descripcion3: {
          titulo: '<strong>Almuerzo Forestia</strong>',
          hora: '1:30 pm',
          detalle: 'No Incluido',
          enlace: '#',
        }
      }
    },
    // Segundo fin de semana - Junio
    {
      fecha: '2025-06-13',
      hora: '17:30',
      nombre: 'Bossa Nova Sunset',
      descripciones: {
        descripcion1: {
          titulo: '<strong>Bossa Nova Sunset</strong>',
          hora: '5:30 pm a 6:30 pm',
          detalle: 'Bossa Nova en vivo en la terraza: ritmos ligeros para cerrar el día y abrir la noche.',
          enlace: '#',
        },
        descripcion2: {
          titulo: '<strong>Cena en Forestia</strong>',
          hora: '7:00 pm',
          detalle: 'Acá tendremos una playlist especial x The Music Lab',
          enlace: '#',
        }
      }
    },
    {
      fecha: '2025-06-14',
      hora: '08:30',
      nombre: 'Clase de Yoga',
      descripciones: {
        descripcion1: {
          titulo: '<strong>Clase de Yoga</strong>',
          hora: '8:30 am a 9:30 am',
          detalle: 'Una experiencia íntima para volver a lo esencial. Respirar juntos, moverse con intención, abrir el corazón y sostenerse mutuamente desde la presencia. Este encuentro sugiere una pausa consciente para reconectar.',
          enlace: '#',
        },
        descripcion2: {
          titulo: '<strong>Desayuno Forestia</strong>',
          hora: '9:30 am a 10:30 am',
          detalle: 'La Casa Invita',
          enlace: '#',
        },
        descripcion3: {
          titulo: '<strong>Alma Samurái</strong>',
          hora: '10:45 am a 11:45 am',
          detalle: 'Experiencia de Artes Marciales Japonesas En esta experiencia vivirás las prácticas de los guerreros Samurái, a través de: las artes marciales, el manejo de la katana (espada japonesa), la meditación Bushidō, la caligrafía y la poesía haiku; y conocerás su filosofía de vida y a cómo aplicarla en tu vida diaria para lograr tus metas y superar tus límites. Una experiencia para todas las edades y niveles',
          enlace: '#',
        },
        descripcion4: {
          titulo: '<strong>Tour de Artesanos</strong>',
          hora: '2:30 pm a 6:00 pm',
          detalle: 'Descubre las tradiciones artesanales y gastronómicas de Tinjacá y San Miguel de Sema en este recorrido que te llevará por las veredas, donde conocerás de cerca dos oficios tradicionales que han dado identidad a la región: la cestería en esparto y la Producción artesanal de quesos.',
          enlace: '#',
        },
        descripcion5: {
          titulo: '<strong>Cena en Forestia</strong>',
          hora: '7:00 pm a 12:00 pm',
          detalle: 'No Incluido',
          enlace: '#',
        }
      }
    },
    {
      fecha: '2025-06-15',
      hora: '10:30',
      nombre: 'Senderismo',
      descripciones: {
        descripcion1: {
          titulo: '<strong>Senderismo</strong>',
          hora: '10:30 am a 12:30 pm',
          detalle: 'Esta experiencia te invita a explorar algunos de los rincones naturales más cautivadores de la región. Desde senderos que conducen a quebradas escondidas, hasta caminos que ascienden cerros con vistas panorámicas, podrás elegir entre varias rutas según tu nivel de energía y tu conexión con el entorno.',
          enlace: '#',
        },
        descripcion2: {
          titulo: '<strong>Check out</strong>',
          hora: '1:00 pm',
          detalle: '',
          enlace: '#',
        },
        descripcion3: {
          titulo: '<strong>Almuerzo Forestia</strong>',
          hora: '1:30 pm',
          detalle: 'No Incluido',
          enlace: '#',
        }
      }
    },
     // Tercero fin de semana - Junio
     {
      fecha: '2025-06-20',
      hora: '17:30',
      nombre: 'Saxofón Sunset',
      descripciones: {
        descripcion1: {
          titulo: '<strong>Saxofón Sunset</strong>',
          hora: '5:30 pm a 6:30 pm',
          detalle: 'Atardecer en la terraza con saxofón en vivo: música suave para despedir el día y dar la bienvenida a la noche.',
          enlace: '#',
        },
        descripcion2: {
          titulo: '<strong>Cena en Forestia</strong>',
          hora: '7:30 pm',
          detalle: 'Acá tendremos una playlist especial x The Music Lab, música con ambiente de fiesta',
          enlace: '#',
        }
      }
    },
    {
      fecha: '2025-06-21',
      hora: '09:00',
      nombre: 'Sábado',
      descripciones: {
        descripcion1: {
          titulo: '<strong>Desayuno Forestia</strong>',
          hora: '9:00 am a 10:00 am',
          detalle: 'La Casa Invita',
          enlace: '#',
        },
        descripcion2: {
          titulo: '<strong>Senderismo</strong>',
          hora: '10:30 am a 12:30 pm',
          detalle: 'Esta experiencia te invita a explorar algunos de los rincones naturales más cautivadores de la región. Desde senderos que conducen a quebradas escondidas, hasta caminos que ascienden cerros con vistas panorámicas, podrás elegir entre varias rutas según tu nivel de energía y tu conexión con el entorno.',
          enlace: '#',
        },
        descripcion3: {
          titulo: '<strong>Almuerzo Forestia</strong>',
          hora: '1:30 pm a 2:30 pm',
          detalle: 'No Incluido',
          enlace: '#',
        },
        descripcion4: {
          titulo: '<strong>Cabalgata Por Senderos Andinos</strong>',
          hora: '3:30 pm a 6:00 pm',
          detalle: 'Sí te gusta la naturaleza y los planes diferentes, este recorrido a caballo es para ti. Durante dos horas y media, recorrerán antiguos Caminos Reales y senderos rurales, cruzando bosques de robles, quebradas y paisajes.',
          enlace: '#',
        },
        descripcion5: {
          titulo: '<strong>Cena en Forestia</strong>',
          hora: '7:30 pm',
          detalle: 'Acá tendremos una playlist especial x The Music Lab, música con ambiente de fiesta',
          enlace: '#',
        }
      }
    },
    {
      fecha: '2025-06-22',
      hora: '08:00',
      nombre: 'Meditación y Yoga',
      descripciones: {
        descripcion1: {
          titulo: '<strong>Meditación y Yoga</strong>',
          hora: '8:00 am a 9:30 am',
          detalle: 'Una experiencia íntima para volver a lo esencial. Respirar juntos, moverse con intención, abrir el corazón y sostenerse mutuamente desde la presencia. Este encuentro propone una pausa consciente para reconectar.',
          enlace: '#',
        },
        descripcion2: {
          titulo: '<strong>Nota</strong>',
          hora: '',
          detalle: '¿Te antojaste de un masaje? ¡Este es el momento perfecto! Espacio para reservar masajes o diferentes clases con nuestros facilitadores (No incluido)',
          enlace: '#',
        },
        descripcion3: {
          titulo: '<strong>Desayuno Forestia</strong>',
          hora: '9:00 am a 10:00 am',
          detalle: 'La Casa Invita',
          enlace: '#',
        },
        descripcion4: {
          titulo: '<strong>Check out</strong>',
          hora: '1:00 pm',
          detalle: '',
          enlace: '#',
        },
        descripcion5: {
          titulo: '<strong>Almuerzo Forestia</strong>',
          hora: '1:30 pm',
          detalle: 'No Incluido',
          enlace: '#',
        }
      }
    },
    // Cuarto fin de semana - Junio
    {
      fecha: '2025-06-27',
      hora: '17:30',
      nombre: 'Bossa Nova Sunset',
      descripciones: {
        descripcion1: {
          titulo: '<strong>Bossa Nova Sunset</strong>',
          hora: '5:30 pm a 6:30 pm',
          detalle: 'Bossa Nova en vivo en la terraza: ritmos ligeros para cerrar el día y abrir la noche.',
          enlace: '#',
        },
        descripcion2: {
          titulo: '<strong>Cena en Forestia</strong>',
          hora: '7:00 pm',
          detalle: 'Acá tendremos una playlist especial x The Music Lab',
          enlace: '#',
        }
      }
    },
    {
      fecha: '2025-06-28',
      hora: '08:30',
      nombre: 'Clase de Yoga',
      descripciones: {
        descripcion1: {
          titulo: '<strong>Clase de Yoga</strong>',
          hora: '8:30 am a 9:30 am',
          detalle: 'Una experiencia íntima para volver a lo esencial. Respirar juntos, moverse con intención, abrir el corazón y sostenerse mutuamente desde la presencia. Este encuentro sugiere una pausa consciente para reconectar.',
          enlace: '#',
        },
        descripcion2: {
          titulo: '<strong>Desayuno Forestia</strong>',
          hora: '9:30 am a 10:30 am',
          detalle: 'La Casa Invita',
          enlace: '#',
        },
        descripcion3: {
          titulo: '<strong>Alma Samurái</strong>',
          hora: '10:45 am a 11:45 am',
          detalle: 'Experiencia de Artes Marciales Japonesas En esta experiencia vivirás las prácticas de los guerreros Samurái, a través de: las artes marciales, el manejo de la katana (espada japonesa), la meditación Bushidō, la caligrafía y la poesía haiku; y conocerás su filosofía de vida y a cómo aplicarla en tu vida diaria para lograr tus metas y superar tus límites. Una experiencia para todas las edades y niveles',
          enlace: '#',
        },
        descripcion4: {
          titulo: '<strong>Tour de Artesanos</strong>',
          hora: '2:30 pm a 6:00 pm',
          detalle: 'Descubre las tradiciones artesanales y gastronómicas de Tinjacá y San Miguel de Sema en este recorrido que te llevará por las veredas, donde conocerás de cerca dos oficios tradicionales que han dado identidad a la región: la cestería en esparto y la Producción artesanal de quesos.',
          enlace: '#',
        },
        descripcion5: {
          titulo: '<strong>Cena en Forestia</strong>',
          hora: '7:00 pm a 12:00 pm',
          detalle: 'No Incluido',
          enlace: '#',
        }
      }
    },
    {
      fecha: '2025-06-29',
      hora: '10:30',
      nombre: 'Senderismo',
      descripciones: {
        descripcion1: {
          titulo: '<strong>Senderismo</strong>',
          hora: '10:30 am a 12:30 pm',
          detalle: 'Esta experiencia te invita a explorar algunos de los rincones naturales más cautivadores de la región. Desde senderos que conducen a quebradas escondidas, hasta caminos que ascienden cerros con vistas panorámicas, podrás elegir entre varias rutas según tu nivel de energía y tu conexión con el entorno.',
          enlace: '#',
        },
        descripcion2: {
          titulo: '<strong>Check out</strong>',
          hora: '1:00 pm',
          detalle: '',
          enlace: '#',
        },
        descripcion3: {
          titulo: '<strong>Almuerzo Forestia</strong>',
          hora: '1:30 pm',
          detalle: 'No Incluido',
          enlace: '#',
        }
      }
    },
     // Quinto fin de semana - Junio
     {
      fecha: '2025-07-04',
      hora: '17:30',
      nombre: 'Saxofón Sunset',
      descripciones: {
        descripcion1: {
          titulo: '<strong>Saxofón Sunset</strong>',
          hora: '5:30 pm a 6:30 pm',
          detalle: 'Atardecer en la terraza con saxofón en vivo: música suave para despedir el día y dar la bienvenida a la noche.',
          enlace: '#',
        },
        descripcion2: {
          titulo: '<strong>Cena en Forestia</strong>',
          hora: '7:30 pm',
          detalle: 'Acá tendremos una playlist especial x The Music Lab, música con ambiente de fiesta',
          enlace: '#',
        }
      }
    },
    {
      fecha: '2025-07-05',
      hora: '09:00',
      nombre: 'Sábado',
      descripciones: {
        descripcion1: {
          titulo: '<strong>Desayuno Forestia</strong>',
          hora: '9:00 am a 10:00 am',
          detalle: 'La Casa Invita',
          enlace: '#',
        },
        descripcion2: {
          titulo: '<strong>Senderismo</strong>',
          hora: '10:30 am a 12:30 pm',
          detalle: 'Esta experiencia te invita a explorar algunos de los rincones naturales más cautivadores de la región. Desde senderos que conducen a quebradas escondidas, hasta caminos que ascienden cerros con vistas panorámicas, podrás elegir entre varias rutas según tu nivel de energía y tu conexión con el entorno.',
          enlace: '#',
        },
        descripcion3: {
          titulo: '<strong>Almuerzo Forestia</strong>',
          hora: '1:30 pm a 2:30 pm',
          detalle: 'No Incluido',
          enlace: '#',
        },
        descripcion4: {
          titulo: '<strong>Cabalgata Por Senderos Andinos</strong>',
          hora: '3:30 pm a 6:00 pm',
          detalle: 'Sí te gusta la naturaleza y los planes diferentes, este recorrido a caballo es para ti. Durante dos horas y media, recorrerán antiguos Caminos Reales y senderos rurales, cruzando bosques de robles, quebradas y paisajes.',
          enlace: '#',
        },
        descripcion5: {
          titulo: '<strong>Cena en Forestia</strong>',
          hora: '7:30 pm',
          detalle: 'Acá tendremos una playlist especial x The Music Lab, música con ambiente de fiesta',
          enlace: '#',
        }
      }
    },
    {
      fecha: '2025-07-06',
      hora: '08:00',
      nombre: 'Meditación y Yoga',
      descripciones: {
        descripcion1: {
          titulo: '<strong>Meditación y Yoga</strong>',
          hora: '8:00 am a 9:30 am',
          detalle: 'Una experiencia íntima para volver a lo esencial. Respirar juntos, moverse con intención, abrir el corazón y sostenerse mutuamente desde la presencia. Este encuentro propone una pausa consciente para reconectar.',
          enlace: '#',
        },
        descripcion2: {
          titulo: '<strong>Nota</strong>',
          hora: '',
          detalle: '¿Te antojaste de un masaje? ¡Este es el momento perfecto! Espacio para reservar masajes o diferentes clases con nuestros facilitadores (No incluido)',
          enlace: '#',
        },
        descripcion3: {
          titulo: '<strong>Desayuno Forestia</strong>',
          hora: '9:00 am a 10:00 am',
          detalle: 'La Casa Invita',
          enlace: '#',
        },
        descripcion4: {
          titulo: '<strong>Check out</strong>',
          hora: '1:00 pm',
          detalle: '',
          enlace: '#',
        },
        descripcion5: {
          titulo: '<strong>Almuerzo Forestia</strong>',
          hora: '1:30 pm',
          detalle: 'No Incluido',
          enlace: '#',
        }
      }
    },
    // sexto fin de semana - Junio
    {
      fecha: '2025-07-11',
      hora: '17:30',
      nombre: 'Bossa Nova Sunset',
      descripciones: {
        descripcion1: {
          titulo: '<strong>Bossa Nova Sunset</strong>',
          hora: '5:30 pm a 6:30 pm',
          detalle: 'Bossa Nova en vivo en la terraza: ritmos ligeros para cerrar el día y abrir la noche.',
          enlace: '#',
        },
        descripcion2: {
          titulo: '<strong>Cena en Forestia</strong>',
          hora: '7:00 pm',
          detalle: 'Acá tendremos una playlist especial x The Music Lab',
          enlace: '#',
        }
      }
    },
    {
      fecha: '2025-07-12',
      hora: '08:30',
      nombre: 'Clase de Yoga',
      descripciones: {
        descripcion1: {
          titulo: '<strong>Clase de Yoga</strong>',
          hora: '8:30 am a 9:30 am',
          detalle: 'Una experiencia íntima para volver a lo esencial. Respirar juntos, moverse con intención, abrir el corazón y sostenerse mutuamente desde la presencia. Este encuentro sugiere una pausa consciente para reconectar.',
          enlace: '#',
        },
        descripcion2: {
          titulo: '<strong>Desayuno Forestia</strong>',
          hora: '9:30 am a 10:30 am',
          detalle: 'La Casa Invita',
          enlace: '#',
        },
        descripcion3: {
          titulo: '<strong>Alma Samurái</strong>',
          hora: '10:45 am a 11:45 am',
          detalle: 'Experiencia de Artes Marciales Japonesas En esta experiencia vivirás las prácticas de los guerreros Samurái, a través de: las artes marciales, el manejo de la katana (espada japonesa), la meditación Bushidō, la caligrafía y la poesía haiku; y conocerás su filosofía de vida y a cómo aplicarla en tu vida diaria para lograr tus metas y superar tus límites. Una experiencia para todas las edades y niveles',
          enlace: '#',
        },
        descripcion4: {
          titulo: '<strong>Tour de Artesanos</strong>',
          hora: '2:30 pm a 6:00 pm',
          detalle: 'Descubre las tradiciones artesanales y gastronómicas de Tinjacá y San Miguel de Sema en este recorrido que te llevará por las veredas, donde conocerás de cerca dos oficios tradicionales que han dado identidad a la región: la cestería en esparto y la Producción artesanal de quesos.',
          enlace: '#',
        },
        descripcion5: {
          titulo: '<strong>Cena en Forestia</strong>',
          hora: '7:00 pm a 12:00 pm',
          detalle: 'No Incluido',
          enlace: '#',
        }
      }
    },
    {
      fecha: '2025-07-13',
      hora: '10:30',
      nombre: 'Senderismo',
      descripciones: {
        descripcion1: {
          titulo: '<strong>Senderismo</strong>',
          hora: '10:30 am a 12:30 pm',
          detalle: 'Esta experiencia te invita a explorar algunos de los rincones naturales más cautivadores de la región. Desde senderos que conducen a quebradas escondidas, hasta caminos que ascienden cerros con vistas panorámicas, podrás elegir entre varias rutas según tu nivel de energía y tu conexión con el entorno.',
          enlace: '#',
        },
        descripcion2: {
          titulo: '<strong>Check out</strong>',
          hora: '1:00 pm',
          detalle: '',
          enlace: '#',
        },
        descripcion3: {
          titulo: '<strong>Almuerzo Forestia</strong>',
          hora: '1:30 pm',
          detalle: 'No Incluido',
          enlace: '#',
        }
      }
    },
    // Septimo fin de semana - Junio
    {
      fecha: '2025-07-18',
      hora: '17:30',
      nombre: 'Saxofón Sunset',
      descripciones: {
        descripcion1: {
          titulo: '<strong>Saxofón Sunset</strong>',
          hora: '5:30 pm a 6:30 pm',
          detalle: 'Atardecer en la terraza con saxofón en vivo: música suave para despedir el día y dar la bienvenida a la noche.',
          enlace: '#',
        },
        descripcion2: {
          titulo: '<strong>Cena en Forestia</strong>',
          hora: '7:30 pm',
          detalle: 'Acá tendremos una playlist especial x The Music Lab, música con ambiente de fiesta',
          enlace: '#',
        }
      }
    },
    {
      fecha: '2025-07-19',
      hora: '09:00',
      nombre: 'Sábado',
      descripciones: {
        descripcion1: {
          titulo: '<strong>Desayuno Forestia</strong>',
          hora: '9:00 am a 10:00 am',
          detalle: 'La Casa Invita',
          enlace: '#',
        },
        descripcion2: {
          titulo: '<strong>Senderismo</strong>',
          hora: '10:30 am a 12:30 pm',
          detalle: 'Esta experiencia te invita a explorar algunos de los rincones naturales más cautivadores de la región. Desde senderos que conducen a quebradas escondidas, hasta caminos que ascienden cerros con vistas panorámicas, podrás elegir entre varias rutas según tu nivel de energía y tu conexión con el entorno.',
          enlace: '#',
        },
        descripcion3: {
          titulo: '<strong>Almuerzo Forestia</strong>',
          hora: '1:30 pm a 2:30 pm',
          detalle: 'No Incluido',
          enlace: '#',
        },
        descripcion4: {
          titulo: '<strong>Cabalgata Por Senderos Andinos</strong>',
          hora: '3:30 pm a 6:00 pm',
          detalle: 'Sí te gusta la naturaleza y los planes diferentes, este recorrido a caballo es para ti. Durante dos horas y media, recorrerán antiguos Caminos Reales y senderos rurales, cruzando bosques de robles, quebradas y paisajes.',
          enlace: '#',
        },
        descripcion5: {
          titulo: '<strong>Cena en Forestia</strong>',
          hora: '7:30 pm',
          detalle: 'Acá tendremos una playlist especial x The Music Lab, música con ambiente de fiesta',
          enlace: '#',
        }
      }
    },
    {
      fecha: '2025-07-20',
      hora: '08:00',
      nombre: 'Meditación y Yoga',
      descripciones: {
        descripcion1: {
          titulo: '<strong>Meditación y Yoga</strong>',
          hora: '8:00 am a 9:30 am',
          detalle: 'Una experiencia íntima para volver a lo esencial. Respirar juntos, moverse con intención, abrir el corazón y sostenerse mutuamente desde la presencia. Este encuentro propone una pausa consciente para reconectar.',
          enlace: '#',
        },
        descripcion2: {
          titulo: '<strong>Nota</strong>',
          hora: '',
          detalle: '¿Te antojaste de un masaje? ¡Este es el momento perfecto! Espacio para reservar masajes o diferentes clases con nuestros facilitadores (No incluido)',
          enlace: '#',
        },
        descripcion3: {
          titulo: '<strong>Desayuno Forestia</strong>',
          hora: '9:00 am a 10:00 am',
          detalle: 'La Casa Invita',
          enlace: '#',
        },
        descripcion4: {
          titulo: '<strong>Check out</strong>',
          hora: '1:00 pm',
          detalle: '',
          enlace: '#',
        },
        descripcion5: {
          titulo: '<strong>Almuerzo Forestia</strong>',
          hora: '1:30 pm',
          detalle: 'No Incluido',
          enlace: '#',
        }
      }
    },
    // Octavo fin de semana - Junio
    {
      fecha: '2025-07-25',
      hora: '17:30',
      nombre: 'Bossa Nova Sunset',
      descripciones: {
        descripcion1: {
          titulo: '<strong>Bossa Nova Sunset</strong>',
          hora: '5:30 pm a 6:30 pm',
          detalle: 'Bossa Nova en vivo en la terraza: ritmos ligeros para cerrar el día y abrir la noche.',
          enlace: '#',
        },
        descripcion2: {
          titulo: '<strong>Cena en Forestia</strong>',
          hora: '7:00 pm',
          detalle: 'Acá tendremos una playlist especial x The Music Lab',
          enlace: '#',
        }
      }
    },
    {
      fecha: '2025-07-26',
      hora: '08:30',
      nombre: 'Clase de Yoga',
      descripciones: {
        descripcion1: {
          titulo: '<strong>Clase de Yoga</strong>',
          hora: '8:30 am a 9:30 am',
          detalle: 'Una experiencia íntima para volver a lo esencial. Respirar juntos, moverse con intención, abrir el corazón y sostenerse mutuamente desde la presencia. Este encuentro sugiere una pausa consciente para reconectar.',
          enlace: '#',
        },
        descripcion2: {
          titulo: '<strong>Desayuno Forestia</strong>',
          hora: '9:30 am a 10:30 am',
          detalle: 'La Casa Invita',
          enlace: '#',
        },
        descripcion3: {
          titulo: '<strong>Alma Samurái</strong>',
          hora: '10:45 am a 11:45 am',
          detalle: 'Experiencia de Artes Marciales Japonesas En esta experiencia vivirás las prácticas de los guerreros Samurái, a través de: las artes marciales, el manejo de la katana (espada japonesa), la meditación Bushidō, la caligrafía y la poesía haiku; y conocerás su filosofía de vida y a cómo aplicarla en tu vida diaria para lograr tus metas y superar tus límites. Una experiencia para todas las edades y niveles',
          enlace: '#',
        },
        descripcion4: {
          titulo: '<strong>Tour de Artesanos</strong>',
          hora: '2:30 pm a 6:00 pm',
          detalle: 'Descubre las tradiciones artesanales y gastronómicas de Tinjacá y San Miguel de Sema en este recorrido que te llevará por las veredas, donde conocerás de cerca dos oficios tradicionales que han dado identidad a la región: la cestería en esparto y la Producción artesanal de quesos.',
          enlace: '#',
        },
        descripcion5: {
          titulo: '<strong>Cena en Forestia</strong>',
          hora: '7:00 pm a 12:00 pm',
          detalle: 'No Incluido',
          enlace: '#',
        }
      }
    },
    {
      fecha: '2025-07-27',
      hora: '10:30',
      nombre: 'Senderismo',
      descripciones: {
        descripcion1: {
          titulo: '<strong>Senderismo</strong>',
          hora: '10:30 am a 12:30 pm',
          detalle: 'Esta experiencia te invita a explorar algunos de los rincones naturales más cautivadores de la región. Desde senderos que conducen a quebradas escondidas, hasta caminos que ascienden cerros con vistas panorámicas, podrás elegir entre varias rutas según tu nivel de energía y tu conexión con el entorno.',
          enlace: '#',
        },
        descripcion2: {
          titulo: '<strong>Check out</strong>',
          hora: '1:00 pm',
          detalle: '',
          enlace: '#',
        },
        descripcion3: {
          titulo: '<strong>Almuerzo Forestia</strong>',
          hora: '1:30 pm',
          detalle: 'No Incluido',
          enlace: '#',
        }
      }
    },
  ];

  useEffect(() => {
    // Encontrar el evento más temprano
    const primerEvento = eventosDummy.reduce((primer, actual) => {
      const fechaPrimer = new Date(primer.fecha);
      const fechaActual = new Date(actual.fecha);
      return fechaActual < fechaPrimer ? actual : primer;
    });

    // Establecer la fecha inicial al mes del primer evento
    const [anio, mes] = primerEvento.fecha.split('-').map(Number);
    const fechaInicial = new Date(anio, mes - 1, 1); // mes - 1 porque los meses en JS son 0-based
    setCurrentDate(fechaInicial);

    // Buscar el primer evento de ese mes
    const primerEventoDelMes = eventosDummy.find(e => {
      const [eAnio, eMes] = e.fecha.split('-').map(Number);
      return eAnio === anio && eMes === mes;
    });
    if (primerEventoDelMes) {
      const [eAnio, eMes, eDia] = primerEventoDelMes.fecha.split('-').map(Number);
      const fechaEvento = new Date(eAnio, eMes - 1, eDia);
      setSelectedDate(fechaEvento);
      setEventoSeleccionado(primerEventoDelMes);
    } else {
      setSelectedDate(fechaInicial);
      setEventoSeleccionado(primerEvento);
    }
  }, []);

  return (
    <section className={cx('component')}>
      <Container>
        <div className={cx('title')}>
          <h2 className='heading--40 color--primary'>Cronograma de Actividades Selvaggio</h2>
        </div>
        <div className={cx('main-layout')}>
          <div className={cx('calendar-panel')}>
            <div className={cx('calendar')}>
              <div className={cx('header')}>
                <button onClick={handlePrevMonth}>&lt;</button>
                <h3 className='heading--24 color--primary'>{months[currentDate.getMonth()]} {currentDate.getFullYear()}</h3>
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
            {eventoSeleccionado && (
              <div className={cx('evento-detalle')} ref={descripcionRef}>
                <h3>{eventoSeleccionado.nombre}</h3>
                <p><strong>Hora:</strong> {eventoSeleccionado.hora}</p>
                <div className={cx('descripcion')}>
                  {eventoSeleccionado.descripciones && Object.entries(eventoSeleccionado.descripciones).map(([key, descripcion]) => (
                    <div key={key} className={cx('descripcion-item')}>
                      <div dangerouslySetInnerHTML={{ __html: descripcion.titulo }} />
                      {descripcion.hora && <p><strong>Hora:</strong> {descripcion.hora}</p>}
                      {descripcion.detalle && <p>{descripcion.detalle}</p>}
                      {descripcion.enlace && (
                        <a href={descripcion.enlace} className={cx('button button--primary')}>
                          Reservar
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Calendar; 