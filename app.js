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
    console.log(e)
    const debtor = new Debtor(name.value, currentBalance.value, currentMonthlyPayment.value, 1, currentMonthlyPayment.value, apr.value);
    jon.debtors.push(debtor);
    while(allDebtors.children.length > 0){
        allDebtors.removeChild();
    }
    displayDebtors();
}

const displayDebtors = () => {
    jon.debtors.forEach(debtor => {
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

submitBtn.addEventListener('click', onSubmit);