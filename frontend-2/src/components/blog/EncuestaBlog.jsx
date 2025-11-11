import React, { useState, useEffect } from 'react';
import './EncuestaBlog.css';

// Constantes de la encuesta
const PREGUNTA = '¿Qué hacés con la ropa que ya no usás?';
const OPCIONES = [
  'La dono',
  'La vendo',
  'La guardo por las dudas',
];
const STORAGE_KEY = 'encuestaBlogVotos';
const STORAGE_VOTED = 'encuestaBlogYaVoto';

// Votos iniciales
const votosIniciales = [38, 90, 62]; // Simulación. "La vendo" es la más votada, total 190

// Componente EncuestaBlog
const EncuestaBlog = (props) => {
  const [votos, setVotos] = useState(() => {
    const guardados = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (guardados && Array.isArray(guardados) && guardados.length === 3) {
      return guardados;
    }
    return votosIniciales;
  });
  const [yaVoto, setYaVoto] = useState(false);
  const [opcionElegida, setOpcionElegida] = useState(null);

  // Cargar votos y si ya votó
  useEffect(() => {
    const votosGuardados = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (votosGuardados && Array.isArray(votosGuardados) && votosGuardados.length === 3) {
      setVotos(votosGuardados);
    }
    const yaVotoGuardado = localStorage.getItem(STORAGE_VOTED);
    if (yaVotoGuardado) {
      setYaVoto(true);
      setOpcionElegida(Number(yaVotoGuardado));
    }
  }, []);

  // Guardar votos en localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(votos));
  }, [votos]);

  const handleVotar = (idx) => {
    if (yaVoto) return;
    const nuevosVotos = [...votos];
    nuevosVotos[idx]++;
    setVotos(nuevosVotos);
    setYaVoto(true);
    setOpcionElegida(idx);
    localStorage.setItem(STORAGE_VOTED, idx);
  };

  const totalVotos = votos.reduce((a, b) => a + b, 0);

  // Calcular el porcentaje de votos para cada opción
  return (
    <div className={`encuesta-blog${props.className ? ' ' + props.className : ''}`}>
      <h4 className="encuesta-pregunta">{PREGUNTA}</h4>
      <div className="encuesta-opciones">
        {OPCIONES.map((op, idx) => {
          const porcentaje = totalVotos ? (votos[idx] / totalVotos) * 100 : 0;
          return (
            <button
              key={op}
              className={`encuesta-opcion${yaVoto && opcionElegida === idx ? ' elegida' : ''}`}
              onClick={() => handleVotar(idx)}
              disabled={yaVoto}
            >
              {yaVoto && (
                <span
                  className="encuesta-bar-interna"
                  style={{ width: `${porcentaje}%` }}
                />
              )}
              <span className="encuesta-opcion-text">{op}</span>
              {yaVoto && (
                <span className="encuesta-porcentaje-btn">
                  {porcentaje.toFixed(1)}%
                </span>
              )}
            </button>
          );
        })}
      </div>
      {yaVoto && (
        <div className="encuesta-total">Votos totales: {totalVotos}</div>
      )}
    </div>
  );
};

export default EncuestaBlog;
