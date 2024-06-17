import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
const Intro = () => {
    const navigate = useNavigate();

    return (
        <section style={{ backgroundColor: "#f9fafb" }}>
            <div style={{ margin: "0 auto", maxWidth: "1280px", padding: "8rem 1rem", display: "flex", height: "100vh" }}>
                <div style={{ margin: "0 auto", maxWidth: "36rem", textAlign: "center" }}>
                    <h1 style={{ fontSize: "1.875rem", fontWeight: 800, lineHeight: "2.25rem" }}>
                        Create a form
                        <strong style={{ fontWeight: "800", color: "#C738BD", display: "block", fontSize: "3rem", lineHeight: "1" }}>
                            In seconds not hours.
                        </strong>
                    </h1>

                    <p style={{ marginTop: "1rem", fontSize: "1.25rem", lineHeight: "1.75rem", color: "#B4B4B8" }}>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt illo tenetur fuga ducimus numquam ea!
                    </p>

                    <div style={{
                        marginTop: "2rem", display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "1rem"
                    }}>
                        <a
                            style={{ display: "block", width: "100%", borderRadius: "0.375rem", backgroundColor: "#C738BD", padding: "0.75rem 3rem", fontSize: "0.875rem", fontWeight: "500", color: "#fff", boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)", textAlign: "center", transition: "background-color 0.2s", outline: "none", cursor: "pointer" }}
                            onClick={() => { navigate("/signup") }}
                        >
                            + Create AI Form
                        </a>
                        <a
                            style={{ display: "block", width: "100%", borderRadius: "0.375rem", padding: "0.75rem 3rem", fontSize: "0.875rem", fontWeight: "500", color: "#C738BD", boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)", textAlign: "center", transition: "color 0.2s", outline: "none", cursor: "pointer" }}
                            href="#"
                        >
                            Learn More
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Intro
