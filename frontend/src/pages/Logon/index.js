import React from "react";
import { Link, useHistory } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";
import "./index.css";

import api from "../../services/api";

import logoImg from "../../assets/logo.svg";
import herosImg from "../../assets/heroes.png";

export default function Logon() {
  const history = useHistory();

  const handlerSubmit = async e => {
    e.preventDefault();
    const id = e.target.querySelector("input").value;
    try {
      const response = await api.post("session", { id });

      localStorage.setItem("ongName", response.data.name);
      localStorage.setItem("ongId", response.data.id);

      history.push("/profile");
    } catch (error) {
      alert("Falha no login tente novamente.");
    }
  };

  return (
    <div className="logon-container">
      <section className="form">
        <img src={logoImg} alt="Be the Hero" />

        <form onSubmit={handlerSubmit}>
          <h1>Faça seu logon</h1>

          <input type="text" placeholder="Sua ID" />
          <button className="button" type="submit">
            Entrar
          </button>

          <Link to="/register" className="back-link">
            <FiLogIn size={18} color="#e02041"></FiLogIn>
            Não tenho cadastro
          </Link>
        </form>
      </section>

      <img src={herosImg} alt="Heroes" />
    </div>
  );
}
