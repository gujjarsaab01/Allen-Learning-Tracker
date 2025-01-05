let url = "https://dog.ceo/api/breeds/image/random";
const image = document.querySelector('#image')
const getFact = async () => {
    let  response = await fetch(url);
    console.log(response)
    let data = await response.json();
    image.src = data.message
}
getFact();