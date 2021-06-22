import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './index.css';
import 'react-dotenv'
 
export default class Produto extends Component {
    state = {
        produto: {},
    };
 
    componentDidMount() {
        const { id } = this.props.match.params;
 
        fetch(`${process.env.REACT_APP_API_URL}/${id}`)
            .then(produto =>
                produto.json().then(produto => this.setState({ produto }))
            )
            .catch(erro => this.setState({ erro }));
    }
 
    render() {

        const { produto, index } = this.state;

        return (
            <div className="produto-info">
                <h1> {produto.nomeProduto} </h1>
                <h1> {produto.descricaoProduto} </h1>
                <h1> {produto.precoProduto} </h1>
                <h1> {produto.quantidadeEstoque} </h1>
                <div className="produto__links">
                <Link to={`/supermercado`}> Voltar </Link> <br />
                <Link to={`/editarProduto/${produto.id}`}> Editar </Link> <br />
                <Link to={`/deletarProduto/${produto.id}`}> Deletar </Link> <br />
                </div>
            </div >
        );
    }
}
