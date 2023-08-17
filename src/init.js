
// step 1 create dom
const dom ={
    input: document.getElementById('todo-input'),
    submitBtn: document.querySelector('.submit-btn'),
    list: document.querySelector('.todos-list'),
    clearBtn: document.querySelector('.clear-btn'),
}

// step 2 adding data

const data = {
   items:[
    {
        id : 1,
        text : 'buying groceies'
    },
    {
        id : 2,
        text : 'drink coffe'
    }
]
}

// 6 editItemHandler
const editItemHandler = (id)=>{
    dom.submitBtn.innerHTML = 'Edit';
     const selectedItem = data.items.find((item)=>item.id === Number(id));
     dom.input.value= selectedItem.text;
};

// 7 bdeleteItemHandler
const deleteItemHandler= (id)=>{
     // delete from data
     data.items = data.items.filter((item)=> item.id !== Number(id));
    // delete from dom
    document.getElementById(id).remove();
};
//  5 create function for creating component
const createList = (itemData)=>{
    //(1) wrap the list component
    const container =document.createElement('div');
    container.className = 'todo-item';
    container.id = itemData.id;

    //(2)title
    const title = document.createElement('p');
    title.className ='title';
    title.innerText= itemData.text;

    //(3)buttons container 
    const btnContainer =document.createElement('div');
    btnContainer.className='btn-container';
    
    //(4)edit button
    const editBtn = document.createElement('button');
    editBtn.className='edit-btn';
    editBtn.innerHTML='<i class="fas fa-edit"></i>';

    // edit button clcik event 
    editBtn.addEventListener('click',()=>{
       dom.submitBtn.innerText='Edit';
       container.classList.add('selected');
       editItemHandler(itemData.id);
    });

    // (5)delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.className='delete-btn';
    deleteBtn.innerHTML='<i class="fas fa-trash"></i>';

    // delete button click event 
    deleteBtn.addEventListener('click',()=>{
            deleteItemHandler(itemData.id);
    });
    
    btnContainer.append(editBtn,deleteBtn);
    container.append(title,btnContainer);

    return container;
};

// 4 load existing data
const loadhandler=()=>{
    data.items.forEach((item)=>{const createLists = createList(item);
     dom.list.append(createLists);
    });
    
};

// step 3 initialized dom
window.addEventListener('load',loadhandler);

//using submit button and after use
const addItemHandler = (value) => { 
   if(dom.submitBtn.innerHTML==='Edit'){
     const selectedItem =document.querySelector('.selected');
     const id = Number(selectedItem.id);
     //update data
     const item = data.items.find((item)=> item.id ===id);
     item.text= value;

     //update dom 
     selectedItem.querySelector('.title').innerText= value;
     dom.input.value ='';
     selectedItem.classList.remove('selected');
     dom.submitBtn.innerHTML='Submit';
   }
   else{

   
    const newItem={
        id:data.items.length+1,
        text: value,
    }

    // // add to data 
    data.items.push(newItem);

    // // add to dom
    const newItemDom= createList(newItem);
    dom.list.append(newItemDom);
    dom.input.value = '';
}

};
// 8 submit button
dom.submitBtn.addEventListener('click',(event) => {
    event.preventDefault();
    const value = dom.input.value;
    addItemHandler(value);
});


const clearAllHandler = ()=>{
    //clear data
    data.items=[];
    // clear dom
    dom.list.innerHTML='';

    dom.submitBtn.innerHTML = 'Submit';
    dom.input.value = '';
}
// 9 clear button
dom.clearBtn.addEventListener('click',()=>{
    clearAllHandler();
});



