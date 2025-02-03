import '../../styles/payment.scss';
import React, { useState } from 'react';
import Header from '../../components/general/header';
import Money from '../../img/money.png';

function Payment() {
	return (
		<div className="payment narrow-conteiner">
			<Header/>
			<div className="line-under-header"></div>
			<div className="header-info">ОПЛАТА</div>
            <div className='payment-info'>
                <div>
                    <div>
                        Для того что бы полностью забронировать тур, вам необходимо выбрать тур, заполнить полнить поля соответсвующей
                        информацией и нажать "Заявка на тур". Затем вам необходимо дождаться подтверждение тура нашим агенством, после 
                        чего вам необходимо будет его оплатит.
                    </div>
                    <br/>
                    <div>
                        Оплата тура должна быть выполнена предварительно через "ЕРИП". В день отправления в тур, в пункте отправления вас 
                        встретит наш турагент. Вы ему должны предоставить доказательства оплаты. После подтверждения опалты вы можете 
                        отправляться в путешествие!
                    </div>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <b>
                        УЧТИТЕ, ЧТО ВОЗВАРТ ДЕНЕЖНЫХ СРЕДСТВ ПОСЛЕ ОПЛАТЫ ТУРА НЕВОЗМОЖЕН!!!
                    </b>
                </div>
                <img src={Money}/>
            </div>
		</div>
	);
}

export default Payment;
