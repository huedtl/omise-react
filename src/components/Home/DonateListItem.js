import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import fetch from 'isomorphic-fetch';
import Popup from "reactjs-popup";
import Modal from 'react-modal';
import {summaryDonations, groupByProp} from './../../helpers';
import {UPDATE_TOTAL_DONATE, UPDATE_ITEM_DONATE, UPDATE_MESSAGE} from './../../constants/actionTypes';

const API_CHARITIES = 'http://localhost:3001/charities';
const API_PAYMENTS = 'http://localhost:3001/payments';
const imgPath = "images/";
const Card = styled.article`;`;
const sampleDonateDesc = "Reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.";

const targetDonate = [
  {
    charitiesId: 1,
    goal: 200000 
  },
  {
    charitiesId: 2,
    goal: 100000 
  },
  {
    charitiesId: 3,
    goal: 300000 
  },
  {
    charitiesId: 4,
    goal: 250000 
  },
  {
    charitiesId: 5,
    goal: 600000 
  }
];

const customStyles = {
  content : {
    top                   : '30%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    border                : '3px solid #fb5e1c'
  }
};

Modal.setAppElement('#root')

export default connect((state) => state)(
  class DonateArticles extends Component {
    constructor(props) {
      super(props);
      this.state = {
        isLoading: false,
        error: null,
        charities: [],
        charityId: null,
        modalIsOpen: false,
        currency: "USD",
        selectedAmount: 0,
        goalItem: 0,
      };
      this.openModal = this.openModal.bind(this);
      this.closeModal = this.closeModal.bind(this);
    }
    openModal(item) {
      this.setState({
        modalIsOpen: true,
        charityId: item.id,
        name: item.name
      });

    }
    closeModal() {
      this.setState({modalIsOpen: false});
    }

    componentDidMount() {
      const self = this; 
      self.setState({ isLoading: true });
      fetch(API_CHARITIES)
        .then(resp =>{
          if(resp.ok){
            return resp.json();
          }else {
            throw new Error('Something went wrong ...');
          }
        })
        .then(data => {
          self.setState({ charities: data, isLoading: false })})
        .catch(error => this.setState({ error, isLoading: false }));

      fetch(API_PAYMENTS)
        .then(resp =>{
          if(resp.ok){
            return resp.json();
          }else {
            throw new Error('Something went wrong ...');
          }
        })
        .then(data => {
          self.setState({ payments: data, isLoading: false, donateGroupCharitiesId: groupByProp(data, "charitiesId")})
          self.props.dispatch({
            type: UPDATE_TOTAL_DONATE,
            amount: summaryDonations(data.map((item) => (item.amount))),})})
        .catch(error => this.setState({ error, isLoading: false }));
    }

    render() {
      console.log(this);
      const self = this,
      donate = this.props.donate,
      message = this.props.message,
      donateGroupCharitiesId = this.props.donateGroupCharitiesId,
      newArr = [],
      goalItem = 0,
      payments = [10, 20, 50, 100, 500].map((amount, j) => (
        <li key={j}>
          <label >
            <input
              type="radio"
              name="payment"
              onClick={function() {
                self.setState({ selectedAmount: amount })
              }} /> 
              <span>${amount}</span>
          </label>
        </li>
      ));

      for(let key in self.state.donateGroupCharitiesId){
        const donateItmWithCharitiesId = [self.state.donateGroupCharitiesId[key][0].charitiesId, 
        summaryDonations(self.state.donateGroupCharitiesId[key].map((item) => (item.amount)))];
        newArr.push(donateItmWithCharitiesId);
      }

      Object.assign(donateGroupCharitiesId, newArr);

      const cards = this.state.charities.map(function(item, i) {
        for(let k in donateGroupCharitiesId){
          if(donateGroupCharitiesId[i][0] == item.id){
            self.state.sumDonateItem = donateGroupCharitiesId[i][1];
          }
        }
        for(let g in targetDonate){
          if(targetDonate[g].charitiesId == item.id){
            self.state.goalItem = targetDonate[g].goal;
          }
        }
        return (
          <Card key={i} className="product col-2">
            <div className="inner">
              <div className="font-block">
                <figure className="ms-hp-image-wrap">
                  <img src={imgPath + item.image} alt={item.image} />
                </figure>
                <div className="product-infor">
                  <div className="wrap-product-infor">
                    <div className="under-block">
                      <h4 className="title uppercase"><a href="#" alt="">{item.name}</a></h4>
                      <div className="desc">
                        <p>{sampleDonateDesc}</p>
                      </div> 
                      <button onClick={() => self.openModal(item)} className="btn linear-gradient" href="#" title="Donate">Donate</button>
                    </div>
                    <div className="upper-block">
                      <div className="donate-target">
                        Goal: <span className="orange-text">${self.state.goalItem}</span>
                      </div>
                      <div className="donate-target">
                        Raised: <span className="orange-text">${self.state.sumDonateItem}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div> 
            </div>
          </Card>
        );
      });

      return (
        <div className="mf-products mf-adv-block">
          <div className="section-title">
              <h2>Urgent <span className="thm-color">Cause</span></h2>
          </div>
          <div className="total-donate">
              <p>All donations: ${donate}</p>
              <p>{message}</p>
          </div> 
          <div className="wrap-thumb">
            {cards}
          </div>
          <Modal isOpen={self.state.modalIsOpen}
                 onAfterOpen={self.afterOpenModal}
                 onRequestClose={self.closeModal}
                 style={customStyles}
                 contentLabel="Donate Modal"
          >

            <form action="#" onSubmit={() => handlePay.call(self, self.state.charityId, self.state.selectedAmount, self.state.currency, self.state.sumDonateItem)} className="donate-form default-form money-donate-block">
              <div className="form-inner">
                <h4>DONATION INFORMATION</h4>
                <p>How much would you like to donate: <span className="orange-text">{self.state.name}</span></p>
                <ul className="list-money-donate"> 
                  {payments}
                </ul>
                <button className="btn linear-gradient" type="submit">Pay</button>
              </div>
            </form>
          </Modal>
        </div>
      );
    }
  }
);

function handlePay(id, amount, currency, sumDonateItem, payments) {
  const self = this;
  fetch(API_PAYMENTS, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "charitiesId": id, 
      "amount": amount, 
      "currency": currency
    })
  })
  .then(function(resp) {
    return resp.json();})
  .then(function(resp) {
    self.props.dispatch({
      type: UPDATE_TOTAL_DONATE,
      amount,
    });
    self.props.dispatch({
      type: UPDATE_MESSAGE,
      message: `Thanks for donate ${amount}!`,
    });

    setTimeout(function() {
      self.props.dispatch({
        type: UPDATE_MESSAGE,
        message: '',
      });
    }, 2000);
  })
  .then(function(resp){
    self.closeModal();
  })
}

