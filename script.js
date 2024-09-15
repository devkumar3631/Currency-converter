const base_URL=" https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

let dropdown=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("#change");
const msg=document.querySelector("#convert");
let from=document.querySelector(".from select");
let to=document.querySelector(".to select");

const updateexchangerate=async ()=>{
    let amount=document.querySelector(".amount input");
    let amntval=amount.value;
    
    // console.log(amntval);
    
    console.log(from.value,to.value);

    if(amntval==="" || amntval<1)
    {
        amntval=1;
        amount.value="1";
    }

   const URL = `${base_URL}/${from.value.toLowerCase()}.json`;
   let response = await fetch(URL);
   let data = await response.json();
   let val=data[from.value.toLowerCase()][to.value.toLowerCase()];
   
   console.log(val,amntval);

   let amountval=amntval*val;
    
   msg.innerText = `${amntval} ${from.value} = ${amountval} ${to.value}`;

    console.log(amountval);
}

for(let select of dropdown)
{
    for(code in countryList)
    {
        let option=document.createElement("option");
        option.innerText=code;
        option.value=code;
        
        if(select.name=="from" && code=="USD")
        {
            option.selected="selected";
        }
        else if(select.name=="to" && code=="INR")
        {
            option.selected="selected";
        }

        select.append(option);
    }
    select.addEventListener("change",(evt)=>{
        update_flag(evt.target);
    })
}

const update_flag=(target)=>{
    let curr_code=target.value; 
    let con_code=countryList[curr_code];
    let new_link=`https://flagsapi.com/${con_code}/flat/64.png`;
    
    let img=target.parentElement.querySelector("img");
    img.src=new_link;
    //console.log(con_code);
}

btn.addEventListener("click",(event)=>{
    event.preventDefault();
    updateexchangerate();
})

window.addEventListener("load",()=>{
    updateexchangerate();
})

