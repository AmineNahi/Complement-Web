class HistoryView {
    constructor(listValue) {
        this.listValue = listValue || [];
    }

    updateValues(listValue) {
        this.listValue = listValue;
    }

    displayValues() {
        if (this.listValue.length === 0) {
            return null;
        }

        const boxHistoryValue = document.getElementById("panel-historique");
        if (!boxHistoryValue) return;

        this.listValue.forEach(value => {
            const boxValue = document.createElement('div');
            boxValue.textContent = value;
            boxHistoryValue.appendChild(boxValue);
        });
    }
}