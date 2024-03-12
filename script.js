const form=document.querySelector('form')
const resultDiv=document.querySelector('.result')

form.addEventListener('submit',(e)=>{
     e.preventDefault();
    //  accessing input element of form
     getWordInfo(form.elements[0].value);
});

async function getWordInfo(word){
    try{
        resultDiv.innerHTML="Fetching Data..."
    const response=await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
const data=await response.json(); 

resultDiv.innerHTML=`
<h2><strong>Word : </strong>${data[0].word}</h2>
<p class="speech">${data[0].meanings[0].partOfSpeech}</p>
<p><strong>Meaning : </strong>${data[0].meanings[0].definitions[0].definition===undefined?"Not found":data[0].meanings[0].definitions[0].definition}</p>
<p><strong>Phonetics : </strong>${data[0].phonetics[0].text===undefined?"Not found":data[0].phonetics[0].text}</p>
<p><strong>Example : </strong>${data[0].meanings[0].definitions[0].example===undefined?"Not found":data[0].meanings[0].definitions[0].example}</p>
`
resultDiv.innerHTML+=`<p><strong>Synonyms : </strong></p>`
if(data[0].meanings[0].synonyms.length===0){
    resultDiv.innerHTML+=`<div>Not found</div>`
}
for(let i=0;i<data[0].meanings[0].synonyms.length;i++){
    resultDiv.innerHTML+=`<li>${data[0].meanings[0].synonyms[i]}</li>`
}
resultDiv.innerHTML+=`<p><strong>Antonyms : </strong></p>`
if(data[0].meanings[0].antonyms.length===0){
    resultDiv.innerHTML+=`<div>Not found</div>`
}
for(let i=0;i<data[0].meanings[0].antonyms.length;i++){
    resultDiv.innerHTML+=`<li>${data[0].meanings[0].antonyms[i]}</li>`
}
resultDiv.innerHTML+=`<button><a href="${data[0].sourceUrls}" target="_blank">Read More</a></button>`
    }
    catch{
        resultDiv.innerHTML=`<p> Sorry , The word could not be found! </p>`
    }

console.log(data);
}
