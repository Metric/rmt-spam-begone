const FREGEX = /g\s*[o0]\s*[li!]\s*d|\n|\r|<\s*b\s*r\s*>|<\s*b\s*r\s*\/\s*>|<\s*\/\s*b\s*r\s*>|p\s*o?\s*w\s*e?\s*r\s*l\s*e?\s*v\s*e?\s*l\s*([il!]\s*n\s*g)?|(c|\()\s*h\s*e\s*a\s*p\s*(e\s*s\s*t)?|m\s*m\s*[o0]|\$|u\s*[$s]\s*d|s\s*e\s*[il!]\s*[il!]?|d\s*e\s*[il!]\s*[li!]\s*v\s*e\s*r\s*y?|(3\s*(w|\\+\s*\/+\s*\\+\s*\/+|(v\s*v)+)|(w|\\+\s*\/+\s*\\+\s*\/+)\s*(w|\\+\s*\/+\s*\\+\s*\/+)\s*(w|\\+\s*\/\s*\\+\s*\/+)|(v\s*v)+)?\s*(\.|,)?\s*\w*\s*(\.|,)\s*((c|\()\s*(_?\s*\[?\s*[o0]\s*\]?\s*_?)\s*(m|\|?\s*\\\s*\/\s*\|)|(_?\s*\[?\s*[0o]\s*\]?\s*_?)\s*g\s*g|\s*r\s*u|\s*r\s*g|c\s*h|t\s*w|i\s*o|)+/gim;
const MLIST = ['usd','meseta', 'gold', 'silver', 'kinah', 'dollar', 'cash', 'bitcoin', 'crypto', 'currency', 'poke', 'items', 'copper', 'yen', 'gil', 'simoleon', 'rupee', 'cap', 'coin', 'munny', 'zeni', 'bell', 'mark', 'token', 'influence', 'credit', 'ducat', 'thaler', 'farthing', 'kredit', 'aurum', 'ncr', 'penya', 'emerald', 'sign', 'orb', 'gem', 'adena', 'meso', 'zenny', 'zulie', 'septim', 'crystal', 'crystals', 'empherium', 'empheratite'];

const CCREGEX = /\s*\d{1,}\s*\$?|\d{1,}\s*[ocd\!\|ilzehaysbgtjx0-1 ]{1,}\s*\$?|[ocd\!\|ilzehaysbgtjx0-1 ]{1,}\s*\d{1,}\s*\$?\s*([mMtTkKbBgkcpyrzifao$]{1,}|\s*b\s*t\s*c|m\s*k|i\s*n\s*f|f\s*a\s*r|k\s*r\s*e\s*d|c\s*r\s*e\s*d|a\s*u\s*r|z\s*u\s*l|s\s*e\s*p|c\s*r\s*y\s*s|e\s*m\s*p|u\s*s\s*d){1,}\s*\=?\s*(\d+\s*\.?\d*)?\s*\$?\s*(u\s*[$s]\s*d|\s*u[$s]|\s*d[\s*o0]\s*[l!|1]\s*[!l|1]\s*a\s*r)?/gim;
const CODEREGEX = /\s*((u\s*[$s]\s*[e3])?\s*(\d*|\w*)?\s*([ck]\s*[o0]\s*u\s*p\s*[o0]\s*n)?\s*(\d*|\w*)?\s*([ck]\s*[o0]\s*d\s*[3e]\w?))?\s*(:|;|\|)?\s*('|"|:|;|\[|\]|,|\.)?\s*\w{1,}\s*('|"|:|;|\[|\]|,|\.)?\s*(\w*|\d{1,})\s*((\.|,|>|<|\-){2,}\s*(\[|\(|\{)?\s*\w{1,})|[\*-=+\.`~'",\?\/\\\<\>]{2,}\s*(\.|!|,|\]|\?|\}|\))?$/gim;

const MLMAP = {
    'e': '3',
    'o': '0',
    'i': '1|!l',
    'l': '1|!i',
    'a': '@',
    '1': '!li|',
    'v': '\\\\/',
    'm': '/\\\\',
};

const SREGEX = /\s{2,}/gim;
/*const MCONTAINER = '\s*[{0}{1}]';

let MREGEX: string | RegExp = '';
let MSEP = '';

MLIST.forEach(m => {
    let item = '';
    for (let i = 0; i < m.length; ++i) {
        const c = m[i];
        const cu = c.toUpperCase();
        const cl = c.toLowerCase();
        item += MCONTAINER.replace(/\{0\}/gim, cu).replace(/\{1\}/gim, cl + (MLMAP[cl] || ''));
    }
    MREGEX += MSEP + item;
    MSEP = '|';
});

//console.log(MREGEX);*/

const clamp = (v: number, min: number, max: number) => {
    if (v < min) return min;
    else if(v > max) return max;
    return v;
};

