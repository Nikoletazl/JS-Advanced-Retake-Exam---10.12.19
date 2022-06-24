class ChristmasDinner {
    constructor(budget) {
        this._budget = budget,
        this.dishes = []
        this.products = []
        this.guests = {}
    }
    set _budget(bgt) {
        if (bgt < 0) {
            throw new Error("The budget cannot be a negative number")
        }
        this.budget = bgt;
    }

    shopping([type, price]) {
        if (price > this.budget) {
            throw new Error("Not enough money to buy this product")
        }
        this.products.push(type)
        this.budget -= price

        return `You have successfully bought ${type}!`
    }

    recipes({ recipeName, productsList }) {
        for (let product of productsList){
            if (!this.products.includes(product)){
                throw new Error("We do not have this product")
            }
        }
        
        this.dishes.push({recipeName, productsList})
        return `${recipeName} has been successfully cooked!`

    }

    inviteGuests(name, dish) {
        let searchedDish = this.dishes.find(d => d.recipeName == dish)
    
        if (searchedDish == undefined){
            throw new Error("We do not have this dish")
        }
        if(name in this.guests){
            throw new Error("This guest has already been invited")
        }
        this.guests[name] = dish
        return `You have successfully invited ${name}!`
    }

    showAttendance() {
        let result = []
        for(let [key, value]of Object.entries(this.guests)){
            let products = this.dishes.find(d => d.recipeName == value).productsList.join(', ')
            result.push(`${key} will eat ${value}, which consists of ${products}`)
        }
        return result.join('\n')
    }
}
let dinner = new ChristmasDinner(300);

dinner.shopping(['Salt', 1]);
dinner.shopping(['Beans', 3]);
dinner.shopping(['Cabbage', 4]);
dinner.shopping(['Rice', 2]);
dinner.shopping(['Savory', 1]);
dinner.shopping(['Peppers', 1]);
dinner.shopping(['Fruits', 40]);
dinner.shopping(['Honey', 10]);

dinner.recipes({
    recipeName: 'Oshav',
    productsList: ['Fruits', 'Honey']
});
dinner.recipes({
    recipeName: 'Folded cabbage leaves filled with rice',
    productsList: ['Cabbage', 'Rice', 'Salt', 'Savory']
});
dinner.recipes({
    recipeName: 'Peppers filled with beans',
    productsList: ['Beans', 'Peppers', 'Salt']
});

dinner.inviteGuests('Ivan', 'Oshav');
dinner.inviteGuests('Petar', 'Folded cabbage leaves filled with rice');
dinner.inviteGuests('Georgi', 'Peppers filled with beans');

console.log(dinner.showAttendance());

