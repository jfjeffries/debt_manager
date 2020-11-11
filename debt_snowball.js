class Debtor{
    constructor(name, currentBalance = 0, currentMonthlypayment = 0, dueDate = 1, minMonthlyPayment = 0, apr = 0){
        this.name = name;
        this.currentBalance = currentBalance; //use as priority option
        this.currentMonthlypayment = currentMonthlypayment;
        this.dueDate = dueDate;
        this.minMonthlyPayment = minMonthlyPayment;
        this.apr = apr ? apr:0; //use as priority option
        this.monthsToPayoff = Infinity; //use as priority option
        this.extraPayment = 0;
    }
    changeName(newName){this.name = newName}
    addToBalance(amt){this.currentBalance += amt;}
    payOnBalance(amt){this.currentBalance -= amt;}
    setCurrentMonthlyPayment(payment){this.currentMonthlypayment = payment}
    changeDueDate(newDate){this.dueDate = newDate;}
    setMinMonthlyPayment(payment){this.minMonthlyPayment = payment}
    setApr(newApr){this.apr = newApr}
    getMonthsToPayoff(){return this.monthsToPayoff}
    setMonthsToPayoff(){
        let payment = this.minMonthlyPayment + this.extraPayment;
        let payed = false;
        let months = 0;
        let balance = this.currentBalance;

        while(!payed){
            balance -= payment;
            months++;
            balance = parseInt((balance + (balance * (this.apr / 12))).toFixed(2));
            if(balance <= 0) payed = true;
        }
        return months;
    }
}

class Debtee{
    constructor(name){
        this.name = name;
        this.debtors = []; 
        this.totalMonthsToPayoff = 0;
        this.extraPayment = 0;
        this.priority = 'currentBalance';
    }
    addDebtor(name, currentBalance, currentMonthlypayment, dueDate, minMonthlyPayment, apr){
        let newDebtor = new Debtor(name, currentBalance, currentMonthlypayment, dueDate, minMonthlyPayment, apr)
        if(!this.debtors[newDebtor]) {
            this.debtors.push(newDebtor);
        }
        return this.debtors;
    }
    addToExtraPayment(amt){this.extraPayment += amt;}
    removeDebtor(debtor){
        return this.debtors.splice(this.debtors.indexOf(debtor, 1));
    }
    payDebtor(debtor, amt){debtor.payOnBalance(amt); return debtor.currentBalance;}
    getTotalMonthsToPayoff(priority){
        if(!priority || priority === this.priority) return this.totalMonthsToPayoff;
        let total = 0;
        this.debtors.forEach(debtor => {
            total += debtor.totalMonthsToPayoff;
        })
        return total;
    } 
    setTotalMonthsToPayoff(){this.totalMonthsToPayoff = this.getTotalMonthsToPayoff();}
    prioritizeDebtors(priority){
        const queue = new PriorityQueue();
        if(!priority) priority = this.priority;

        this.debtors.forEach(debtor => {
            queue.enqueue(debtor, debtor[priority])
        });
        return queue;
    }
    addToPayment(debtor, amt){
        debtor.extraPayment += amt;
    }
    setPriority(priority){
        this.priority = priority;
    }
}

class Node {
    constructor(val, priority){
        this.val = val;
        this.priority = priority;
    }
}
// min heap based on priority
class PriorityQueue{
    constructor(){
        this.vals = [];
    }
    enqueue(val, priority){
        let node = new Node(val, priority);
        this.vals.push(node);
        this.bubbleUp();
    }
    dequeue(){
        const highestPriority = this.vals[0];
        const vals = this.vals;
        const element = vals.pop();
        if(vals.length > 0){
            vals[0] = element;
            this.bubbleDown();
        }
        return highestPriority;
    }
    bubbleDown(){
        const vals = this.vals;
        const element = vals[0];
        const length = vals.length;
        let index = 0;
        while(true){
            let leftIdx = index * 2 + 1;
            let rightIdx = index * 2 + 2;
            let leftChild, rightChild;
            let swap = null;
            if(leftIdx < length){
                leftChild = vals[leftIdx];
                if(leftChild.priority < element.priority){
                    swap = leftIdx;
                }
            }
            if(rightIdx < length){
                rightChild = vals[rightIdx];
                if(
                    (swap === null && rightChild.priority < element.priority) || 
                    (swap !== null && rightChild.priority < leftChild.priority)
                    ){
                        swap = rightIdx;
                }
            }
            if(swap === null) break;
            vals[index] = vals[swap];
            vals[swap] = element;
            index = swap;
        }
    }
    bubbleUp(){
        let vals = this.vals;
        let index = vals.length - 1;
        while(index > 0){
            let parentIndex = Math.floor((index - 1) / 2);
            if(vals[parentIndex].priority < vals[index].priority) break;
            this.swap(parentIndex, index);
            index = parentIndex;
        }
        return this;
    }
    
    swap(i1, i2){
        let temp = this.vals[i1];
        this.vals[i1] = this.vals[i2];
        this.vals[i2] = temp;
    }
}
//name, currentBalance = 0, currentMonthlypayment = 0, dueDate = 1, minMonthlyPayment = 0, apr = 0
// let jon = new Debtee('Jon');
// jon.addDebtor('Lending Club', 500, 150, 5, 150, 10)
// jon.addDebtor('Ford', 500, 500, 15, 500, 0)

// console.log(jon.prioritizeDebtors('apr').vals);



//TO DO
/*
    Create a class of bill so that each debtor can have more than one debt owed.
 */