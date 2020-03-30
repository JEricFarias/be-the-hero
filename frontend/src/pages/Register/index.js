import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import api from "../../services/api";

import logoImg from "../../assets/logo.svg";
import "../../global.css";
import "./index.css";

const Register = () => {
  const initState = {
    name: "",
    email: "",
    whatsapp: "",
    city: "",
    UF: ""
  };
  const history = useHistory();
  const [state, setState] = useState(initState);

  function handlerChange(e) {
    setState({ ...state, [e.target.name]: e.target.value });
  }

  async function handlerRegister(e) {
    e.preventDefault();
    console.log(state);

    try {
      const response = await api.post("ongs", state);
      alert(`Seu ID de acesso: ${response.data.id}`);
      history.push("/");
    } catch (error) {
      alert("Error no cadastro tente novamente");
    }
    setState(initState);
  }
  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero" />

          <h1>Cadastrar novo caso</h1>
          <p>
            Descreva o caso detalhadamente para encontrar um herói para resolver
            isso.
          </p>

          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#e02041"></FiArrowLeft>
            Voltar para home
          </Link>
        </section>
        <form onSubmit={handlerRegister}>
          <input
            type="text"
            name="name"
            value={state.name}
            onChange={handlerChange}
            placeholder="Nome da ONG"
          />
          <input
            type="email"
            name="email"
            value={state.email}
            onChange={handlerChange}
            placeholder="E-mail"
          />
          <input
            type="phone"
            name="whatsapp"
            value={state.whatsapp}
            onChange={handlerChange}
            placeholder="Whatsapp"
          />

          <div className="input-group">
            <input
              type="text"
              name="city"
              value={state.city}
              onChange={handlerChange}
              placeholder="Cidade"
            />
            <input
              type="text"
              name="UF"
              value={state.UF}
              onChange={handlerChange}
              placeholder="UF"
              style={{ width: 80 }}
            />
          </div>

          <button className="button" type="submit">
            Registrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
