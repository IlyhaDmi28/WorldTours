import '../styles/payment.scss';
import React, { useState } from 'react';
import Header from '../components/general/header';
import Money from '../img/money.png';

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
                        Для оплаты тура вам необходимо в разделе "Текущие брони" выбрать бронь тура, у которой статус "Потвержденно". В 
                        данной броне будет кнопка "Оплатить". Вам необходимо нажать на неё.
                    </div>
                    <br/>
                    <div>
                        Далее необходимо заполнить данные банковской карточки. После заполнения необходимо нажать "Оплатить" и подтвердить
                        олпату. Затем бронь тура получит статус "Оплачен". Оплату необходимо произвести минимум за 3 дня до отпрравки в тур.
                    </div>
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
