const nummer = document.querySelectorAll('[data-nummer]')
const rekener = document.querySelectorAll('.reken')
const gelijk = document.getElementById('gelijk')
const del = document.getElementsByClassName('delete')
const previous_operander = document.getElementById('previous_operand')
const current_operander = document.getElementById('current_operand')
const clear = document.getElementById('clear')




class reken {
    constructor(previous_operand, current_operand) {
        this.previous_operander = previous_operand
        this.current_operander = current_operand
        this.clear()
    }
    clear() {
        this.current_operand = ''
        this.previous_operand = ''
        this.rekener = ' '

    }

    delete() {
        this.current_operand = this.current_operand.toString().slice(0, -1)


    }
    addnum(num) {
        if (num == '.' && this.current_operand.includes('.')) { return }
        this.current_operand = this.current_operand.toString() + num.toString()

    }
    rekenen(welke) {
        if (this.current_operand == '') { return }
        if (this.previous_operand != '') {
            this.caluclate()
        }
        this.rekener = welke
        this.previous_operand = this.current_operand
        this.current_operand = ''

    }

    caluclate() {
        var calulator
        var previous = parseFloat(this.previous_operand)
        var current = parseFloat(this.current_operand)
        if (isNaN(current) || isNaN(previous)) { return }
        switch (this.rekener) {
            case "+":
                calulator = previous + current
                break
            case "-":
                calulator = previous - current
                break
            case "*":
                calulator = previous * current
                break
            case "÷":
                calulator = previous / current
                break
            default:
                return


        }
        this.current_operand = calulator
        this.rekener = ''
        this.previous_operand = ''


    }
    getdisplaynumber(number) {
        const stringnum = number.toString()
        const intgdigit = parseFloat(stringnum.split('.')[0])
        const decdigit = stringnum.split('.')[1]
        let intdisplay
        if (isNaN(intgdigit)) {
            intdisplay = ''
        } else {
            intdisplay = intgdigit.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decdigit != null) { return '' + intdisplay + "." + decdigit + '' } else { return intdisplay }



    }




    show() {
        this.current_operander.innerText = this.getdisplaynumber(this.current_operand)
        if (this.rekenen != null) {
            this.previous_operander.innerText = " " + this.getdisplaynumber(this.previous_operand) + " " + this.rekener + " "
        } else {
            this.previous_operander.innerText = " "

        }


    }
}



const calc = new reken(previous_operander, current_operander)
nummer.forEach(button => {
    button.addEventListener('click', () => {
        calc.addnum(button.innerText)
        calc.show()
    })
})

console.log(nummer)

rekener.forEach(button => {
    button.addEventListener('click', () => {
        calc.rekenen(button.innerText)
        calc.show()
    })
})

console.log(rekener)

gelijk.addEventListener('click', button => {
    calc.caluclate()
    calc.show()

})

clear.addEventListener('click', button => {
    calc.clear()
    calc.show()

})

del[0].addEventListener('click', button => {
    calc.delete()
    calc.show()

})