const name = document.getElementById('name');
const currentMonthlyPayment = document.getElementById('currentMonthlyPayment');
const currentBalance = document.getElementById('currentBalance');
const apr = document.getElementById('apr');
const submitBtn = document.getElementById('submitForm');
const allDebtors = document.getElementById('allDebtors');
const priorityList = document.getElementById('priorityList');
const priorities = document.getElementById('priorities');
const jon = new Debtee('Jon');

const onSubmit = (e) => {
    jon.addDebtor(name.value, currentBalance.value, currentMonthlyPayment.value, 1, currentMonthlyPayment.value, apr.value);
    while(allDebtors.firstChild){
        allDebtors.removeChild(allDebtors.firstChild);
    }
    window.localStorage.setItem('debtors', JSON.stringify(jon.debtors));
    emptyVals();
    displayDebtors();
}

const displayDebtors = () => {
    let debtors = JSON.parse(window.localStorage.getItem('debtors'))
    console.log(debtors)
    debtors.forEach(debtor => {
        let item = document.createElement('li');
        let balance = document.createElement('p');
        let debtorName = document.createElement('h3');
        item.appendChild(debtorName);
        item.appendChild(balance);
        balance.innerText = debtor.currentBalance;
        debtorName.innerText = debtor.name;
        allDebtors.appendChild(item);
    })
}
const emptyVals = () => {
    name.value = "";
    currentBalance.value = "";
    currentMonthlyPayment.value = "";
    currentMonthlyPayment.value = "";
    apr.value = "";
}
submitBtn.addEventListener('click', onSubmit);