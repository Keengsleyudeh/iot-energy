export function thousandSeperator(input){
    let brokenPrice = (input.split('')).reverse();
    let finalPriceArray = [];
    let count = 0;

    brokenPrice.forEach(number => {
        count++;
        finalPriceArray.push(number);

        if(((count % 3) == 0) && count != 0 && count != brokenPrice.length){
            finalPriceArray.push(',');
        }
    });

    return finalPriceArray.reverse().join('');  
}