//this is the prebuild of the above forEach loop of mlist
const MREGEX = /\s*[Uu]\s*[Ss]\s*[Dd]|\s*[Mm/\\]\s*[Ee3]\s*[Ss]\s*[Ee3]\s*[Tt]\s*[Aa@]|\s*[Gg]\s*[Oo0]\s*[Ll1|!i]\s*[Dd]|\s*[Ss]\s*[Ii1|!l]\s*[Ll1|!i]\s*[Vv\\/]\s*[Ee3]\s*[Rr]|\s*[Kk]\s*[Ii1|!l]\s*[Nn]\s*[Aa@]\s*[Hh]|\s*[Dd]\s*[Oo0]\s*[Ll1|!i]\s*[Ll1|!i]\s*[Aa@]\s*[Rr]|\s*[Cc]\s*[Aa@]\s*[Ss]\s*[Hh]|\s*[Bb]\s*[Ii1|!l]\s*[Tt]\s*[Cc]\s*[Oo0]\s*[Ii1|!l]\s*[Nn]|\s*[Cc]\s*[Rr]\s*[Yy]\s*[Pp]\s*[Tt]\s*[Oo0]|\s*[Cc]\s*[Uu]\s*[Rr]\s*[Rr]\s*[Ee3]\s*[Nn]\s*[Cc]\s*[Yy]|\s*[Pp]\s*[Oo0]\s*[Kk]\s*[Ee3]|\s*[Ii1|!l]\s*[Tt]\s*[Ee3]\s*[Mm/\\]\s*[Ss]|\s*[Cc]\s*[Oo0]\s*[Pp]\s*[Pp]\s*[Ee3]\s*[Rr]|\s*[Yy]\s*[Ee3]\s*[Nn]|\s*[Gg]\s*[Ii1|!l]\s*[Ll1|!i]|\s*[Ss]\s*[Ii1|!l]\s*[Mm/\\]\s*[Oo0]\s*[Ll1|!i]\s*[Ee3]\s*[Oo0]\s*[Nn]|\s*[Rr]\s*[Uu]\s*[Pp]\s*[Ee3]\s*[Ee3]|\s*[Cc]\s*[Aa@]\s*[Pp]|\s*[Cc]\s*[Oo0]\s*[Ii1|!l]\s*[Nn]|\s*[Mm/\\]\s*[Uu]\s*[Nn]\s*[Nn]\s*[Yy]|\s*[Zz]\s*[Ee3]\s*[Nn]\s*[Ii1|!l]|\s*[Bb]\s*[Ee3]\s*[Ll1|!i]\s*[Ll1|!i]|\s*[Mm/\\]\s*[Aa@]\s*[Rr]\s*[Kk]|\s*[Tt]\s*[Oo0]\s*[Kk]\s*[Ee3]\s*[Nn]|\s*[Ii1|!l]\s*[Nn]\s*[Ff]\s*[Ll1|!i]\s*[Uu]\s*[Ee3]\s*[Nn]\s*[Cc]\s*[Ee3]|\s*[Cc]\s*[Rr]\s*[Ee3]\s*[Dd]\s*[Ii1|!l]\s*[Tt]|\s*[Dd]\s*[Uu]\s*[Cc]\s*[Aa@]\s*[Tt]|\s*[Tt]\s*[Hh]\s*[Aa@]\s*[Ll1|!i]\s*[Ee3]\s*[Rr]|\s*[Ff]\s*[Aa@]\s*[Rr]\s*[Tt]\s*[Hh]\s*[Ii1|!l]\s*[Nn]\s*[Gg]|\s*[Kk]\s*[Rr]\s*[Ee3]\s*[Dd]\s*[Ii1|!l]\s*[Tt]|\s*[Aa@]\s*[Uu]\s*[Rr]\s*[Uu]\s*[Mm/\\]|\s*[Nn]\s*[Cc]\s*[Rr]|\s*[Pp]\s*[Ee3]\s*[Nn]\s*[Yy]\s*[Aa@]|\s*[Ee3]\s*[Mm/\\]\s*[Ee3]\s*[Rr]\s*[Aa@]\s*[Ll1|!i]\s*[Dd]|\s*[Ss]\s*[Ii1|!l]\s*[Gg]\s*[Nn]|\s*[Oo0]\s*[Rr]\s*[Bb]|\s*[Gg]\s*[Ee3]\s*[Mm/\\]|\s*[Aa@]\s*[Dd]\s*[Ee3]\s*[Nn]\s*[Aa@]|\s*[Mm/\\]\s*[Ee3]\s*[Ss]\s*[Oo0]|\s*[Zz]\s*[Ee3]\s*[Nn]\s*[Nn]\s*[Yy]|\s*[Zz]\s*[Uu]\s*[Ll1|!i]\s*[Ii1|!l]\s*[Ee3]|\s*[Ss]\s*[Ee3]\s*[Pp]\s*[Tt]\s*[Ii1|!l]\s*[Mm/\\]|\s*[Cc]\s*[Rr]\s*[Yy]\s*[Ss]\s*[Tt]\s*[Aa@]\s*[Ll1|!i]|\s*[Cc]\s*[Rr]\s*[Yy]\s*[Ss]\s*[Tt]\s*[Aa@]\s*[Ll1|!i]\s*[Ss]|\s*[Ee3]\s*[Mm/\\]\s*[Pp]\s*[Hh]\s*[Ee3]\s*[Rr]\s*[Ii1|!l]\s*[Uu]\s*[Mm/\\]|\s*[Ee3]\s*[Mm/\\]\s*[Pp]\s*[Hh]\s*[Ee3]\s*[Rr]\s*[Aa@]\s*[Tt]\s*[Ii1|!l]\s*[Tt]\s*[Ee3]/gim;

