const container=document.querySelector('.container')
const seats=document.querySelectorAll('.row .seat:not(.occupied');
const movie=document.getElementById('movie')
const count=document.getElementById('count')
const total=document.getElementById('total')

populate();
let price=movie.value;

function setmoviedata(movieindex,price){
  localStorage.setItem('selectedmovieindex',movieindex);
  localStorage.setItem('selectedmovieprice',price);
}


function updatecount(){                                                        //updating and claculating the count of seats 
  const selectedseats=document.querySelectorAll('.row .seat.selected')

  const seatsindex=[...selectedseats].map(function(seat){
     return [...seats].indexOf(seat)
  })

  localStorage.setItem('selectedseats',JSON.stringify(seatsindex));

  const seatcount=selectedseats.length;

  count.innerText=seatcount;
  total.innerText=seatcount*price;
}

function populate(){
  const selectedseats=JSON.parse(localStorage.getItem('selectedseats'));
  if(selectedseats!==null && selectedseats.length>0){
    seats.forEach((seat,index)=>{
      if(selectedseats.indexOf(index)>-1){
        seat.classList.add('selected');
      }
    })
  }
  const selectedmovieindex=localStorage.getItem('selectedmovieindex');
  if(selectedmovieindex!==null){
    movie.selectedIndex=selectedmovieindex;
  }
}

//Movie select event
movie.addEventListener('change',(e)=>{
   price=e.target.value;
   setmoviedata(e.target.selectedIndex,e.target.value);
   updatecount();

})
//seat click event
container.addEventListener('click',(e)=>{
  if(e.target.classList.contains('seat') &&!e.target.classList.contains('occupied'))
  {
    e.target.classList.toggle('selected')
  }

  updatecount();
})
updatecount();