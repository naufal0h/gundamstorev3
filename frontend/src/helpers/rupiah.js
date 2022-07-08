
const intToRupiah = (amount) => {
    let stringAmount = String(amount).split("").reverse();
    let result = [];
    stringAmount.forEach((char,index)=> {
        if((index+1) % 3 == 0 && index !== stringAmount.length-1){
            result.push(`.${char}`);
        }else{
            result.push(char);
        }
    })
    result = result.reverse().join("");

    return result
}

export default intToRupiah;