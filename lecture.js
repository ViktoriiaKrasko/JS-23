//============================== COMPOSITE ============================//
// ============================== TREE LIKE STRUCTURE =====================//

class Composite {
  comments = [];

  addComment(comment) {
    this.comments.push(comment);
  }

  removeComment(comment) {
    const index = this.comments.indexOf(comment);
    if (index !== -1) {
      this.comment.splice(index, 1);
    }
  }
}

class Comment extends Composite {
  constructor(text) {
    super();

    this.text = text;
  }

  display() {
    console.log(`- Коментар: ${this.text}`);
    for (const comment of this.comments) {
      comment.display();
    }
  }
}

class Video extends Composite {
  constructor(title) {
    super();
    this.title = title;
  }

  display() {
    console.log(`Відео: ${this.title}`);

    for (const comment of this.comments) {
      comment.display();
    }
  }
}

const video = new Video("Навчальне відео");
video.addComment(new Comment("Liked this video"));
video.addComment(new Comment("Didn't like this video"));

video.comments[0].addComment(new Comment("This video made my day!"));

video.display();

// =========================  FLYWEIGHT =========================//
class Category {
  static #categories = {};

  constructor(name) {
    this.name = name;
  }

  static create(name) {
    if (!this.#categories[name]) {
      this.#categories[name] = new Category(name);
    }
    return this.#categories[name];
  }
}

class Product {
  constructor(name, category) {
    this.name = name;
    this.category = category;
  }

  display() {
    console.log(`Product ${this.name}, Category: ${this.category.name}`);
  }
}

const electronics = Category.create("Electronics");
const books = Category.create("Books");
const electronics2 = Category.create("Electronics");

console.log("======================");
console.log(electronics, books, electronics2);
console.log(electronics === electronics2);

const product1 = new Product("Laptop", electronics);
const product2 = new Product("Headphones", electronics);
const product3 = new Product("Book Title", books);
const product4 = new Product("Smartphone", electronics);

console.log("=================");
product1.display();
product2.display();
product3.display();
product4.display();

console.log(product1.category === product4.category);

const list = [product1, product2, product3, product4].filter(
  (product) => product.category === Category.create("Electronics")
);

console.log(list);

// ================================== TEMPLATE METHOD ================================== //
class CoffeeMachine {
  prepareCoffee() {
    this.boilWater();
    this.grindCoffeeBeans();
    this.#brewCoffee();
    this.pourIntoCup();
    this.addIngridients();
    this.serveCoffee();
  }

  boilWater() {
    console.log("Boiling water");
  }

  grindCoffeeBeans() {
    console.log("Grinding coffee beans");
  }

  #brewCoffee() {
    console.log("Brewing coffee");
  }

  pourIntoCup() {
    console.log("Pouring into cup");
  }

  addIngridients() {
    //Цей метод залишається пустим та може бути визначений у підкласах
  }

  serveCoffee() {
    console.log("Coffee served!");
  }
}

class LatteMachine extends CoffeeMachine {
  addIngridients() {
    console.log("Adding milk to make latte");
  }
}

class CappuccinoMachine extends CoffeeMachine {
  addIngridients() {
    console.log(
      "Adding frothed milk and sprinkle of cocoa powder to make a cappuccino"
    );
  }
}

const latteMachine = new LatteMachine();
latteMachine.prepareCoffee();

const cappuccinoMachine = new CappuccinoMachine();
cappuccinoMachine.prepareCoffee();

// ============================= VISITOR ====================================//
class TextFile {
  constructor(name, content) {
    this.name = name;
    this.content = content;
  }
}

class ImageFile {
  constructor(name, size) {
    this.name = name;
    this.size = size;
  }
}

class VideoFile {
  constructor(name, duration) {
    this.name = name;
    this.duration = duration;
  }
}

class TextEditor {
  files = [];

  addFile(file) {
    this.files.push(file);
  }

  readTextFile(file) {
    console.log(
      `Text file: ${file.name}, Size: ${file.content.length} characters`
    );
  }

  readImageFile(file) {
    console.log(`Image file: ${file.name}, Size: ${file.size} KB`);
  }

  readVideoFile(file) {
    console.log(`Video file: ${file.name}, Size: ${file.duration} minutes`);
  }

  readFiles() {
    for (const file of this.files) {
      if (file instanceof TextFile) {
        this.readTextFile(file);
      } else if (file instanceof ImageFile) {
        this.readImageFile(file);
      } else if (file instanceof VideoFile) {
        this.readVideoFile(file);
      }
    }
  }
}

const textEditor = new TextEditor();

const textFile = new TextFile("document.txt", "Some text");
const imageFile = new ImageFile("image.png", 1024);
const videoFile = new VideoFile("video.mp4", 60);

textEditor.addFile(textFile);
textEditor.addFile(imageFile);
textEditor.addFile(videoFile);

console.log(textEditor);

textEditor.readFiles();

// ============================== ADAPTER ===========================//
class ElectronicPaymentSystem {
  makePayment(amount) {
    const convertedAmount = this.convertAmount(amount);
    console.log(`Making electronic payment: $${convertedAmount}`);
  }

  convertAmount(amount) {
    //Логіка конвертації суми платежу
    return amount * 1.2; //Припустимо, що необходна конвертація у відсотках
  }
}

