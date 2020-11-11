const name = document.getElementById('name');
const currentMonthlyPayment = document.getElementById('currentMonthlyPayment');
const currentBalance = document.getElementById('currentBalance');
const apr = document.getElementById('apr');
const submitBtn = document.getElementById('submitForm');
const allDebtors = document.getElementById('allDebtors');
const priorityList = document.getElementById('priorityList');
const priorities = document.getElementById('priorities');
const priorityBtn = document.getElementById('priorityBtn');
const jon = new Debtee('Jon');
String.prototype.parseCurrency = function(){
    return parseFloat(parseFloat(this).toFixed(2));
}
const onSubmit = (e) => {
    jon.addDebtor(name.value, currentBalance.value.parseCurrency(), currentMonthlyPayment.value.parseCurrency(), 1, currentMonthlyPayment.value.parseCurrency(), apr.value.parseCurrency());
    while(allDebtors.firstChild){
        allDebtors.removeChild(allDebtors.firstChild);
    }
    window.localStorage.setItem('debtors', JSON.stringify(jon.debtors));
    emptyVals();
    displayDebtors();
}
const displayDebtors = () => {
    let debtors = jon.debtors;
    if(window.localStorage.getItem('debtors')) {
        debtors = JSON.parse(window.localStorage.getItem('debtors'));
        debtors.forEach(debtor => {
            jon.addDebtor(debtor.name, debtor.currentBalance, debtor.currentMonthlyPayment, debtor.currentMonthlyPayment, debtors.apr);
        })
    };
    if(debtors) {
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
}
const displayPrioritizedList = () => {
    let priority;
    switch(priorities.value){
        case "monthsToPayoff" : priority = "monthsToPayoff";
        break;
        case "apr" : priority = "apr";
        break;
        case "currentBalance" : priority = "currentBalance";
        break;
        default : priority = jon.priority;
    }
    let debtors = jon.prioritizeDebtors(priority);
    while(priorityList.firstChild){
        priorityList.removeChild(priorityList.firstChild);
    }
    console.log(debtors)
    let debtor;
    while(true){
        debtor = debtors.dequeue();
        let item = document.createElement('li');
        let balance = document.createElement('p');
        let debtorName = document.createElement('h3');
        item.appendChild(debtorName);
        item.appendChild(balance);
        balance.innerText = debtor.val[priority];
        debtorName.innerText = debtor.val.name;
        priorityList.appendChild(item);
        if(debtors.vals.length <= 0) break;
    }
    // debtors.vals.forEach(debtor => {    
    //     // console.log(debtor.priority)
    // })
}
const emptyVals = () => {
    name.value = "";
    currentBalance.value = "";
    currentMonthlyPayment.value = "";
    currentMonthlyPayment.value = "";
    apr.value = "";
}
submitBtn.addEventListener('click', onSubmit);
priorityBtn.addEventListener('click', displayPrioritizedList);
window.addEventListener('load', displayDebtors);
