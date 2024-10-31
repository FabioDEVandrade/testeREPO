function checkType(positionSlice) {
  if (
    positionSlice !== ".png" &&
    positionSlice !== ".jpg" &&
    positionSlice !== ".gif" &&
    positionSlice !== ".jpeg"
  ) {
    throw new Error(
      `Formato "${positionSlice}" Inválido.\nEscolha um arquivo de imagem!`
    );
  }
}

function checkSize(fileSizeInMB) {
  if (fileSizeInMB > 5) {
    throw new Error("Tamanho do arquivo não suportado!");
  }
}

document.querySelector("#ImageSelect").addEventListener("change", (e) => {
  try {
const file = e.target.files[0];

    if (!file) {
      throw new Error("Nenhuma Imagem selecionada!");
    }


let reader = new FileReader();
const fileName = file.name;

let position = fileName.lastIndexOf("."); //Encontra a posição do último ponto.
let positionSlice = fileName.slice(position); //Usado para extrair a extensão do arquivo
    

    checkType(positionSlice);


const fileSizeInMB = (file.size / (1024 * 1024)).toFixed(2);
    checkSize(fileSizeInMB);

    reader.onload = (event) => {
      let displayImage = document.querySelector("#displayImage");
      displayImage.style.display = "block";
      displayImage.src = event.target.result;

        const downloadLink = document.querySelector("#uploadIMG");
        downloadLink.style.display = "inline";
        downloadLink.href = event.target.result;
        downloadLink.download = file.name;
    };

    reader.readAsDataURL(file);
  } catch (error) {
    alert(error.message);
  }
});