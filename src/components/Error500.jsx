import React from "react";

function Error500() {
    return (
        <div style={{
            backgroundImage: `url(https://res.cloudinary.com/dtobkctj9/image/upload/v1744248706/500_hfciym.jpg)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            height: "100vh",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            textAlign: "center",
            fontSize: "36px",
            fontWeight: "bold",
            padding: "20px"
        }}>
            <h1>Algo salió mal.</h1>
            <h2>Error 500 - Error Interno del Servidor</h2>
        </div>
    );
}

export default Error500;