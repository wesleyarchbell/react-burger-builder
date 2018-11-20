import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import { Switch, Redirect, Route } from 'react-router-dom';

class App extends Component {
    render() {
        return (
            <div>
                <Layout>
                    <Switch>
                        <Route path="/burger-builder" component={BurgerBuilder}/>
                        <Route path="/checkout" component={Checkout}/>
                        <Redirect from="/" to="/burger-builder"/>
                    </Switch>
                </Layout>
            </div>
        );
    }
}

export default App;
