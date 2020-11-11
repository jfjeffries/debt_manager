class Debtor{
    constructor(name, currentBalance = 0, currentMonthlyPayment = 0, dueDate = 1, minMonthlyPayment = 0, apr = 0){
        this.name = name;
        this.currentBalance = currentBalance; //use as priority option
        this.currentMonthlyPayment = currentMonthlyPayment;
        this.dueDate = dueDate;
        this.minMonthlyPayment = minMonthlyPayment;
        this.apr = apr ? apr:0; //use as priority option
        this.extraPayment = 0;
        this.monthsToPayoff = this.setMonthsToPayoff(); //use as priority option
    }
    changeName(newName){this.name = newName}
    addToBalance(amt){this.currentBalance += amt;}
    payOnBalance(amt){this.currentBalance -= amt;}
    setCurrentMonthlyPayment(payment){this.currentMonthlyPayment = payment}
    changeDueDate(newDate){this.dueDate = newDate;}
    setMinMonthlyPayment(payment){this.minMonthlyPayment = payment}
    setApr(newApr){this.apr = newApr}
    getMonthsToPayoff(){return this.monthsToPayoff}
    setMonthsToPayoff(){
        let payment = this.currentMonthlyPayment + this.extraPayment;
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
        let newDebtor = new Debtor(name, currentBalance, currentMonthlypayment, dueDate, minMonthlyPayment, apr);
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
            let swapIdx = null;
            if(leftIdx < length){
                leftChild = vals[leftIdx];
                if(leftChild.priority < element.priority){
                    swapIdx = leftIdx;
                }
            }
            if(rightIdx < length){
                rightChild = vals[rightIdx];
                if(
                    (swapIdx === null && rightChild.priority < element.priority) || 
                    (swapIdx !== null && rightChild.priority < leftChild.priority)
                    ){
                        swapIdx = rightIdx;
                }
            }
            if(swapIdx === null) break;
            vals[index] = vals[swapIdx];
            vals[swapIdx] = element;
            index = swapIdx;
        }
    }
    bubbleUp(){
        let index = this.vals.length - 1;
        let parentIndex;

        while(index > 0){
            parentIndex = Math.floor((index - 1) / 2);

            if(this.vals[parentIndex].priority < this.vals[index].priority) break;
            let temp = this.vals[parentIndex];
            this.vals[parentIndex] = this.vals[index];
            this.vals[index] = temp;
            index = parentIndex;

        }
        return this;
    }
    
    swap(i1, i2){
        console.log("swapping", this)
        let temp = this.vals[i1];
        this.vals[i1] = this.vals[i2];
        this.vals[i2] = temp;
    }
}

//TO DO
/*
    Create a class of bill so that each debtor can have more than one debt owed.
 */