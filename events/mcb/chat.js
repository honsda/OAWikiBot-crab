const chalk = require('chalk')

module.exports = async (mcb) => {
    function countChar(str, letter) {
        var letter_Count = 0; 
        for (var position = 0; position < str.length; position++) {
            if (str.charAt(position) == letter) {letter_Count += 1;}
        }
        return letter_Count;
    }
    
    mcb.on('message', (m) => {
        const t = new Date();
        function dateAuto(d) {
            if (d.getHours().toString().length != 2 && d.getMinutes().toString().length != 2) return `0${d.getHours()}:0${d.getMinutes()}`
            else if (d.getMinutes().toString().length != 2) return `${d.getHours()}:0${d.getMinutes()}`
            else if (d.getHours().toString().length != 2) return `0${d.getHours()}:${d.getMinutes()}`
            else return `${d.getHours()}:${d.getMinutes()}`
        }
        if (m.toString().startsWith('Please stop spamming!'))  console.log(chalk`{bold.gray [${dateAuto(t)}]} {redBright ${m.toString()}}`)
        else if (!m.toString().startsWith('<')) console.log(chalk`{bold.gray [${dateAuto(t)}]} {yellow ${m.toString()}}`)
        else if (countChar(m.toString(), '>') == 2) {
            const arrowEnd = m.toString().lastIndexOf('>');
            const arrowBeg = m.toString().indexOf('>');
            const gArrMsg = m.toString().slice(arrowEnd);
            const uMsg = m.toString().slice(0, arrowBeg)
            console.log(chalk`{bold.gray [${dateAuto(t)}]} ${uMsg}> {greenBright ${gArrMsg}}`)
        } 
        else console.log(chalk`{bold.gray [${dateAuto(t)}]} ${m.toString()}`)
    });
}