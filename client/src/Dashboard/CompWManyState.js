import React, {useState} from 'react';

export default function CompWManyState2() {
  const [name, setName] = useState('John');
  const [age, setAge] = useState(42);
  const [todos, setTodos] = useState([{text: 'Practice use State'}]);
  const [date, setDate] = useState(new Date());
  let divTodos = todos.map((e,id)=><li key={id}>{e.text}</li>)

  return (
    <>
        <div>Name: {name}, <span> Age: {age}</span></div>
        <div>Report date: {date.toLocaleString()}</div>
        <h2>Thing to dos:</h2>
        <ol>{divTodos}</ol>
        <label htmlFor="todoChoice">Choose a task:</label>
        <select id="todoChoice" onChange={
            (e)=>{
                let value = e.target.selectedOptions[0].innerText;
                let newTodos = todos.slice();
                newTodos.push({text:value});
                setTodos(newTodos)
                console.log(todos);
            }}>
            <option value="1">Sleeping</option>
            <option value="2">Exercise</option>
            <option value="3">Swimming</option>
            <option value="4">Learn new things!</option>
        </select>
    </>
  );
}

export function CompWManyState1() {
  // ใช้ useState เดียว เพิ่มวัตถุที่มีหลาย properties และ 1 ฟังก์ชันการปรับปรุง 

  const [compState, setCompState] = useState({
      name: "John", age: 42, todos: [{text: 'Practice use State'}],
      date:new Date()});
  
  let {name, age, todos, date} = compState;
  let divTodos = todos.map((e,id)=><li key={id}>{e.text}</li>)
  return (<div>
    <div>Name: {name}, <span> Age: {age}</span></div>
    <div>Report date: {date.toLocaleString()}</div>
    <h2>Thing to dos:</h2><ol>{divTodos}</ol>
   <label forHtml="todoChoice">Choose a task</label>
   <select id="todoChoice" onChange={
     (e)=>{
        let value = e.target.selectedOptions[0].innerText;
        let newTodos = todos.slice();
        newTodos.push({text: value});
        setCompState({...compState, todos: newTodos});
     }
   }>
     <option value="1">Sleeping</option>
     <option value="2">Swimming</option>
     <option value="3">Watching TV</option>
     <option value="4">Do Homework</option>
   </select>
</div>);
}
