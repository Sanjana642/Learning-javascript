const input = document.getElementById("input");
const tasklist = document.getElementById("tasklist");
const btntask = document.getElementById("btntask");

btntask.addEventListener('click',addtask)

function addtask(){

   const li = document.createElement("li");
   if (input.value === ""){
    alert ("Please enter a task");
    tasklist.removeChild(li);
   } 
   li.innerHTML = input.value;
   tasklist.appendChild(li);

   input.value = '';
   
   //to delete button
   const deleteBtn = document.createElement('button');
   deleteBtn.textContent = "Delete";
   deleteBtn.style.backgroundColor = "red";
   deleteBtn.style.width = "20%";
   deleteBtn.addEventListener("click",(e)=>{
      e.stopPropagation();
      li.remove();
   });
   li.appendChild(deleteBtn);  //imp
   
}






