import React from 'react';
import { useNavigate } from 'react-router-dom';

function PageNotFound() {
    const navigate = useNavigate();

    const volverAHome = () => {
        navigate('/');
    };

    return (
        <div style={{ textAlign: 'center', paddingTop: '100px' }}>
            <h1>Error 404 - Página no encontrada</h1>
            <p>Vuelve atrás.</p>

            <button
                style={{
                    position: 'absolute',
                    top: '20px',
                    left: '20px',
                    fontSize: '18px',
                    padding: '10px 20px',
                    backgroundColor: '#f2a90d'
                }}
                onClick={volverAHome}
            >
                Home
            </button>
        </div>
    );
}

export default PageNotFound;