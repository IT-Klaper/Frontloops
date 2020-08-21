!function(e){"function"!=typeof e.matches&&(e.matches=e.msMatchesSelector||e.mozMatchesSelector||e.webkitMatchesSelector||function(e){for(var t=this,o=(t.document||t.ownerDocument).querySelectorAll(e),n=0;o[n]&&o[n]!==t;)++n;return Boolean(o[n])}),"function"!=typeof e.closest&&(e.closest=function(e){for(var t=this;t&&1===t.nodeType;){if(t.matches(e))return t;t=t.parentNode}return null})}(window.Element.prototype);

const getCard = (lastDigits, validThru) => `
      <button class="card-info Visa">
        <p class="card-number"><span class="hide-number">**** **** ****</span> ${lastDigits}</p>
        <p class="validity">Valid thru: ${validThru}</p>
      </button>`;

document.addEventListener('DOMContentLoaded', function() {
    const modalButtons = document.querySelectorAll('.js-open-modal');
    const overlay = document.querySelector('.js-overlay-modal');
    const closeButtons = document.querySelectorAll('.js-modal-close');
    
    document.querySelector('#js-card-form').addEventListener('submit', (event) => {
      event.preventDefault();
      const formHtmlElement = event.target;
      const formData = new FormData(formHtmlElement);
      const cardData = Object.fromEntries(formData.entries());

      const lastDigits = cardData.number;
      const numbercard = lastDigits.substring(lastDigits.length - 4);
      const validity = cardData.text;

      const template = getCard(numbercard,validity);
      console.log(template);

      const element = document.createElement('div');
      element.innerHTML = template;
      const cardButton = element.firstElementChild;
      console.log(cardButton);
      document.querySelector('.js-cards-list').append(cardButton);
    })

    modalButtons.forEach(function(item){
      item.addEventListener('click', function(e) {
        e.preventDefault();
        var modalId = item.dataset.modal,
            modalElem = document.querySelector('.modal[data-modal="' + modalId + '"]');
         modalElem.classList.add('active');
         overlay.classList.add('active');
      }); 

   }); 

   closeButtons.forEach(function(item){

      item.addEventListener('click', function(e) {
         var parentModal = this.closest('.modal');

         parentModal.classList.remove('active');
         overlay.classList.remove('active');
      });

   });   
}); 

