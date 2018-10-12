'use strict'

import IMask from 'imask';

window.onload = () => {
  setTimeout(() => {
    document.querySelector('.pre-loader').classList.add('hidden');
  }, 1000);

  const beerAnswer = document.querySelector('.beer-answer');
  const inputName = document.getElementById('input-name');
  let form = document.getElementById('beer-form');
  const inputPhone = document.getElementById('input-phone');
  const inputEmail = document.getElementById('input-email');
  const btn = document.getElementById('btn-submit');
  let done = false;
  const answers = {
    strength: 'НАСТОЯЩИЙ СОЛОД ДЛЯ ШОТЛАНДСКОГО СТАУТА ПРОХОДИТ ТРИ СТАДИИ ОБРАБОТКИ, ПОСЛЕ КОТОРЫХ ВКУСОВЫЕ КАЧЕСТВА НАПИТКА ПОЛУЧАЮТСЯ СОВЕРШЕННО БЕСПОДОБНЫМИ!',
    taste: 'текст про крутые ингридиенты НАСТОЯЩИЙ СОЛОД ДЛЯ ШОТЛАНДСКОГО СТАУТА ПРОХОДИТ ТРИ СТАДИИ ОБРАБОТКИ, ПОСЛЕ КОТОРЫХ ВКУСОВЫЕ КАЧЕСТВА НАПИТКА ПОЛУЧАЮТСЯ СОВЕРШЕННО БЕСПОДОБНЫМИ!',
    color: 'Цвет от чёрного как сажа до тёмно-коричневого с гранатовым отливом. ... Характерна плотная, кремовидная, стойкая пена, цвет от жёлто-коричневого до коричневого. Сухой стаут представлен маркой Guinness Extra Stout.',
    ingrs: 'В некоторые сорта пива добавляется так называемый «несоложеный продукт». Чаще всего это ячмень, рис или кукуруза. Добавление несоложеного продукта - это один из механизмов создания разных сортов пива, т.к. такая добавка влияет на органолептические свойства пива (вкус, цвет, запах). В некоторые добавляются ещё более экзотичные составляющие. Например, при производстве Hoegaarden ("Хугарден") используют апельсиновую цедру и кориандр. А при изготовлении знаменитого бельгийского пива Kriek («Крик») используют натуральные ягоды – вишню, малину, мускатный виноград.',
    age: 'Несмотря на то, что выдержка в бутылке всего год, уже заметны благородные оттенки дубленой кожи, присущие выдержанным стаутам.'
};
  form = Array.from(form.elements);
  form.forEach(inp => {
    inp.addEventListener('change', e => {
      beerAnswer.innerHTML = answers[e.target.value];
    })
  });
  let phoneMask = new IMask(
    inputPhone, {
      mask: '+{7}(000)000-00-00'
    });
  inputPhone.addEventListener('input', e => {
    checkBtn();
  })
  inputName.addEventListener('input', e => {
    if(e.target.value.match(/\d+/)){
      e.target.parentNode.classList.add('input-block_bad')
      checkBtn();
    } else {
      e.target.parentNode.classList.remove('input-block_bad')
      checkBtn();
    }
  })
  inputEmail.addEventListener('input', e => {
    if(!e.target.value.match(/^[-._a-z0-9]+@(?:[a-z0-9][-a-z0-9]+\.)+[a-z]{2,6}$/)){
      e.target.parentNode.classList.add('input-block_bad')
      checkBtn();
    } else {
      e.target.parentNode.classList.remove('input-block_bad')
      checkBtn();
    }
  })

  let checkBtn = function() {
    if(
      inputName.value !== '' &&
      !inputName.value.match(/\d+/) &&
      inputEmail.value !== '' &&
      inputEmail.value.match(/^[-._a-z0-9]+@(?:[a-z0-9][-a-z0-9]+\.)+[a-z]{2,6}$/) &&
      inputPhone.value !== '' &&
      inputPhone.value.length === 16
      ){
        btn.classList.remove('my-btn_disabled')
        done = true;
      } else {
        done = false;
        btn.classList.add('my-btn_disabled')
      }
    }
  btn.addEventListener('click', e => {
    if(done) {
      console.log(JSON.stringify({inputName: inputName.value, inputPhone: inputPhone.value, inputEmail: inputEmail.value}));
    }
  })
};
