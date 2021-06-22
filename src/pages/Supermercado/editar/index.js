import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import './index.css';
import 'react-dotenv'
 
class EditarProduto extends Component {
    constructor(props) {
        super(props);
 
        this.state = {
            produto: {
                nomeProduto: "",
                descricaoProduto: "",
                precoProduto: 0,
                quantidadeEstoque: 0
            }, 
            erro: null,
            redirect: false
        };
    }
 
    exibeErro() {
        const { erro } = this.state;
 
        if (erro) {
            return (
                <div className="alert alert-danger" role="alert">
                    Erro de conexão com o servidor
                </div>
            );
        }
    }
 
    componentDidMount() {
        const { id } = this.props.match.params;
 
        fetch(`https://api-supermercado.herokuapp.com/supermercado/${id}`)
            .then(data => {
                data.json().then(data => {
                    if (data.error) {
                        this.setState({ erro: data.error });
                    } else {
                        this.setState({ produto: data });
                    }
                });
            })
            .catch(erro => this.setState({ erro: erro }));
    }
 
    render() {
        const { redirect } = this.state;
 
        if (redirect) {
            return <Redirect to="/supermercado" />;
        } else {
            return (
                <form onSubmit={this.handleSubmit}>
                    <fieldset>
                        <legend>Editar Produto</legend>
                        <div className="usuario-insert">
                            <label htmlFor="nomeProduto">Nome do Produto </label>
                            <br />
                            <input
                                type="text"
                                id="nomeProduto"
                                name="nomeProduto"
                                placeholder="Nome do Produto"
                                minLength="3"
                                maxLength="100"
                                required
                                value={this.state.produto.nomeProduto}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="usuario-insert">
                            <label htmlFor="descricaoProduto">Descrição do Produto </label>
                            <br />
                            <input
                                type="text"
                                id="descricaoProduto"
                                name="descricaoProduto"
                                placeholder="Descrição do Produto"
                                required
                                value={this.state.produto.descricaoProduto}
                                onChange={this.handleInputChange}
                            />
                        </div>
                        <div className="usuario-insert">
                            <label htmlFor="precoProduto">Preço do Produto </label>
                            <br />
                            <input
                                type="text"
                                id="precoProduto"
                                name="precoProduto"
                                placeholder="Preço do Produto"
                                required
                                value={this.state.produto.precoProduto}
                                onChange={this.handleInputChange}
                            />
                        </div>
 
                        <div className="usuario-insert">
                            <label htmlFor="quantidadeEstoque">Quantidade em Estoque </label>
                            <br />
                            <input
                                type="text"
                                id="quantidadeEstoque"
                                name="quantidadeEstoque"
                                placeholder="Preço do Produto"
                                required
                                value={this.state.produto.quantidadeEstoque}
                                onChange={this.handleInputChange}
                            />
                        </div>
 
                        <button type="submit" className="btn btn-primary">
                            Atualizar
                    </button>
                    </fieldset>
                </form>
            );
        }
    }
 
 
 
    handleInputChange = event => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
 
        this.setState(prevState => ({
            produto: { ...prevState.produto, [name]: value }
        }));
    };
 
    handleSubmit = event => {
        const { id } = this.state.produto;
 
        fetch(`${process.env.REACT_APP_API_URL}/${id}`, {
            method: "put",
            body: JSON.stringify(this.state.produto),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(data => {
                if (data.ok) {
                    this.setState({ redirect: true });
                } else {
                    data.json().then(data => {
                        if (data.error) {
                            this.setState({ erro: data.error });
                        }
                    });
                }
            })
            .catch(erro => this.setState({ erro: erro }));
 
        event.preventDefault();
    };
}
 
export default EditarProduto;
