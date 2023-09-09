#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";
const sleep = () => {
    return new Promise((res) => {
        setTimeout(res, 2000);
    });
};
async function welcome() {
    let welcomMessage = chalkAnimation.rainbow("Welcome to internet banking");
    await sleep();
    welcomMessage.stop;
    console.log(chalk.cyanBright(`
    ____ ____ ____ ___  ____ ____ _  _    ___  ____ _  _ _  _    _    ___ ___  
    |___ |__| |__/ |  \ |___ |___ |\ |    |__] |__| |\ | |_/     |     |  |  \ 
    |    |  | |  \ |__/ |___ |___ | \|    |__] |  | | \| | \_    |___  |  |__/ 
                                                                               `));
}
welcome();
const answers = await inquirer.prompt([
    {
        type: "input",
        name: "useraccount",
        message: "Enter your Account No: "
    },
    {
        type: "number",
        name: "userpass",
        message: "Enter your PASSCODE: "
    },
    {
        type: "list",
        name: "accountType",
        choices: ["Current Account", "Saving Account"],
        message: (chalk.cyan("Select your account type:")),
    },
    {
        type: "list",
        name: "transactionType",
        choices: ["Fast Cash", "Withdraw"],
        message: (chalk.greenBright("Select your transaction")),
        when(answers) {
            return answers.accountType;
        },
    },
    {
        type: "list",
        name: "amount",
        choices: [1000, 2000, 10000, 20000],
        message: (chalk.yellowBright("Select your amount")),
        when(answers) {
            return answers.transactionType == "Fast Cash";
        },
    },
    {
        type: "number",
        name: "amount",
        message: (chalk.magentaBright("Enter your amount")),
        when(answers) {
            return answers.transactionType == "Withdraw";
        },
    }
]);
if (answers.useraccount && answers.userpass) {
    const balance = Math.floor(Math.random() * 1000000);
    console.log(balance);
    const EnteredAmount = answers.amount;
    if (balance >= EnteredAmount) {
        const remaining = balance - EnteredAmount;
        console.log(chalk.greenBright(`Your remaining balance is, ${remaining}`));
    }
    else {
        console.log(chalk.redBright("Insuficient Balance"));
    }
}
