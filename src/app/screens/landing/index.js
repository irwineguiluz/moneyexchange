import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import CurrencyFormat from 'react-currency-format';
import Header from '../../components/header';
import Footer from '../../components/footer';
import appConstants from '../../constants/app';
const token = localStorage.getItem('token');

class Landing extends Component {
  state = {
    dollarsInput: '',
    eurosInput: '',
    errorMessage: null,
  }

  isNotAuthenticated = () => {
    return !token;
  }

  resetInputs = () => {
    this.setState({
      dollarsInput: '',
      eurosInput: '',
    })
  }

  calculateCurrency = () => {
    const config = { headers: { 'Authorization': 'Bearer ' + token }, };

    if (this.state.dollarsInput > 0) {
      axios.get(`${appConstants.API_URL}/calculate`, config)
        .then(res => {
          let response = res.data;
          let rates = JSON.parse(response.ratesFeed.rates);
          let euroRate = rates.rates.EUR;
          let eurosTotal = this.state.dollarsInput * euroRate;

          this.setState({
            eurosInput: eurosTotal,
            errorMessage: null,
          });
        })
        .catch(errors => {
          this.setState({
            errorMessage: 'An error has ocurred with the API',
          });
        });
    } else {
      this.resetInputs();
    }
  }

  handleInput = (e) => {
    this.setState({
      dollarsInput: e.value,
    });
  }

  render () {
    const {
      dollarsInput,
      eurosInput,
      errorMessage,
    } = this.state;

    const isNotAuthenticated = this.isNotAuthenticated();

    return (
      <div>
      { isNotAuthenticated ? <Redirect to={{
        pathname: '/'
      }} /> : (
        <div>
          <Header />
          <section className="currencies-converter__container">
            <div className="currencies-converter__wrapper">
              <div className="currencies-converter">
                <div className="currencies-inputs__wrapper">
                  <h1 className="title">Find out how much the euro is today!</h1>
                  {errorMessage && <h4 className="title">{errorMessage}</h4>}
                  <div className="currencies-inputs">
                    <div className="currency-input__wrapper">
                      <CurrencyFormat
                        className="currency-input"
                        placeholder="USD ($) Ex. $ 000,000.0000"
                        thousandSeparator={true}
                        prefix={'$ '}
                        decimalScale={4}
                        value={dollarsInput}
                        onValueChange={this.handleInput}
                      />
                    </div>
                    <div className="currency-input__wrapper">
                      <CurrencyFormat
                        className="currency-input readonly"
                        placeholder="Euros (€)"
                        thousandSeparator={true}
                        prefix={'€ '}
                        decimalScale={4}
                        value={eurosInput}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="currencies-converter__button">
                    <button className="btn" onClick={this.calculateCurrency}>Calculate!</button>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <Footer />
        </div>
      )}
      </div>
    );
  }
}

export default Landing;