class OtherPaymentSystem {
  submit(amount) {
    console.log(`Submitting payment request: $${amount}`);
  }
}

class PaymentAdapter {
  constructor(paymentSystem) {
    this.paymentSystem = paymentSystem;
  }

  makePayment(amount) {
    const convertedAmount = this.convertAmount(amount);
    this.paymentSystem.submit(convertedAmount);
  }

  convertAmount(amount) {
    return amount * 1.2;
  }
}

// const electronicPaymentSystem = new ElectronicPaymentSystem();
// electronicPaymentSystem.makePayment(100);

class Order {
  constructor(amount) {
    this.amount = amount;

    if (amount < 100) {
      this.paymentSystem = new PaymentAdapter(new OtherPaymentSystem());
    } else {
      this.paymentSystem = new ElectronicPaymentSystem();
    }
  }

  makePayment() {
    return this.paymentSystem.makePayment(this.amount);
    // if (this.paymentSystem.makePayment) {
    //   return this.paymentSystem.makePayment(this.amount);
    // }

    // if (this.paymentSystem.submit) {
    //   return this, this.paymentSystem.submit(this.amount);
    // }
  }
}

console.log("=====================");
const order1 = new Order(1000);
order1.makePayment();

const order2 = new Order(10);
order2.makePayment();

//==================================== STRATEGY =================================//
class ShoppingCart {
  constructor(discountStrategy) {
    this.discountStrategy = discountStrategy;
    this.items = [];
  }

  addItem(item) {
    this.items.push(item);
  }

  calculateTotalPrice() {
    const price = this.items.reduce((acc, item) => acc + item.price, 0);

    return price - this.discountStrategy.calculateDiscount(price);
  }
}

class DiscountStrategy {
  calculateDiscount(price) {
    return price;
  }
}

//Стратегія знижки для звичайних клієнтів
class RegularDiscountStrategy extends DiscountStrategy {
  calculateDiscount(price) {
    return price * 0.1; // знижка 10%
  }
}

//Стратегія знижки преміум-клієнтів
class PremiumDiscountStrategy extends DiscountStrategy {
  calculateDiscount(price) {
    return price * 0.2; // знижка 20%
  }
}

//Стратегія знижки для нових клієнтів
class NewCustomerDiscountStrategy extends DiscountStrategy {
  calculateDiscount(price) {
    return price * 0.05; //знижка 5%
  }
}

const shoppingCart1 = new ShoppingCart(new RegularDiscountStrategy());

shoppingCart1.addItem({ name: "Product 1", price: 100 });
shoppingCart1.addItem({ name: "Product 2", price: 50 });

console.log(shoppingCart1.calculateTotalPrice());

// ===================== ITERATOR ==================================//
// class User {
//   constructor(name, email, password) {
//     this.name = name;
//     this.email = email;
//     this.password = password;
//   }
// }

// class UserGroup {
//   users = [];

//   addUser(user) {
//     this.users.push(user);
//   }
// }

// class UserIterator {
//   #users = null;
//   #currentIndex = 0;

//   constructor(userGroup) {
//     this.#users = userGroup.users;
//   }

//   #hasNext() {
//     return this.#currentIndex < this.#users.length;
//   }

//   //метод, який повертає наступний елемент
//   next() {
//     if (this.#hasNext()) {
//       const name = this.#users[this.#currentIndex].name;
//       this.#currentIndex++;
//       return name;
//     }

//     return null;
//   }

//   list() {
//     return this.#users.map((user) => user.name).join(", ");
//   }
// }

// const group = new UserGroup();

// group.addUser(new User("John Doe", "john@example.com", "password1"));

// group.addUser(new User("Jane Smith", "jane@example.com", "password2"));

// console.log(group.users.map((user) => user.name).join(", ")); //John Doe, Jane Smith

// console.log("============");

// const iterator = new UserIterator(group);
// console.log(iterator.next());
// console.log(iterator.next());
// console.log(iterator.next());

// console.log(iterator.list());

// ================================ MEDIATOR ============================= //

class User {
  constructor(name, chat) {
    this.name = name;
    this.chat = chat;
  }

  sendMessage(message) {
    console.log(`${this.name} sent message ${message}`);
    return this.chat.sendMessage(this, message);
  }

  //Прийняття повідомлення від іншого користувача
  receiveMessage(user, message) {
    console.log(`${this.name} recieved message from ${user.name}: ${message}`);
  }
}

class Chat {
  constructor() {
    this.users = [];
  }

  //Додавання користувача до чату
  addUser(user) {
    this.users.push(user);
  }

  //Відправлення повідомлення в чат
  sendMessage(sender, message) {
    for (const user of this.users) {
      if (user !== sender) {
        //відправка повідомлення в message
        user.receiveMessage(sender, message);
      }
    }
  }
}

const chatMediator = new Chat();

const user1 = new User("John", chatMediator);
const user2 = new User("Jane", chatMediator);
const user3 = new User("Mike", chatMediator);

chatMediator.addUser(user1);
chatMediator.addUser(user2);
chatMediator.addUser(user3);

user1.sendMessage("Привіт всім");
user2.sendMessage("Привіт John");
