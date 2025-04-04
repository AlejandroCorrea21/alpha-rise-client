import React from 'react';
import { useNavigate } from 'react-router-dom';

function About() {

    const navigate = useNavigate()

    const volverAtras = () => {
        navigate('/')
    };

    return (
        <div>

            <h1>Sobre mi</h1>
            <p>Soy un desarrollador en formación, aprendiendo Full Stack Development en Ironhack. Actualmente estoy construyendo proyectos como Alpha Rise, donde aplico mis conocimientos en APIs, manejo de estado y CRUD. Me apasiona la tecnología y estoy en constante aprendizaje para mejorar mis habilidades en desarrollo web. :)</p>

            <button style={{ position: 'absolute', top: '20px', left: '20px', fontSize: '18px', padding: '10px 20px', backgroundColor: '#f2a90d' }} onClick={volverAtras} >Atrás </button>

        </div>
    );
}

export default About;