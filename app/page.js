'use client'
import {db} from './firebaseConfig';
import { collection,addDoc,getDocs,deleteDoc,serverTimestamp,query,orderBy,doc,updateDoc} from 'firebase/firestore';
import React, {useState,useEffect} from 'react';
async function addTodoToFirebase(title, details, dueDate){
  try{
    const docRef = await addDoc(collection(db, "todos"),{
      title: title,
      details: details,
      dueDate: dueDate,
      createdAt : serverTimestamp(),

    });
    console.log("Todo added with ID: ",docRef.id);
    return true;
  }catch(error){
    console.error("Error adding todo: ",error);
    return false;
  }
}

// function to fetch todos from firestore
async function fetchTodosFromFirestore() {
  const todosCollection = collection(db, "todos");
  const querySnapshot = await getDocs(query(todosCollection,orderBy("createdAt","desc")));
  const todos = [];
  querySnapshot.forEach((doc) => {
    const todoData = doc.data();
    todos.push({id:doc.id, ...todoData});
  });
  return todos;
}

//delete todos
async function deleteTodoFromFirestore(todoId) {
  try {
    console.log("Attempting to delete todo with ID: ", todoId); // Corrected spelling
    await deleteDoc(doc(db, "todos", todoId)); // Corrected spelling
    return todoId;
  } catch (error) {
    console.error("Error deleting todo: ", error);
    return null;
  }
}

export default function Home() {
  const [title,setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [dueDate, setDueDate] = useState("");

  // state to hold the list of todos
  const [todos, setTodos] = useState([]);

  // state to hold the selected todo for update
  const [selectedTodo, setSelectedTodo] = useState(null);

  // state to track whether the form is in update mode.
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isUpdateMode) {
      if(selectedTodo) {
        try {
          const updatedTodo = {
            title,
            details,
            dueDate,
          };

          const todoRef = doc(db, "todos", selectedTodo.id);
          await updateDoc(todoRef,updatedTodo);


          // reset the form fields
          setTitle("");
          setDetails("");
          setDueDate("");
          setSelectedTodo(null);
          setIsUpdateMode(false);

          alert("Todo updated successfully!!")
        }catch(error){
          console.error("Error updating todo: ", error);
        }
      }
    }else{
      const added = await addTodoToFirebase(title, details, dueDate);
      if (added){
        setTitle("");
        setDetails("");
        setDueDate("");

        alert("Todo added to firestore successfully!!")
      }
    }
  };

  //fetch todos from firestore on component mount
  useEffect(() => {
    async function fetchTodos() {
      const todos = await fetchTodosFromFirestore();
      setTodos(todos);
    }
    fetchTodos();
  }, []);

  // function to handle update nutton click
  const handleUpdateClick = (todo) => {
    // set the selected todo's values to the form fields
    setTitle(todo.title || "");
    setDetails(todo.details || "");
    setDueDate(todo.dueDate || "");

    setSelectedTodo(todo);
    setIsUpdateMode(true);
  }

  //fetch todos from firestore on component mount
  useEffect(() => {
    async function fetchTodos() {
      const todos = await fetchTodosFromFirestore();
      setTodos(todos);
    }
    fetchTodos();
  }, []);



  return (
    <main className="flex flex-1 items-center justify-center flex-col md:flex-row min-h-screen">
    {/* Left Section */}
    <section className='flex-1 flex md:flex-col items-center md:justify-start mx-auto'>
      {/* Todo Form */}
      <div className='p-6 md:p-12 mt-10 rounded-lg shadow-xl w-full max-w-lg bg-white'>
        <h2 className='text-center text-2xl font-bold leading-9 text-gray-900'>
          {isUpdateMode ? "Update your Todo" : "Create a Todo"}
        </h2>
        <form className='mt-6 space-y-6' onSubmit={handleSubmit}>
          <div>
            <label htmlFor='title' className='block text-sm font-medium leading-6 text-gray-600'>
              Title
            </label>
            <div className='mt-2'>
              <input
                id="title"
                name="title"
                type="text"
                autoComplete='off'
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className='w-full rounded border py-2 pl-2 text-gray-900 shadow ring'
              />
            </div>
          </div>
          <div>
            <label htmlFor='details' className='block text-sm font-medium leading-6 text-gray-600'>
              Details
            </label>
            <div className='mt-2'>
              <textarea
                id="details"
                name="details"
                rows="4"
                autoComplete='off'
                required
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                className='w-full rounded border py-2 pl-2 text-gray-900 shadow ring'
              ></textarea>
            </div>
          </div>
          <div>
            <label htmlFor='dueDate' className='block text-sm font-medium leading-6 text-gray-600'>
              Due Date
            </label>
            <div className='mt-2'>
              <input
                id="dueDate"
                name="dueDate"
                type='date'
                autoComplete='off'
                required
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className='w-full rounded border py-2 pl-2 text-gray-900 shadow ring'
              />
            </div>
          </div>
          {/* Button to submit the form */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600 transition duration-300"
            >
              {isUpdateMode ? "Update Todo" : "Create Todo"}
            </button>
          </div>
        </form>
      </div>
    </section>
    {/* Right Section */}
    <section className='md:w-1/2 md:max-h-screen overflow-y-auto md:ml-10 mt-20 mx-auto'>
      {/* Todo List */}
      <div className='p-6 md:p-12 mt-10 rounded-lg shadow-xl w-full max-w-lg bg-white'>
        <h2 className='text-center text-xl font-bold leading-9 text-gray-900'>
          Todo List
        </h2>
        {/* Todo Items */}
        <div className='mt-6 space-y-6'>
          {todos.map((todo) => (
            <div key={todo.id} className='border p-4 rounded-md shadow-md'>
              <h3 className='text-lg font-semibold text-gray-900 break-words '>{todo.title}</h3>
                <p className='text-sm text-gray-500'>
                  Due Date: {todo.dueDate}
                </p>
                <p className='text-gray-700 multiline break-words'>
                  {todo.details}
                </p>
                <div className='mt-4 space-x-6'>
                  <button
                    type='button'
                    className='px-3 py-1 text-sm font-semibold text-white bg-blue-500 hover:bg-blue-600 rounded-md '
                    onClick={() => handleUpdateClick(todo)}
                    >
                      Update
                    </button>
                    <button
                     type='button'
                     onClick={async () => {
                      const deletedTodoId = await deleteTodoFromFirestore(todo.id);
                      if(deletedTodoId){
                        const updatedTodos = todos.filter((t) => t.id !== deletedTodoId);
                        setTodos(updatedTodos);
                      }
                     }}
                     className='px-3 py-1 text-sm font-semibold text-white bg-red-500 hover:bg-red-600 rounded-md'
                    >
                      Delete 

                    </button>
                </div>
              
                  
            </div>
          
          ))}
        </div>
      </div>
    </section>
    {/* <h1 className="mt-6 md:mt-0"><u>Rohan Raikar</u></h1> */}
  </main>
  
  );
}
