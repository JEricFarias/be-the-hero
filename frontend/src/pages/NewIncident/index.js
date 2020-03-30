import React, { useState } from "react";

import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import api from "../../services/api";

import logoImg from "../../assets/logo.svg";
import "../../global.css";
import "./index.css";

export default function NewIncident() {
  const [state, setState] = useState({});
  const ongId = localStorage.getItem("ongId");

  function handlerChange(e) {
    setState({ ...state, [e.target.name]: e.target.value });
  }

  async function handlerSubmit(e) {
    e.preventDefault();
    await api({
      method: "post",
      url: "/incidents",
      headers: {
        authorization: ongId
      },
      data: {
        title: state.title,
        description: state.description,
        value: state.value
      }
    });

    alert("Cadastro realizado com sucesso.");
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero" />

          <h1>Cadastro</h1>
          <p>
            Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem
            os casos da sua ONG.
          </p>

          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#e02041"></FiArrowLeft>
            Voltar ao perfil
          </Link>
        </section>
        <form onSubmit={handlerSubmit}>
          <input
            type="text"
            placeholder="Título do caso"
            name="title"
            onChange={handlerChange}
            value={state.title}
          />
          <textarea
            placeholder="Descrição"
            name="description"
            onChange={handlerChange}
            value={state.description}
          />

          <input
            placeholder="Valor em reais"
            name="value"
            onChange={handlerChange}
            value={state.value}
          />

          <button className="button" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
