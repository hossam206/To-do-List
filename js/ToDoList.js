//get all variable
let dayname = document.querySelector('.container h1');
let AddBtn = document.querySelector('.new-task-form i');
let inputField = document.getElementById('new-task-input');
let iconNoTask = document.querySelector('.fa-ban');
let pargaphNotas = document.querySelector('.new-task-form p')
let checkBox   = document.querySelectorAll('.taskContent input');  
let DeleteIcon = document.querySelectorAll('.fa-times')
let title      = document.querySelector('.title');
let tasksDiv   = document.querySelector('.tasks');
//start function hide or show NoTaskIcon
// when click add Btn
//create task div 
inputField.focus()
AddBtn.onclick = function ()
{
    let localitems = JSON.parse(localStorage.getItem('localitem'))
    if(localitems === null)
    {
        tasklist = []
    }
    else
    {
        tasklist = localitems;
    }
    if(inputField.value!= '')
    {   
        tasklist.push(inputField.value);
        localStorage.setItem('localitem',JSON.stringify(tasklist))
        inputField.value = '';

    }else
    {
    pargaphNotas.style.display = 'block';
    setTimeout(showEnterNewItem,2000);
    }

     ShowItem ();
     deleteAll()
}
//functio show item
function ShowItem ()
{
    let output = '';
    let localitems = JSON.parse(localStorage.getItem('localitem'))
    if(localitems === null)
    {
        tasklist = []
        if(tasklist.length === 0)
        {
           tasksDiv.innerHTML = `<i class="fa fa-ban"></i>`
        }
    }
    else
    {
        tasklist = localitems;
    }
    tasklist.forEach((data,index) => {
        output += `  
        <div class="task animate__animated">
        <div class="taskContent">
           <input type="checkbox">
           <div class="title">${data}</div>
        </div>
        <div class="task-icon">
        <i onclick ="deletetask (${index})" class="fa fa-times"></i>
        </div>
     </div>`
    });
    // document.querySelector('.task').classList.add('animate__flipInX')
    tasksDiv.innerHTML  =output;
}
// function delete task
function deletetask (index)
{
    
    let localitems = JSON.parse(localStorage.getItem('localitem'))
    tasklist.splice(index,1);
    localStorage.setItem('localitem',JSON.stringify(tasklist));
    ShowItem();
    
    if(tasklist.length === 0)
    {
       tasksDiv.innerHTML = `<i class="fa fa-ban"></i>`
    }
    deleteAll ();
}
// FUNCTION ADD ANIMATE WHEN DELETE

// function show please enter new item
function showEnterNewItem ()
{
    pargaphNotas.style.display = 'none';
}
// function finished task
tasksDiv.addEventListener('click',(e)=> {
  if(e.target.type === 'checkbox')
  {
    if(e.target.checked == true)
    {
        e.target.parentElement.parentElement.classList.remove('task');
        e.target.parentElement.parentElement.classList.add('task-finshed');
        e.target.parentElement.parentElement.classList.add('animate__animated');
        e.target.parentElement.parentElement.classList.add('animate__flipInX');

        if( e.target.nextElementSibling.className=== 'title')
        {
            e.target.nextElementSibling.classList.add('task-finshed-line')
        }
    
    }else
    {
        e.target.parentElement.parentElement.classList.remove('task-finshed');
        e.target.parentElement.parentElement.classList.add('task');
        e.target.parentElement.parentElement.classList.remove('animate__animated');
        e.target.parentElement.parentElement.classList.remove('animate__flipInX');
        e.target.nextElementSibling.classList.remove('task-finshed-line');
    }
  }

})
// start function button delete all task
function deleteAll ()
{
    if(tasklist.length > 1)
    {
        let deleteAllBtn = document.createElement('button');
        deleteAllBtn.appendChild(document.createTextNode("DeleteAll"));
        deleteAllBtn.classList.add('deleteAll')
        tasksDiv.appendChild(deleteAllBtn);
        deleteAllBtn.onclick = function  ()
        {
            tasklist = [];
            localStorage.clear()
            ShowItem()
        }
    }
}
// start function date
function myDate() {
    var a = new Date();
    var weekday = new Array(7);
    weekday[0] = "Sunday 🖖";
    weekday[1] = "Monday 💪😀";
    weekday[2] = "Tuesday 😜";
    weekday[3] = "Wednesday 😌☕️";
    weekday[4] = "Thursday 🤗";
    weekday[5] = "Friday 🚀";
    weekday[6] = "Saturday 😴";
    var r = weekday[a.getDay()];
    document.querySelector('.container h1').innerHTML = "Seems, to be  " +r;
}
myDate();
ShowItem ();
deleteAll ()