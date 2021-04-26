let image = document.getElementById('targetImg'); 
let currentIMG = '00';
let filters = {"blur": "blur(0px)", "invert": "invert(0%)", "sepia": "sepia(0%)", "saturate": "saturate(100%)", "hue-rotate": "hue-rotate(0deg)"};
let path = "https://raw.githubusercontent.com/AleksandrKalinin/photo-filter/gh-pages/assets/img/img.jpg";
  
document.getElementById('screenToggle').addEventListener('click', function(){
  if (document.fullscreenElement || document.webkitFullscreenElement) {
    document.exitFullscreen();
  }
  else{
    document.getElementById('body').requestFullscreen();
  }     
});

document.getElementById('btnInput').addEventListener('change', function(e){
  let file = e.target.files[0];
  let reader = new FileReader();

  reader.readAsDataURL(file);

  reader.onload = function() {
    image.src = reader.result;
    image.style.filter = `${Object.values(filters).join(' ')}`;
  };

  reader.onerror = function() {
    console.log(reader.error);
  };      
});

document.getElementById('blur').addEventListener('input', (e) =>{
	document.getElementById('blurValue').innerText = e.target.value;
	filters["blur"] = `blur(${e.target.value}px)`;
  image.style.filter = `${Object.values(filters).join(' ')}`;
});

document.getElementById('invert').addEventListener('input', (e) => {
	document.getElementById('invertValue').innerText = e.target.value;
	filters["invert"] = `invert(${e.target.value}%)`;
  image.style.filter = `${Object.values(filters).join(' ')}`;
});

document.getElementById('sepia').addEventListener('input', (e) => {  		
	document.getElementById('sepiaValue').innerText = e.target.value;
	filters["sepia"] = `sepia(${e.target.value}%)`;
  image.style.filter = `${Object.values(filters).join(' ')}`;
});

document.getElementById('saturate').addEventListener('input', (e) => {
	document.getElementById('saturateValue').innerText = e.target.value;
	filters["saturate"] = `saturate(${e.target.value}%)`;
  image.style.filter = `${Object.values(filters).join(' ')}`;
});  	  	  	

document.getElementById('hue').addEventListener('input', (e) => {
	document.getElementById('hueValue').innerText = e.target.value;
	filters["hue-rotate"] = `hue-rotate(${e.target.value}deg)`;
  image.style.filter = `${Object.values(filters).join(' ')}`;
});

document.getElementById('reset').addEventListener('click', (e) => {
  document.getElementById('blurValue').innerText = 0;
  document.getElementById('invertValue').innerText = 0;
  document.getElementById('sepiaValue').innerText = 0;
  document.getElementById('saturateValue').innerText = 100;
  document.getElementById('hueValue').innerText = 0;
  document.getElementById('blur').value = 0;
  document.getElementById('invert').value = 0;
  document.getElementById('sepia').value = 0;
  document.getElementById('saturate').value = 100;
  document.getElementById('hue').value = 0;      
  filters["blur"] = `blur(${0}px)`;   
  filters["invert"] = `invert(${0}%)`;    
  filters["sepia"] = `sepia(${0}%)`;   
  filters["saturate"] = `saturate(${100}%)`;    
  filters["hue-rotate"] = `hue-rotate(${0}deg)`;
  image.style.filter = `${Object.values(filters).join(' ')}`;
})

document.getElementById('next').addEventListener('click', (e) => {
  let currentDate = new Date();
  let hours = currentDate.getHours();
  let minutes = currentDate.getMinutes();
  let seconds = currentDate.getSeconds();
  let time = hours * 3600 + minutes * 60 + seconds;
  let daytime;
  if (time >= 21600 && time < 43200) {
    daytime ='morning';
  }
  else if(time >= 43200 && time < 64800){
    daytime ='day';
  }
  else if (time >= 64800 && time < 86399) {
    daytime ='evening';
  }
  else {
    daytime ='night';
  }  

  if (currentIMG < 20) {
    currentIMG = (Number(currentIMG));
    currentIMG++;
    currentIMG = ('0' + currentIMG).slice(-2);
  }
  else {
    currentIMG = '01';
  }
  path = `https://raw.githubusercontent.com/AleksandrKalinin/photo-filter/gh-pages/assets/img/${daytime}/${currentIMG}.jpg`;
  image.setAttribute('src', path);
  image.style.filter = `${Object.values(filters).join(' ')}`;  
})

document.getElementById('saveBtn').addEventListener('click', function(e){
	var myCanvas = document.createElement('canvas');
	myCanvas.setAttribute('id', "myCanvas");
	body.appendChild(myCanvas);
    var canvas = document.getElementById("myCanvas");
    var ctx = myCanvas.getContext ? myCanvas.getContext('2d') : null; 
    const img = new Image();
    img.setAttribute('crossOrigin', 'anonymous');
    img.src = path;
    img.onload = function () { 
    	canvas.width = img.width;
    	canvas.height = img.height;
    	ctx.filter = `${Object.values(filters).join(' ')}`;
        ctx.drawImage(img, 0, 0);
        var btn = document.createElement('a');
        btn.download = 'image.jpg';
        btn.href = canvas.toDataURL();
        btn.click();
        btn.delete;
        document.getElementById("myCanvas").outerHTML = "";
    }
})