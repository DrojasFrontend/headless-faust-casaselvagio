import React, { useState, useRef, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./MultiStepForm.module.scss";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

let cx = classNames.bind(styles);

// Pasos del formulario
const STEPS = {
  CONTACT_INFO: 0,
  QUESTIONS: 1,
  SUCCESS: 2
};

const MultiStepForm = ({ title, subtitle }) => {
  const [currentStep, setCurrentStep] = useState(STEPS.CONTACT_INFO);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const phoneInputRef = useRef(null);
  const [formData, setFormData] = useState({
    nombre: "",
    apellidos: "",
    email: "",
    instagram: "",
    celular: "",
    comoNosConociste: "",
    accountType: "",
    experienciaViaje: "",
    valorCalidad: "",
    ritualPersonal: "",
    importanciaCompartir: "",
    filosofiaViaje: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handlePhoneChange = (value) => {
    setFormData({
      ...formData,
      celular: value
    });
  };

  // Efecto para cerrar el dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (phoneInputRef.current && !phoneInputRef.current.contains(event.target)) {
        // Buscar el elemento dropdown y cerrarlo si está abierto
        const dropdown = document.querySelector('.react-tel-input .flag-dropdown.open');
        if (dropdown) {
          const flagButton = dropdown.querySelector('.selected-flag');
          if (flagButton) {
            flagButton.click();
          }
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const nextStep = () => {
    if (currentStep < STEPS.SUCCESS) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > STEPS.CONTACT_INFO) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        nextStep();
      } else {
        const error = await response.json();
        alert(`Error: ${error.error || "Ha ocurrido un error al enviar el formulario"}`);
      }
    } catch (error) {
      alert("Ha ocurrido un error al enviar el formulario");
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepIndicator = () => {
    return (
      <div className={cx("indicator")}>
        <div className={cx("progress-bar")}>
          <div 
            className={cx("progress")} 
            style={{ 
              width: 
                currentStep === STEPS.CONTACT_INFO ? "33%" : 
                currentStep === STEPS.QUESTIONS ? "66%" : 
                "100%" 
            }}
          ></div>
        </div>
        <div className={cx("steps-text")}>
          <span className={cx("step-label", { active: currentStep >= STEPS.CONTACT_INFO })}>Información</span>
          <span className={cx("step-label", { active: currentStep >= STEPS.QUESTIONS })}>Preguntas</span>
          <span className={cx("step-label", { active: currentStep >= STEPS.SUCCESS })}>Completado</span>
        </div>
      </div>
    );
  };

  const renderContactInfoStep = () => {
    return (
      <div className={cx("stepForm")}>
        <div className={cx("formGroup")}>
          <div className={cx("formField")}>
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Respuesta"
              required
            />
          </div>
          <div className={cx("formField")}>
            <label htmlFor="apellidos">Apellidos</label>
            <input
              type="text"
              id="apellidos"
              name="apellidos"
              value={formData.apellidos}
              onChange={handleChange}
              placeholder="Respuesta"
              required
            />
          </div>
        </div>

        <div className={cx("formGroup")}>
          <div className={cx("formField")}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Respuesta"
              required
            />
          </div>
          <div className={cx("formField")}>
            <label htmlFor="instagram">Usuario de Instagram</label>
            <input
              type="text"
              id="instagram"
              name="instagram"
              value={formData.instagram}
              onChange={handleChange}
              placeholder="Respuesta"
            />
          </div>
        </div>

        <div className={cx("formGroup")}>
          <div className={cx("formField")}>
            <label htmlFor="celular">Número Celular</label>
            <div className={cx("phone-input-container")} ref={phoneInputRef}>
              <PhoneInput
                country={'co'}
                value={formData.celular}
                onChange={handlePhoneChange}
                placeholder="Número de teléfono"
                inputProps={{
                  name: 'celular',
                  id: 'celular',
                  required: true,
                }}
                containerClass={cx("phone-input")}
                inputClass={cx("phone-input-field")}
                buttonClass={cx("phone-input-button")}
                dropdownClass={cx("phone-input-dropdown")}
                searchClass={cx("phone-input-search")}
                enableSearch={true}
                disableSearchIcon={false}
                searchPlaceholder="Buscar país..."
                preferredCountries={['co', 'es', 'us', 'mx']}
                enableAreaCodes={true}
                autoFormat={true}
                countryCodeEditable={false}
              />
            </div>
          </div>
          <div className={cx("formField")}>
            <label htmlFor="comoNosConociste">¿Como nos conociste?</label>
            <select
              id="comoNosConociste"
              name="comoNosConociste"
              value={formData.comoNosConociste}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Respuesta</option>
              <option value="instagram">Instagram</option>
              <option value="facebook">Facebook</option>
              <option value="referido">Referido</option>
              <option value="google">Búsqueda en Google</option>
              <option value="otro">Otro</option>
            </select>
          </div>
        </div>

        <div className={cx("formGroup")}>
          <div className={cx("formField")}>
            <label htmlFor="accountType">Account Type</label>
            <select
              id="accountType"
              name="accountType"
              value={formData.accountType}
              onChange={handleChange}
              required
            >
              <option value="" disabled>Respuesta</option>
              <option value="personal">Personal</option>
              <option value="business">Business</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div className={cx("controls")}>
          <button type="button" className={cx("button", "secondary")} onClick={() => window.history.back()}>
            Cancelar
          </button>
          <button 
            type="button" 
            className={cx("button", "primary")} 
            onClick={nextStep}
            disabled={!formData.nombre || !formData.email || !formData.celular}
          >
            Siguiente
          </button>
        </div>
      </div>
    );
  };

  const renderQuestionsStep = () => {
    return (
      <div className={cx("stepForm")}>
        <div className={cx("question")}>
          <h3>¿Cuál fue la última experiencia de viaje verdaderamente transformadora que viviste en los últimos 12 meses?</h3>
          <textarea
            name="experienciaViaje"
            value={formData.experienciaViaje}
            onChange={handleChange}
            placeholder="Respuesta"
          ></textarea>
        </div>

        <div className={cx("question")}>
          <h3>El valor de nuestras experiencias refleja su excepcionalidad. ¿Valoras la calidad por encima del precio en tus viajes?</h3>
          <textarea
            name="valorCalidad"
            value={formData.valorCalidad}
            onChange={handleChange}
            placeholder="Respuesta"
          ></textarea>
        </div>

        <div className={cx("formGroup")}>
          <div className={cx("question")}>
            <h3>¿Qué importancia tiene para ti compartir experiencias extraordinarias con personas que comparten tu visión de vida?</h3>
            <textarea
              name="importanciaCompartir"
              value={formData.importanciaCompartir}
              onChange={handleChange}
              placeholder="Your Last Name"
            ></textarea>
          </div>
          <div className={cx("question")}>
            <h3>¿Qué ritual personal nunca falta en tus viajes?</h3>
            <p>Pregunta adicional</p>
            <textarea
              name="ritualPersonal"
              value={formData.ritualPersonal}
              onChange={handleChange}
              placeholder="Your Last Name"
            ></textarea>
          </div>
        </div>

        <div className={cx("question")}>
          <h3>Si pudieras definir tu filosofía de viaje en tres palabras, ¿cuáles serían?</h3>
          <textarea
            name="filosofiaViaje"
            value={formData.filosofiaViaje}
            onChange={handleChange}
            placeholder="Your Email Address"
          ></textarea>
        </div>

        <div className={cx("controls")}>
          <button type="button" className={cx("button", "secondary")} onClick={prevStep}>
            Cancelar
          </button>
          <button 
            type="button" 
            className={cx("button", "primary")}
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Enviando..." : "Enviar"}
          </button>
        </div>
      </div>
    );
  };

  const renderSuccessStep = () => {
    return (
      <div className={cx("stepForm", "success")}>
        <div className={cx("icon")}>✓</div>
        <h2>¡Gracias por completar el formulario!</h2>
        <p>Hemos recibido tu información y nos pondremos en contacto contigo pronto.</p>
        <button 
          type="button" 
          className={cx("button", "primary")}
          onClick={() => window.location.href = "/"}
        >
          Volver al inicio
        </button>
      </div>
    );
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case STEPS.CONTACT_INFO:
        return renderContactInfoStep();
      case STEPS.QUESTIONS:
        return renderQuestionsStep();
      case STEPS.SUCCESS:
        return renderSuccessStep();
      default:
        return renderContactInfoStep();
    }
  };

  return (
    <section className={cx("component")}>
      <div className={cx("title")}>
        <h1>{title || "Lorem Ipsum"}</h1>
        <p>{subtitle || "Lorem Ipsum Dolor"}</p>
      </div>
      {renderStepIndicator()}
      {renderCurrentStep()}
    </section>
  );
};

export default MultiStepForm; 