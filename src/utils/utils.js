export default {
    formateDate(date){
        console.log('%%%%%%%%%%%%%',date)
        if(date){
            return date.getFullYear()+ '-' + (date.getMonth()+1 )+ '-'+ date.getDate()  +' ' +
                date.getHours() + ':'+date.getMinutes() + ":"+ date.getSeconds()
        }
    }
}