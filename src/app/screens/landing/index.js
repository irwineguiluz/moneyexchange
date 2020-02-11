import React from 'react';
import Header from '../../components/header';
import Footer from '../../components/footer';

const Landing = () => (
    <div>
        <Header />
        <section className="currencies-converter__container">
            <div className="currencies-converter__wrapper">
                <div className="currencies-converter">
                    <div className="currencies-inputs__wrapper">
                        <h1 className="title">Find out how much the euro is today!</h1>
                        <div className="currencies-inputs">
                            <div className="currency-input__wrapper">
                                <input type="text" className="currency-input" placeholder="USD ($)" />
                            </div>
                            <div className="currency-input__wrapper">
                                <input type="text" className="currency-input" placeholder="Euros (€)" readOnly />
                            </div>
                        </div>
                        <div className="currencies-converter__button">
                            <button>Calculate!</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <Footer />
    </div>
)

export default Landing;