class ChatFilter {
    maxWeight: number;

    constructor() {
        this.maxWeight = 12;
    }

    protected removeMaxWeight() {
        --this.maxWeight;
        this.maxWeight = clamp(this.maxWeight, 5, 20);
    }

    protected addMaxWeight() {
        ++this.maxWeight;
        this.maxWeight = clamp(this.maxWeight, 5, 20);
    }

    isSpam(msg: string): boolean {
        const tabLinesEtc = msg.split(/\t|\n|\r/gim);

        if (tabLinesEtc && tabLinesEtc.length > 1) {
            console.log("this is a spam message");
            return true;
        }

        const fpoints = msg.match(FREGEX);
        const spoints = msg.match(SREGEX);
        const mpoints = msg.match(MREGEX);
        const ccpoints = msg.match(CCREGEX);
        const codepoint = CODEREGEX.test(msg);

        let totalBadWeight = fpoints ? fpoints.length * 4 : 0;
        ///console.log('bad weight after fpoints: ' + totalBadWeight);

        if (totalBadWeight >= this.maxWeight) {
            console.log("this is a spam message from fpoints");
            this.removeMaxWeight();
            return true;
        }

        totalBadWeight += spoints ? spoints.length * 4 : 0;
        //console.log('bad weight after space points: ' + totalBadWeight);

        if (totalBadWeight >= this.maxWeight) {
              console.log("this is a spam message from space points");
            this.removeMaxWeight();
            return true;
        }

        totalBadWeight += mpoints ? mpoints.length : 0;
        //console.log('bad weight after mpoints: ' + totalBadWeight);

        if (totalBadWeight >= this.maxWeight) {
            console.log("this is a spam message from mpoints");
            this.removeMaxWeight();
            return true;
        }

        totalBadWeight += ccpoints ? ccpoints.length : 0;
        //console.log('bad weight after ccpoints: ' + totalBadWeight);

        if (totalBadWeight >= this.maxWeight) {
            console.log("this is a spam message from ccpoints");
            this.removeMaxWeight();
            return true;
        }

        totalBadWeight += codepoint ?  20 : 0;
        //console.log('bad weight after codepoint: ' + totalBadWeight);

        if (totalBadWeight >= this.maxWeight) {
            console.log("this is a spam message from codepoint");
            this.removeMaxWeight();
            return true;
        }

        //console.log("weight after all: " + totalBadWeight);

        this.addMaxWeight();
        return false;
    }
}

/* Testing Suite Area */
/*
let chatfilter = new ChatFilter();

const spamCheckOne = chatfilter.isSpam("yo I will offer over 3000g for your mount");
const spamCheckTwo = chatfilter.isSpam("on AH now! mount of specialness for 10,000g or best offer in tell");
chatfilter = new ChatFilter(); //reset to ensure good detection
const spamCheckThree = chatfilter.isSpam("G0LD AND 1TEMS TRADE: MM 0 EXP. C 'OM' 1OOOG=0.5 USD USE CODE: ARK GET 5 OFF .. TZF")
chatfilter = new ChatFilter(); //reset to ensure good detection
const spamCheckFour = chatfilter.isSpam("fuck you bob! Why did you take my loot!!!");
const spamCheckFive = chatfilter.isSpam("Hi would you like to join my guild. We offer 100g bonus for sign up");
const spamCheckSix = chatfilter.isSpam("Join our guild and get a weekly pay of 10M silver");
chatfilter = new ChatFilter(); //reset to ensure good detection
const spamCheckSeven = chatfilter.isSpam("Gold and items trade: vvwv A O E A I-I com 1000g=0.5$ Coupon Code: XO vvwvv AOEAI-I com *<I-I = >*-cHx");
chatfilter = new ChatFilter(); //reset to ensure good detection
const spamCheckEight = chatfilter.isSpam("Join the discord at https://discord.gg/xYwidl");

console.log("isSpam One: " + spamCheckOne); //expected: false
console.log("isSpam Two: " + spamCheckTwo); //expected: false
console.log("isSpam Three: " + spamCheckThree); //expected: true
console.log("isSpam Four: " + spamCheckFour); //expected: false
console.log("isSpam Five: " + spamCheckFive); //expected: false
console.log("isSpam Six: " + spamCheckSix); //expected: false
console.log("isSpam Seven: " + spamCheckSeven); //expected: true
console.log("isSpam Eight: " + spamCheckEight); //expected: false 
 */
