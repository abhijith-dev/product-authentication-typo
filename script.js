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
    console.log(data.codeResult.code);
    Quagga.stop();
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
if(typeof web3 !== 'undefined'){
    web3 = new Web3(web3.currentProvider);
}else {
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545")); 
}
var address="0x204D3c24E1c50e96D39ea67068CD76A587Ef7F74";
var abi=[
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_prodid",
				"type": "uint256"
			}
		],
		"name": "addDistributorDetails",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_rawid",
				"type": "uint256"
			}
		],
		"name": "addProducerDetails",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_pname",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_compid",
				"type": "string"
			}
		],
		"name": "addProduct",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_prodid",
				"type": "uint256"
			}
		],
		"name": "addRawDetails",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_distid",
				"type": "uint256"
			}
		],
		"name": "addRetailerDetails",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "companies",
		"outputs": [
			{
				"internalType": "string",
				"name": "cname",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "exist",
				"type": "uint256"
			},
			{
				"internalType": "bytes32",
				"name": "pass",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_pass",
				"type": "string"
			}
		],
		"name": "createCompany",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_pass",
				"type": "string"
			}
		],
		"name": "displayComp",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "distributors",
		"outputs": [
			{
				"internalType": "string",
				"name": "dname",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "produid",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "distid",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_rawid",
				"type": "uint256"
			}
		],
		"name": "getRaw",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "producers",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "rawid",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "pass",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "products",
		"outputs": [
			{
				"internalType": "string",
				"name": "pname",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			},
			{
				"internalType": "bytes32",
				"name": "compid",
				"type": "bytes32"
			},
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "rawdetails",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "pass",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "prodid",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "retailers",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "distributid",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "pass",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "auth",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "verificationPortal",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_pass",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_prodid",
				"type": "uint256"
			}
		],
		"name": "verifyDistributor",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_pass",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_rawid",
				"type": "uint256"
			}
		],
		"name": "verifyProd",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_pass",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "verifyRaw",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_pass",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_distid",
				"type": "uint256"
			}
		],
		"name": "verifyRetailer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]
contract=new web3.eth.Contract(abi,address);
contract.methods.verificationPortal(1115).call().then(function(bal){
    console.log(bal)
})
