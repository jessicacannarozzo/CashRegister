//cashRegister.js
//author: Jessica Cannarozzo

cashRegister = {
  total: 0,
  dailyCashTotal: 0, //total amount register earned
  lastTransaction: 0,
  itemList: [], priceList: [],
  saleList: [], salePrice: [],
  purchasedItems: [], purchasedItemCost: [],
  quantity: [],

/*  lazyPay: function(item, quantity) {
    switch (item, quantity) {
      case "eggs": this.addTotal(2.00*quantity); break;
      case "milk": this.addTotal(5.00*quantity); break;
      case "cookies": this.addTotal(2.50*quantity); break;
      case "chocolate": this.addTotal(1.50*quantity); break;
      default: console.log("Item not found.");
    }
  },
*/

//PAY: handles discount list
  pay: function(item, quantity) {
    for (var i in this.itemList) {
      if (this.itemList[i] === item) {
        if (!this.isOnSale(item)) {
        this.addTotal(this.priceList[i] * quantity);
        //add to receipt lists
        this.purchasedItems.push(this.itemList[i]);
        this.purchasedItemCost.push(this.priceList[i] * quantity);
        this.quantity.push(quantity);
        } else {
          for (var i in this.saleList) {
            if (saleList[i] === item) {
              this.addTotal(this.saleList[i] * quantity);
              //add to receipt lists
              this.purchasedItems.push(this.itemList[i]);
              this.purchasedItemCost.push(this.saleList[i] * quantity);
              this.quantity.push(quantity);
            }
          }
        }
      }
    }
  },

//returns true if item is in the saleList
  isOnSale: function(item) {
    for (var i in this.saleList) {
      if (this.saleList[i] === item) {
        return true;
      }
    }
    return false;
  },

//adds to total
  addTotal: function(value) {
    this.total += value;
    this.lastTransaction = value;
  },

//adds item to list to be indexed
  addItem: function(item, price) {
    this.itemList.push(item);
    this.priceList.push(price);
  },

//removes item from regular list
  removeItem: function(item) {
    for (var i in this.itemList) {
      if (this.itemList[i] === item) {
        this.itemList.splice(i, 1);
        this.priceList.splice(i, 1);
      }
    }
  },

//adds sale item
  addSaleItem: function(item, newPrice) {
    this.saleList.push(item);
    this.saleList.push(newPrice);
  },

//removes sale item
  removeSaleItem: function(item) {
    for (var i in this.saleList) {
      if (this.saleList[i] === item) {
        this.saleList.splice(i, 1);
        this.saleList.splice(i, 1);
      }
    }
  },

//grants refund
  refund: function(payable) {
    this.total -= payable;
  },

//removes last transaction from total
  voidLastTransaction: function() {
    this.total -= this.lastTransaction;
    this.purchasedItems.pop();
    this.purchasedItemCost.pop();
    this.quantity.pop();
  },

//resets daily total in the cash register
  resetDailyTotal: function() {
    this.dailyCashTotal = 0;
  },

  printReceipt: function() {
    dots = "";
    //format receipt
    console.log("\nHere is your receipt!");
    console.log("-----------------------------------------");

    for (var i in this.purchasedItems) {
      for (var j = 0; j < 28 - this.purchasedItems[i].length - this.purchasedItemCost[i].toLocaleString().length; j++) {
        dots += ".";
      }
      console.log(this.purchasedItems[i] + dots + "$" + this.purchasedItemCost[i].toFixed(2) + "   Qt: " + this.quantity[i]);
      dots = ""; //reset
    }

    console.log("-----------------------------------------")
    console.log("Total: $" + this.total.toFixed(2));

    //add to daily total before reset
    this.dailyCashTotal += this.total;

    //reset values for next transaction
    this.total = 0,
    this.purchasedItems = [], this.purchasedItemCost = [],
    this.lastTransaction = 0;
  }
};

/*
* Random Testing
*/
cashRegister.addItem("pie", 2.00);
cashRegister.addItem("crackers", 3.50);
cashRegister.pay("pie", 10);
cashRegister.voidLastTransaction();
cashRegister.pay("crackers", 60);
cashRegister.pay("pie", 20);

cashRegister.printReceipt();
cashRegister.printReceipt();
