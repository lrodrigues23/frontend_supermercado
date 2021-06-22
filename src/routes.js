import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
 
import MainSupermercado from './pages/Supermercado/main';
import DetalhesProduto from './pages/Supermercado/detalhes'
import CriarProduto from './pages/Supermercado/criar'
import EditarProduto from './pages/Supermercado/editar'
import DeletarProduto from './pages/Supermercado/deletar'
 
const Routes = () => (
 
    <BrowserRouter>
        <Switch>
            <Route exact path="/supermercado" component={MainSupermercado} />
            <Route path="/supermercado/:id" component={DetalhesProduto}/>
            <Route path="/criarProduto" component={CriarProduto}/>
            <Route path="/editarProduto/:id" component={EditarProduto}/>
            <Route path="/deletarProduto/:id" component={DeletarProduto}/>
        </Switch>
    </BrowserRouter>
)
 
export default Routes;