const inquirer = require("inquirer");
const chalk = require("chalk");

function RandomNum() {
  return Math.floor(Math.random() * 20) + 1;
}

let resposta;

function App() {
  console.log(chalk.bgGreenBright.black("Bem Vindo Ao RandomGame!\n"));

  setTimeout(() => {
    inquirer
      .prompt([
        {
          type: "list",
          name: "action",
          message: chalk.bgBlue.black("Selecione uma opção:\n"),
          choices: ["Iniciar", "Sair"],
        },
      ])
      .then((answer) => {
        resposta = RandomNum();
        const action = answer["action"];

        if (action === "Iniciar") {
          Instrucao();

          setTimeout(() => {
            console.log(chalk.bgGray("Número Gerado:\n"));
          }, 10000);

          setTimeout(() => {
            Game();
          }, 12000);
        } else if (action === "Sair") {
          console.log(
            chalk.bgCyan.black("Obrigado Por Jogar o RandomGame, Até Logo!!!\n")
          );
        }
      });
  }, 2000);
}

function Instrucao() {
  setTimeout(() => {
    console.log(chalk.bgBlueBright.black("Instruções do game:\n"));
  }, 500);

  setTimeout(() => {
    console.log(
      chalk.bgBlueBright.black("É gerado um valor aletório de 1 a 20.\n")
    );
  }, 2000);

  setTimeout(() => {
    console.log(chalk.bgBlueBright.black("O jogador terá 4 tentativas.\n"));
  }, 4000);

  setTimeout(() => {
    console.log(
      chalk.bgBlueBright.black(
        "Há dicas se o número é maior ou menor que a resposta.\n"
      )
    );
  }, 6000);

  setTimeout(() => {
    console.log(
      chalk.bgBlueBright.black(
        "Só será aceito numeros como resposta, sendo zerado as tentativas com números apenas.\n"
      )
    );
  }, 8000);
}

async function Game() {
  let palpite;
  let tentativas = 4;

  do {
    let { valor } = await inquirer.prompt([
      {
        name: "valor",
        message: chalk.bgYellowBright.black("Digite seu Palpite:\n"),
      },
    ]);

    palpite = Number.parseInt(valor);

    if (palpite !== resposta && !isNaN(palpite)) {
      tentativas -= 1;
      console.log(chalk.bgRedBright("Resposta Errada!\n"));

      console.log(
        palpite > resposta
          ? chalk.bgWhiteBright("O valor é Menor...\n")
          : chalk.bgWhiteBright("O valor é Maior...\n")
      );
    } else if (palpite === resposta) {
      console.log(chalk.bgGreenBright.black("Parabens, você acertou!\n"));
      Restart();
      break;
    }

    if (isNaN(palpite)) {
      console.log(chalk.bgRed.black("Valor Inválido, digite um Número!\n"));
    }

    if (tentativas > 0 && !isNaN(palpite)) {
      console.log(chalk.bgRed.black(`Tentativas Restantes: ${tentativas}\n`));
    }

    if (tentativas < 1) {
      console.log(chalk.bgRed.black("Você perdeu!\n"));
      console.log(chalk.bgYellowBright.black(`A resposta é ${resposta}\n`));
      Restart();
      break;
    }
  } while (palpite !== resposta);
}

function Restart() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: chalk.bgBlue("O que você deseja Fazer?\n"),
        choices: ["Reiniciar", "Sair"],
      },
    ])
    .then((answer) => {
      const action = answer["action"];

      if (action === "Reiniciar") {
        resposta = RandomNum();

        setTimeout(() => {
          console.log(chalk.bgGray("Número Gerado:\n"));
        }, 2000);

        setTimeout(() => {
          Game();
        }, 4000);
      } else if (action === "Sair") {
        console.log(
          chalk.bgCyan.black("Obrigado Por Jogar o RandomGame, Até Logo!!!\n")
        );
      }
    });
}

App();