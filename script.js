let btnImprimir = document.querySelector("#btn-imprimir");
btnImprimir.addEventListener("click", imprimir)
function imprimir(){
  window.print();
};

/////

const inputFile = document.querySelector("#picture__input");
const pictureImage = document.querySelector(".picture__img");
const pictureImageTxt = "Insira sua logo &#127753;"
pictureImage.innerHTML = pictureImageTxt;

inputFile.addEventListener("change", function(e){
  const inputTarget = e.target;
  const file = inputTarget.files[0];
  if(file){
      const reader = new FileReader();
      reader.addEventListener("load",function(e){
      const readerTarget = e.target;
      const img = document.createElement("img");
      img.src = readerTarget.result;
      img.classList.add("picture__img");
      pictureImage.innerHTML = '';
      pictureImage.appendChild(img);
      const romoveBorda = document.querySelector(".picture");
      romoveBorda.classList.add("removeBorda");
    });
    reader.readAsDataURL(file);
  }else{
    pictureImage.innerHTML = pictureImageTxt;
  }
});

/////
window.oninput = function () {
  document.querySelector("#no-d").value =
    document.querySelector("#destinatario-nome").value
}

////////
const selecionado = document.querySelector("#situacao-da-encomenda");
selecionado.addEventListener('click',function(){
const valor = selecionado.value 
const cartaoDiv = document.querySelector(".conteiner-inpt-valor-cartao");
const dinheiroDiv = document.querySelector(".conteiner-inpt-valor-dinheiro");
if (valor === "situ") {
  dinheiroDiv.classList.remove("add");
  cartaoDiv.classList.remove("add");
} else if (valor === "pago") {
  dinheiroDiv.classList.remove("add");
  cartaoDiv.classList.remove("add");
} else if (valor === "cartao") {
  dinheiroDiv.classList.remove("add");
  cartaoDiv.classList.add("add");
} else if (valor === "dinheiro") {
  cartaoDiv.classList.remove("add");
  dinheiroDiv.classList.add("add");
}
});
////////

function k(i) {
  var v = i.value.replace(/\D/g, "")
  v = (v / 100).toFixed(2) + ""
  v = v.replace(".", ",")
  v = v.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
  i.value = ` R$ ${v}`
}



function limpa_formulário_cep() {
            //Limpa valores do formulário de cep.
            document.getElementById('destinatario-endereco').value=("");
            document.getElementById('destinatario-bairro').value=("");
            document.getElementById("destinatario-cidade").value = ""
            document.getElementById("destinatario-estado").value = ""
            
    }

    function meu_callback(conteudo) {
        if (!("erro" in conteudo)) {
            //Atualiza os campos com os valores.
            document.getElementById('destinatario-endereco').value=(conteudo.logradouro);
            document.getElementById('destinatario-bairro').value=(conteudo.bairro);
            document.getElementById("destinatario-cidade").value =
              conteudo.localidade
            document.getElementById("destinatario-estado").value = conteudo.uf
           
        } //end if.
        else {
            //CEP não Encontrado.
            limpa_formulário_cep();
            alert("CEP não encontrado.");
        }
    }
        
    function pesquisacep(valor) {

        //Nova variável "cep" somente com dígitos.
        var cep = valor.replace(/\D/g, '');

        //Verifica se campo cep possui valor informado.
        if (cep != "") {

            //Expressão regular para validar o CEP.
            var validacep = /^[0-9]{8}$/;

            //Valida o formato do CEP.
            if(validacep.test(cep)) {

                //Preenche os campos com "..." enquanto consulta webservice.
                document.getElementById('destinatario-endereco').value="...";
                document.getElementById("destinatario-bairro").value = "..."
                document.getElementById("destinatario-cidade").value = "..."
                document.getElementById("destinatario-estado").value = "..."
                

                //Cria um elemento javascript.
                var script = document.createElement('script');

                //Sincroniza com o callback.
                script.src = 'https://viacep.com.br/ws/'+ cep + '/json/?callback=meu_callback';

                //Insere script no documento e carrega o conteúdo.
                document.body.appendChild(script);

            } //end if.
            else {
                //cep é inválido.
                limpa_formulário_cep();
                alert("Formato de CEP inválido.");
            }
        } //end if.
        else {
            //cep sem valor, limpa formulário.
            limpa_formulário_cep();
        }
    };








