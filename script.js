//ES6
window.onload=function(){
    $('.camera-div').hide();
    $('.spinner').hide();
}

var toTop = document.getElementById("goto-top");
  
  toTop.addEventListener("click", function(){
  scrollToTop(1500);
});
function scrollToTop(scrollDuration) {
    var scrollStep = -window.scrollY / (scrollDuration / 15),
        scrollInterval = setInterval(function(){
        if ( window.scrollY != 0 ) {
            window.scrollBy( 0, scrollStep );
        }
        else clearInterval(scrollInterval); 
    },15);
}
function barcode(){
    $('.button-div').hide();
    $('.camera-div').show();
    setTimeout(() => {
        $('.camera-div').hide();
        $('.spinner').show();
    }, 5000);
}
Quagga.init({
    inputStream : {
      name : "Live",
      type : "LiveStream",
      target: document.querySelector('#camera')    // Or '#yourElement' (optional)
	},
	debug: {
		drawBoundingBox: true,
		showFrequency: true,
		drawScanline: true,
		showPattern: true
	},
    decoder : {
      readers : ["code_128_reader"]
    }
  }, function(err) {
      if (err) {
          console.log(err);
          return
      }
      console.log("Initialization finished. Ready to start");
      Quagga.start();
  });
   Quagga.onDetected(function(data){
	//verifaction port blockchain....
	var p_id=data.codeResult.code;
	var xhr=new XMLHttpRequest();
	xhr.open('GET',`http://127.0.0.1:3000/user_portal/${p_id}`)
	xhr.onload=function(res){
      var result=JSON.parse(res.currentTarget.responseText)
	}
	xhr.send();
   });

  function about_us() {
    $('html,body').animate({
        scrollTop: $("#about-us").offset().top
    },'slow');
}


//requests
async function search(){
    let search_key=document.getElementById('search-key').value;
    var xhr= new XMLHttpRequest()
    xhr.open('GET',`http://127.0.0.1:3000/search/${search_key}`)
    xhr.onload=(res)=>{
        console.log(res.currentTarget.responseText)
    }
   xhr.send();
}
//ajax request for new updates
var update= new XMLHttpRequest()
var companies;
var flag=0;
var length=0
var timer=setInterval(async () => {

   await update.open('GET',`http://127.0.0.1:3000/`)
    update.onload=(res)=>{
    companies=JSON.parse(res.currentTarget.responseText);
    if(companies.length>length)
    {
        $('#dropdown li').remove();
        
        flag=0;
    }
    if(flag==0){
        length=companies.length;
        set(companies)
    }
    }   
    update.send();  
      
},2000);
function set(x){
    for(let i of x)
    {
        $('#dropdown').append(`<li ><a href="${i}" >${i}</a></li>`)
    }
    return flag=1;  
}
//AETHENTICATION WITH BLOCKCHAIN
