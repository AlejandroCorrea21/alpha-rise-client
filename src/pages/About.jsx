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

        </div>
    );
}

export default About;