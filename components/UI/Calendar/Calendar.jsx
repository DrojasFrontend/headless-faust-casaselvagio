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
    {
      fecha: '2025-06-06',
      nombre: 'Saxofón Sunset',
      descripciones: {
        descripcion1: {
          titulo: '<strong>Saxofón Sunset (La Casa Invita)</strong>',
          hora: '5:30 pm a 6:30 pm',
          detalle: 'Atardecer en la terraza con saxofón en vivo: música suave para despedir el día y dar la bienvenida a la noche.',
          enlace: 'https://wa.link/mdgtby',
        },
        descripcion2: {
          titulo: '<strong>Cena en Forestia (No incluido)</strong>',
          hora: '7:30 pm',
          detalle: 'No incluido',
          enlace: 'https://wa.link/vsw857',
        }
      }
    },
    {
      fecha: '2025-06-20',
      nombre: 'Saxofón Sunset',
      descripciones: {
        descripcion1: {
          titulo: '<strong>Saxofón Sunset (La Casa Invita)</strong>',
          hora: '5:30 pm a 6:30 pm',
          detalle: 'Atardecer en la terraza con saxofón en vivo: música suave para despedir el día y dar la bienvenida a la noche.',
          enlace: 'https://wa.link/mdgtby',
        },
        descripcion2: {
          titulo: '<strong>Cena en Forestia (No incluido)</strong>',
          hora: '7:30 pm',
          detalle: 'No incluido',
          enlace: 'https://wa.link/vsw857',
        }
      }
    },
    {
      fecha: '2025-07-04',
      nombre: 'Saxofón Sunset',
      descripciones: {
        descripcion1: {
          titulo: '<strong>Saxofón Sunset (La Casa Invita)</strong>',
          hora: '5:30 pm a 6:30 pm',
          detalle: 'Atardecer en la terraza con saxofón en vivo: música suave para despedir el día y dar la bienvenida a la noche.',
          enlace: 'https://wa.link/mdgtby',
        },
        descripcion2: {
          titulo: '<strong>Cena en Forestia (No incluido)</strong>',
          hora: '7:30 pm',
          detalle: 'No incluido',
          enlace: 'https://wa.link/vsw857',
        }
      }
    },
    {
      fecha: '2025-07-18',
      nombre: 'Saxofón Sunset',
      descripciones: {
        descripcion1: {
          titulo: '<strong>Saxofón Sunset (La Casa Invita)</strong>',
          hora: '5:30 pm a 6:30 pm',
          detalle: 'Atardecer en la terraza con saxofón en vivo: música suave para despedir el día y dar la bienvenida a la noche.',
          enlace: 'https://wa.link/mdgtby',
        },
        descripcion2: {
          titulo: '<strong>Cena en Forestia (No incluido)</strong>',
          hora: '7:30 pm',
          detalle: 'No incluido',
          enlace: 'https://wa.link/vsw857',
        }
      }
    },
    {
      fecha: '2025-06-07',
      nombre: 'Desayuno Forestia',
      descripciones: {
        descripcion1: {
          titulo: '<strong>Desayuno Forestia (La Casa Invita)</strong>',
          hora: '9:00 am a 10:00 am',
          detalle: '',
          enlace: 'https://wa.link/pnckqh',
        },
        descripcion2: {
          titulo: '<strong>Senderismo (La Casa Invita)</strong>',
          hora: '10:30 am a 12:30 pm',
          detalle: 'Esta experiencia te invita a explorar los rincones naturales más cautivadores de la región. Desde senderos que conducen a quebradas escondidas, hasta caminos que ascienden cerros con vistas panorámicas.',
          enlace: 'https://wa.link/4l0dfd',
        },
        descripcion3: {
          titulo: '<strong>Almuerzo Forestia (No incluido)</strong>',
          hora: '1:30 pm a 2:30 pm',
          detalle: '',
          enlace: 'https://wa.link/7kz1lk',
        },
        descripcion4: {
          titulo: '<strong>Cabalgata por Senderos Andinos (No incluido)</strong>',
          hora: '3:30 pm a 6:00 pm',
          detalle: 'Sí te gusta la naturaleza y los planes diferentes, este recorrido a caballo es para ti. Durante dos horas y media, recorrerán antiguos Caminos Reales y senderos rurales, cruzando bosques de robles, quebradas y paisajes.',
          enlace: 'https://wa.link/u9dm8q',
        },
        descripcion5: {
          titulo: '<strong>Cena en Forestia (No incluido)</strong>',
          hora: '7:30 pm',
          detalle: '',
          enlace: 'https://wa.link/oqf14b',
        }
      }
    },
    {
      fecha: '2025-06-21',
      nombre: 'Desayuno Forestia',
      descripciones: {
        descripcion1: {
          titulo: '<strong>Desayuno Forestia (La Casa Invita)</strong>',
          hora: '9:00 am a 10:00 am',
          detalle: '',
          enlace: 'https://wa.link/pnckqh',
        },
        descripcion2: {
          titulo: '<strong>Senderismo (La Casa Invita)</strong>',
          hora: '10:30 am a 12:30 pm',
          detalle: 'Esta experiencia te invita a explorar los rincones naturales más cautivadores de la región. Desde senderos que conducen a quebradas escondidas, hasta caminos que ascienden cerros con vistas panorámicas.',
          enlace: 'https://wa.link/4l0dfd',
        },
        descripcion3: {
          titulo: '<strong>Almuerzo Forestia (No incluido)</strong>',
          hora: '1:30 pm a 2:30 pm',
          detalle: '',
          enlace: 'https://wa.link/7kz1lk',
        },
        descripcion4: {
          titulo: '<strong>Cabalgata por Senderos Andinos (No incluido)</strong>',
          hora: '3:30 pm a 6:00 pm',
          detalle: 'Sí te gusta la naturaleza y los planes diferentes, este recorrido a caballo es para ti. Durante dos horas y media, recorrerán antiguos Caminos Reales y senderos rurales, cruzando bosques de robles, quebradas y paisajes.',
          enlace: 'https://wa.link/u9dm8q',
        },
        descripcion5: {
          titulo: '<strong>Cena en Forestia (No incluido)</strong>',
          hora: '7:30 pm',
          detalle: '',
          enlace: 'https://wa.link/oqf14b',
        }
      }
    },
    {
      fecha: '2025-07-05',
      nombre: 'Desayuno Forestia',
      descripciones: {
        descripcion1: {
          titulo: '<strong>Desayuno Forestia (La Casa Invita)</strong>',
          hora: '9:00 am a 10:00 am',
          detalle: '',
          enlace: 'https://wa.link/pnckqh',
        },
        descripcion2: {
          titulo: '<strong>Senderismo (La Casa Invita)</strong>',
          hora: '10:30 am a 12:30 pm',
          detalle: 'Esta experiencia te invita a explorar los rincones naturales más cautivadores de la región. Desde senderos que conducen a quebradas escondidas, hasta caminos que ascienden cerros con vistas panorámicas.',
          enlace: 'https://wa.link/4l0dfd',
        },
        descripcion3: {
          titulo: '<strong>Almuerzo Forestia (No incluido)</strong>',
          hora: '1:30 pm a 2:30 pm',
          detalle: '',
          enlace: 'https://wa.link/7kz1lk',
        },
        descripcion4: {
          titulo: '<strong>Cabalgata por Senderos Andinos (No incluido)</strong>',
          hora: '3:30 pm a 6:00 pm',
          detalle: 'Sí te gusta la naturaleza y los planes diferentes, este recorrido a caballo es para ti. Durante dos horas y media, recorrerán antiguos Caminos Reales y senderos rurales, cruzando bosques de robles, quebradas y paisajes.',
          enlace: 'https://wa.link/u9dm8q',
        },
        descripcion5: {
          titulo: '<strong>Cena en Forestia (No incluido)</strong>',
          hora: '7:30 pm',
          detalle: '',
          enlace: 'https://wa.link/oqf14b',
        }
      }
    },
    {
      fecha: '2025-07-19',
      nombre: 'Desayuno Forestia',
      descripciones: {
        descripcion1: {
          titulo: '<strong>Desayuno Forestia (La Casa Invita)</strong>',
          hora: '9:00 am a 10:00 am',
          detalle: '',
          enlace: 'https://wa.link/pnckqh',
        },
        descripcion2: {
          titulo: '<strong>Senderismo (La Casa Invita)</strong>',
          hora: '10:30 am a 12:30 pm',
          detalle: 'Esta experiencia te invita a explorar los rincones naturales más cautivadores de la región. Desde senderos que conducen a quebradas escondidas, hasta caminos que ascienden cerros con vistas panorámicas.',
          enlace: 'https://wa.link/4l0dfd',
        },
        descripcion3: {
          titulo: '<strong>Almuerzo Forestia (No incluido)</strong>',
          hora: '1:30 pm a 2:30 pm',
          detalle: '',
          enlace: 'https://wa.link/7kz1lk',
        },
        descripcion4: {
          titulo: '<strong>Cabalgata por Senderos Andinos (No incluido)</strong>',
          hora: '3:30 pm a 6:00 pm',
          detalle: 'Sí te gusta la naturaleza y los planes diferentes, este recorrido a caballo es para ti. Durante dos horas y media, recorrerán antiguos Caminos Reales y senderos rurales, cruzando bosques de robles, quebradas y paisajes.',
          enlace: 'https://wa.link/u9dm8q',
        },
        descripcion5: {
          titulo: '<strong>Cena en Forestia (No incluido)</strong>',
          hora: '7:30 pm',
          detalle: '',
          enlace: 'https://wa.link/oqf14b',
        }
      }
    },
    {
      fecha: '2025-06-08',
      nombre: 'Meditación y Yoga',
      descripciones: {
        descripcion1: {
          titulo: '<strong>Meditación y Yoga (La Casa Invita)</strong>',
          hora: '8:00 am a 9:30 am',
          detalle: 'Una experiencia íntima para volver a lo esencial. Respirar juntos, moverse con intención, abrir el corazón y sostenerse mutuamente desde la presencia. Este encuentro propone una pausa consciente para reconectar.',
          enlace: 'https://wa.link/y87hdt',
        },
        descripcion2: {
          titulo: '<strong>Desayuno Forestia (La Casa Invita)</strong>',
          hora: '9:00 am a 10:00 am',
          detalle: '',
          enlace: 'https://wa.link/apvw9v',
        },
        descripcion3: {
          titulo: '<strong>Almuerzo Forestia (No incluido)</strong>',
          hora: '1:30 pm',
          detalle: '',
          enlace: 'https://wa.link/qwlc4j',
        }
      }
    },
    {
      fecha: '2025-06-22',
      nombre: 'Meditación y Yoga',
      descripciones: {
        descripcion1: {
          titulo: '<strong>Meditación y Yoga (La Casa Invita)</strong>',
          hora: '8:00 am a 9:30 am',
          detalle: 'Una experiencia íntima para volver a lo esencial. Respirar juntos, moverse con intención, abrir el corazón y sostenerse mutuamente desde la presencia. Este encuentro propone una pausa consciente para reconectar.',
          enlace: 'https://wa.link/y87hdt',
        },
        descripcion2: {
          titulo: '<strong>Desayuno Forestia (La Casa Invita)</strong>',
          hora: '9:00 am a 10:00 am',
          detalle: '',
          enlace: 'https://wa.link/apvw9v',
        },
        descripcion3: {
          titulo: '<strong>Almuerzo Forestia (No incluido)</strong>',
          hora: '1:30 pm',
          detalle: '',
          enlace: 'https://wa.link/qwlc4j',
        }
      }
    },
    {
      fecha: '2025-07-06',
      nombre: 'Meditación y Yoga',
      descripciones: {
        descripcion1: {
          titulo: '<strong>Meditación y Yoga (La Casa Invita)</strong>',
          hora: '8:00 am a 9:30 am',
          detalle: 'Una experiencia íntima para volver a lo esencial. Respirar juntos, moverse con intención, abrir el corazón y sostenerse mutuamente desde la presencia. Este encuentro propone una pausa consciente para reconectar.',
          enlace: 'https://wa.link/y87hdt',
        },
        descripcion2: {
          titulo: '<strong>Desayuno Forestia (La Casa Invita)</strong>',
          hora: '9:00 am a 10:00 am',
          detalle: '',
          enlace: 'https://wa.link/apvw9v',
        },
        descripcion3: {
          titulo: '<strong>Almuerzo Forestia (No incluido)</strong>',
          hora: '1:30 pm',
          detalle: '',
          enlace: 'https://wa.link/qwlc4j',
        }
      }
    },
    {
      fecha: '2025-07-20',
      nombre: 'Meditación y Yoga',
      descripciones: {
        descripcion1: {
          titulo: '<strong>Meditación y Yoga (La Casa Invita)</strong>',
          hora: '8:00 am a 9:30 am',
          detalle: 'Una experiencia íntima para volver a lo esencial. Respirar juntos, moverse con intención, abrir el corazón y sostenerse mutuamente desde la presencia. Este encuentro propone una pausa consciente para reconectar.',
          enlace: 'https://wa.link/y87hdt',
        },
        descripcion2: {
          titulo: '<strong>Desayuno Forestia (La Casa Invita)</strong>',
          hora: '9:00 am a 10:00 am',
          detalle: '',
          enlace: 'https://wa.link/apvw9v',
        },
        descripcion3: {
          titulo: '<strong>Almuerzo Forestia (No incluido)</strong>',
          hora: '1:30 pm',
          detalle: '',
          enlace: 'https://wa.link/qwlc4j',
        }
      }
    },
    {
      fecha: '2025-06-13',
      nombre: 'Bossa Nova Sunset',
      descripciones: {
        descripcion1: {
          titulo: '<strong>Bossa Nova Sunset (La Casa Invita)</strong>',
          hora: '5:30 pm a 6:30 pm',
          detalle: 'Bossa Nova en vivo en la terraza: ritmos ligeros para cerrar el día y abrir la noche.',
          enlace: 'https://wa.link/kpbbky',
        },
        descripcion2: {
          titulo: '<strong>Cena en Forestia (No incluido)</strong>',
          hora: '7:00 pm',
          detalle: '',
          enlace: 'https://wa.link/120i9p',
        }
      }
    },
    {
      fecha: '2025-06-27',
      nombre: 'Bossa Nova Sunset',
      descripciones: {
        descripcion1: {
          titulo: '<strong>Bossa Nova Sunset (La Casa Invita)</strong>',
          hora: '5:30 pm a 6:30 pm',
          detalle: 'Bossa Nova en vivo en la terraza: ritmos ligeros para cerrar el día y abrir la noche.',
          enlace: 'https://wa.link/kpbbky',
        },
        descripcion2: {
          titulo: '<strong>Cena en Forestia (No incluido)</strong>',
          hora: '7:00 pm',
          detalle: '',
          enlace: 'https://wa.link/120i9p',
        }
      }
    },
    {
      fecha: '2025-07-11',
      nombre: 'Bossa Nova Sunset',
      descripciones: {
        descripcion1: {
          titulo: '<strong>Bossa Nova Sunset (La Casa Invita)</strong>',
          hora: '5:30 pm a 6:30 pm',
          detalle: 'Bossa Nova en vivo en la terraza: ritmos ligeros para cerrar el día y abrir la noche.',
          enlace: 'https://wa.link/kpbbky',
        },
        descripcion2: {
          titulo: '<strong>Cena en Forestia (No incluido)</strong>',
          hora: '7:00 pm',
          detalle: '',
          enlace: 'https://wa.link/120i9p',
        }
      }
    },
    {
      fecha: '2025-07-25',
      nombre: 'Bossa Nova Sunset',
      descripciones: {
        descripcion1: {
          titulo: '<strong>Bossa Nova Sunset (La Casa Invita)</strong>',
          hora: '5:30 pm a 6:30 pm',
          detalle: 'Bossa Nova en vivo en la terraza: ritmos ligeros para cerrar el día y abrir la noche.',
          enlace: 'https://wa.link/kpbbky',
        },
        descripcion2: {
          titulo: '<strong>Cena en Forestia (No incluido)</strong>',
          hora: '7:00 pm',
          detalle: '',
          enlace: 'https://wa.link/120i9p',
        }
      }
    },
    {
      fecha: '2025-06-14',
      nombre: 'Clase de Yoga',
      descripciones: {
        descripcion1: {
          titulo: '<strong>Clase de Yoga (La Casa Invita)</strong>',
          hora: '8:30 am a 9:30 am',
          detalle: 'Una experiencia íntima para volver a lo esencial. Respirar juntos, moverse con intención, abrir el corazón y sostenerse mutuamente desde la presencia. Este encuentro sugiere una pausa consciente para reconectar.',
          enlace: 'https://wa.link/616kwy',
        },
        descripcion2: {
          titulo: '<strong>Desayuno Forestia (La Casa Invita)</strong>',
          hora: '9:30 am a 10:30 am',
          detalle: '',
          enlace: 'https://wa.link/44al01',
        },
        descripcion3: {
          titulo: '<strong>Alma Samurái (La Casa Invita)</strong>',
          hora: '10:45 am a 11:45 am',
          detalle: 'En esta experiencia vivirás las prácticas de los guerreros Samurái, a través de las artes marciales, el manejo de la katana (espada japonesa), la meditación Bushidō, la caligrafía y la poesía haiku. Aprenderás su filosofía de vida y cómo aplicarla para lograr tus metas y superar tus límites.',
          enlace: 'https://wa.link/szqz0f',
        },
        descripcion4: {
          titulo: '<strong>Tour de Artesanos (No incluido)</strong>',
          hora: '2:30 pm a 6:00 pm',
          detalle: 'Descubre las tradiciones artesanales y gastronómicas de Tinjacá y San Miguel de Sema en este recorrido por veredas. Conocerás de cerca dos oficios tradicionales que han dado identidad a la región: la cestería en esparto y la producción artesanal de quesos.',
          enlace: 'https://wa.link/1zgy4g',
        },
        descripcion5: {
          titulo: '<strong>Cena en Forestia (No incluido)</strong>',
          hora: '7:00 pm a 12:00 pm',
          detalle: '',
          enlace: 'https://wa.link/zuks6j',
        }
      }
    },
    {
      fecha: '2025-06-28',
      nombre: 'Clase de Yoga',
      descripciones: {
        descripcion1: {
          titulo: '<strong>Clase de Yoga (La Casa Invita)</strong>',
          hora: '8:30 am a 9:30 am',
          detalle: 'Una experiencia íntima para volver a lo esencial. Respirar juntos, moverse con intención, abrir el corazón y sostenerse mutuamente desde la presencia. Este encuentro sugiere una pausa consciente para reconectar.',
          enlace: 'https://wa.link/616kwy',
        },
        descripcion2: {
          titulo: '<strong>Desayuno Forestia (La Casa Invita)</strong>',
          hora: '9:30 am a 10:30 am',
          detalle: '',
          enlace: 'https://wa.link/44al01',
        },
        descripcion3: {
          titulo: '<strong>Alma Samurái (La Casa Invita)</strong>',
          hora: '10:45 am a 11:45 am',
          detalle: 'En esta experiencia vivirás las prácticas de los guerreros Samurái, a través de las artes marciales, el manejo de la katana (espada japonesa), la meditación Bushidō, la caligrafía y la poesía haiku. Aprenderás su filosofía de vida y cómo aplicarla para lograr tus metas y superar tus límites.',
          enlace: 'https://wa.link/szqz0f',
        },
        descripcion4: {
          titulo: '<strong>Tour de Artesanos (No incluido)</strong>',
          hora: '2:30 pm a 6:00 pm',
          detalle: 'Descubre las tradiciones artesanales y gastronómicas de Tinjacá y San Miguel de Sema en este recorrido por veredas. Conocerás de cerca dos oficios tradicionales que han dado identidad a la región: la cestería en esparto y la producción artesanal de quesos.',
          enlace: 'https://wa.link/1zgy4g',
        },
        descripcion5: {
          titulo: '<strong>Cena en Forestia (No incluido)</strong>',
          hora: '7:00 pm a 12:00 pm',
          detalle: '',
          enlace: 'https://wa.link/zuks6j',
        }
      }
    },
    {
      fecha: '2025-07-12',
      nombre: 'Clase de Yoga',
      descripciones: {
        descripcion1: {
          titulo: '<strong>Clase de Yoga (La Casa Invita)</strong>',
          hora: '8:30 am a 9:30 am',
          detalle: 'Una experiencia íntima para volver a lo esencial. Respirar juntos, moverse con intención, abrir el corazón y sostenerse mutuamente desde la presencia. Este encuentro sugiere una pausa consciente para reconectar.',
          enlace: 'https://wa.link/616kwy',
        },
        descripcion2: {
          titulo: '<strong>Desayuno Forestia (La Casa Invita)</strong>',
          hora: '9:30 am a 10:30 am',
          detalle: '',
          enlace: 'https://wa.link/44al01',
        },
        descripcion3: {
          titulo: '<strong>Alma Samurái (La Casa Invita)</strong>',
          hora: '10:45 am a 11:45 am',
          detalle: 'En esta experiencia vivirás las prácticas de los guerreros Samurái, a través de las artes marciales, el manejo de la katana (espada japonesa), la meditación Bushidō, la caligrafía y la poesía haiku. Aprenderás su filosofía de vida y cómo aplicarla para lograr tus metas y superar tus límites.',
          enlace: 'https://wa.link/szqz0f',
        },
        descripcion4: {
          titulo: '<strong>Tour de Artesanos (No incluido)</strong>',
          hora: '2:30 pm a 6:00 pm',
          detalle: 'Descubre las tradiciones artesanales y gastronómicas de Tinjacá y San Miguel de Sema en este recorrido por veredas. Conocerás de cerca dos oficios tradicionales que han dado identidad a la región: la cestería en esparto y la producción artesanal de quesos.',
          enlace: 'https://wa.link/1zgy4g',
        },
        descripcion5: {
          titulo: '<strong>Cena en Forestia (No incluido)</strong>',
          hora: '7:00 pm a 12:00 pm',
          detalle: '',
          enlace: 'https://wa.link/zuks6j',
        }
      }
    },
    {
      fecha: '2025-07-26',
      nombre: 'Clase de Yoga',
      descripciones: {
        descripcion1: {
          titulo: '<strong>Clase de Yoga (La Casa Invita)</strong>',
          hora: '8:30 am a 9:30 am',
          detalle: 'Una experiencia íntima para volver a lo esencial. Respirar juntos, moverse con intención, abrir el corazón y sostenerse mutuamente desde la presencia. Este encuentro sugiere una pausa consciente para reconectar.',
          enlace: 'https://wa.link/616kwy',
        },
        descripcion2: {
          titulo: '<strong>Desayuno Forestia (La Casa Invita)</strong>',
          hora: '9:30 am a 10:30 am',
          detalle: '',
          enlace: 'https://wa.link/44al01',
        },
        descripcion3: {
          titulo: '<strong>Alma Samurái (La Casa Invita)</strong>',
          hora: '10:45 am a 11:45 am',
          detalle: 'En esta experiencia vivirás las prácticas de los guerreros Samurái, a través de las artes marciales, el manejo de la katana (espada japonesa), la meditación Bushidō, la caligrafía y la poesía haiku. Aprenderás su filosofía de vida y cómo aplicarla para lograr tus metas y superar tus límites.',
          enlace: 'https://wa.link/szqz0f',
        },
        descripcion4: {
          titulo: '<strong>Tour de Artesanos (No incluido)</strong>',
          hora: '2:30 pm a 6:00 pm',
          detalle: 'Descubre las tradiciones artesanales y gastronómicas de Tinjacá y San Miguel de Sema en este recorrido por veredas. Conocerás de cerca dos oficios tradicionales que han dado identidad a la región: la cestería en esparto y la producción artesanal de quesos.',
          enlace: 'https://wa.link/1zgy4g',
        },
        descripcion5: {
          titulo: '<strong>Cena en Forestia (No incluido)</strong>',
          hora: '7:00 pm a 12:00 pm',
          detalle: '',
          enlace: 'https://wa.link/zuks6j',
        }
      }
    },
    {
      fecha: '2025-06-15',
      nombre: 'Senderismo',
      descripciones: {
        descripcion1: {
          titulo: '<strong>Senderismo (La Casa Invita)</strong>',
          hora: '10:30 am a 12:30 pm',
          detalle: 'Esta experiencia te invita a explorar algunos de los rincones naturales más cautivadores de la región. Desde senderos que conducen a quebradas escondidas, hasta caminos que ascienden cerros con vistas panorámicas.',
          enlace: 'https://wa.link/u9bji3',
        },
        descripcion2: {
          titulo: '<strong>Almuerzo Forestia (No incluido)</strong>',
          hora: '1:30 pm',
          detalle: '',
          enlace: 'https://wa.link/5w2qbt',
        }
      }
    },
    {
      fecha: '2025-06-29',
      nombre: 'Senderismo',
      descripciones: {
        descripcion1: {
          titulo: '<strong>Senderismo (La Casa Invita)</strong>',
          hora: '10:30 am a 12:30 pm',
          detalle: 'Esta experiencia te invita a explorar algunos de los rincones naturales más cautivadores de la región. Desde senderos que conducen a quebradas escondidas, hasta caminos que ascienden cerros con vistas panorámicas.',
          enlace: 'https://wa.link/u9bji3',
        },
        descripcion2: {
          titulo: '<strong>Almuerzo Forestia (No incluido)</strong>',
          hora: '1:30 pm',
          detalle: '',
          enlace: 'https://wa.link/5w2qbt',
        }
      }
    },
    {
      fecha: '2025-07-13',
      nombre: 'Senderismo',
      descripciones: {
        descripcion1: {
          titulo: '<strong>Senderismo (La Casa Invita)</strong>',
          hora: '10:30 am a 12:30 pm',
          detalle: 'Esta experiencia te invita a explorar algunos de los rincones naturales más cautivadores de la región. Desde senderos que conducen a quebradas escondidas, hasta caminos que ascienden cerros con vistas panorámicas.',
          enlace: 'https://wa.link/u9bji3',
        },
        descripcion2: {
          titulo: '<strong>Almuerzo Forestia (No incluido)</strong>',
          hora: '1:30 pm',
          detalle: '',
          enlace: 'https://wa.link/5w2qbt',
        }
      }
    },
    {
      fecha: '2025-07-27',
      nombre: 'Senderismo',
      descripciones: {
        descripcion1: {
          titulo: '<strong>Senderismo (La Casa Invita)</strong>',
          hora: '10:30 am a 12:30 pm',
          detalle: 'Esta experiencia te invita a explorar algunos de los rincones naturales más cautivadores de la región. Desde senderos que conducen a quebradas escondidas, hasta caminos que ascienden cerros con vistas panorámicas.',
          enlace: 'https://wa.link/u9bji3',
        },
        descripcion2: {
          titulo: '<strong>Almuerzo Forestia (No incluido)</strong>',
          hora: '1:30 pm',
          detalle: '',
          enlace: 'https://wa.link/5w2qbt',
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