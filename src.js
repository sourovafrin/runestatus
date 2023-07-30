function getResult() {
  const txBox = document.querySelector('#txbox')
  const txId = txBox.value;
  const error = document.querySelector(".error");
  const stagesDiv = document.querySelector(".stages-div");
  const signersDiv = document.querySelector(".signers-div");
  if (txId) {
    error.innerHTML = "";
    stagesDiv.innerHTML = signersDiv.innerHTML = "";
    const stagesUri = 'https://thornode.ninerealms.com/thorchain/alpha/tx/stages/' + txId;
    const signersUri = `https://thornode.ninerealms.com/thorchain/tx/${txId}/signers`;
    
    const xhr = new XMLHttpRequest();
    xhr.open("GET", stagesUri);
    xhr.send();
    xhr.onload = function() {

      if (xhr.status === 200) {
        let data = JSON.parse(xhr.responseText);
        const ul = document.createElement("ul");
        for (const [key, value] of Object.entries(data)) {
          const li = document.createElement("li");
          li.textContent = `${key}: ${value.completed}`;
          ul.appendChild(li);
        };
        stagesDiv.appendChild(ul);
      } else {
        let ptag = document.createElement('p');
        ptag.textContent = 'Api error in Stages';
        error.appendChild(ptag);
      }
    };
    const xhrr = new XMLHttpRequest();
    xhrr.open("GET", signersUri);
    xhrr.send();
    xhrr.onload = function() {

      if (xhrr.status === 200) {
        let data = JSON.parse(xhrr.responseText);
        const p = document.createElement("p");
        for (const [key, value] of Object.entries(data)) {
          if  (key == 'error'){
            p.textContent = `Error: ${data['error']}`;
          }else{
            if (data['out_txs']){
            p.textContent = `Completed: ${Number(data['out_txs'][0]['coins'][0]['amount'] / 100000000)} ${data['out_txs'][0]['coins'][0]['asset']}`;
          }else{
            p.textContent = `Not yet complete`;
          }};
          signersDiv.appendChild(p);
        };
      } else {
        let ptagg = document.createElement('p');
        ptagg.textContent = 'Api error in signers';
        error.appendChild(ptagg);
      };
    };


  } else {
    error.innerHTML = "";
    let ptag = document.createElement('p');
    ptag.textContent = 'Please enter tx id';
    error.appendChild(ptag);
  };


};
