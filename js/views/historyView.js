class HistoryView
{
    constructor(listValue){
        this.listValue = listValue;
    }

    updateValues(listValue){
        this.listValue = listValue
    }

    displayValues(){
        console.log(this.listValue)
        if (this.listValue.length()=0){
            return none
        }
        const boxHistoryValue = document.getElementById("panel-historique")
        this.listValue.array.forEach(value => {
            const boxValue = document.createElement('div')
            boxValue.textContent = value
            boxHistoryValue.appendChild(boxValue)
        });
    }
}