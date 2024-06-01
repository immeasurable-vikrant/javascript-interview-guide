// Asked in NAVI Interview:

// Input:
// computeAmount().lacs(15).crore(5).crore(2).lacs(20).thousand(45).crore(7).value();

// Output:
// 143545000

// This is build with Builder design pattern - famous design patern used in strictly typed languages like java

const ComputeAmount = function () {
  this.store = 0;

  this.crore = function (val) {
    this.store += val * Math.pow(10, 7);
    return this;
  };

  this.lacs = function (val) {
    this.store += val * Math.pow(10, 5);
    return this;
  };

  this.thousand = function (val) {
    this.store += val * Math.pow(10, 3);
    return this;
  };

  this.hundred = function (val) {
    this.store += val * Math.pow(10, 2);
    return this;
  };

  this.ten = function (val) {
    this.store += val * 10;
    return this;
  };

  this.unit = function (val) {
    this.store += val;
    return this;
  };

  this.value = function () {
    return this.store;
  };
};

//   Input:
const computeAmount = new ComputeAmount();
const amount = computeAmount
  .lacs(15)
  .crore(5)
  .crore(2)
  .lacs(20)
  .thousand(45)
  .crore(7)
  .value();
console.log(amount);
//   console.log(amount === 143545000);

//   Output:
//   true
