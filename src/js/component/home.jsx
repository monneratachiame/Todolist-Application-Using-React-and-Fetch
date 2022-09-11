import React, { useEffect, useState } from "react";
import { userName } from "../index.js";


//create your first component
const Home = () => {
	const [toDoList, setToDoList]=useState([]);
	const [value, setValue]=useState("");
	const [id, setId] = useState(0);
	const [fetchlist, setFetchlist] = useState([]);

	const handleKeyDown = (e) =>{
		if(e.key === 'Enter'){
			let item = {
				id: id,
				string: e.target.value
			}
			setFetchlist([...fetchlist, {"label":e.target.value,"done":false}])
			setToDoList([...toDoList,item])
			setValue("")
			setId(id => id + 1)
		}
	}
	console.log("fetch", fetchlist)

	// para criar usuario
	useEffect(() => {
		fetch('https://assets.breatheco.de/apis/fake/todos/user/monneratachiame', {
			method: "POST",
			body: JSON.stringify([]),
			headers: {
			  "Content-Type": "application/json"
			}
		  })
	},[])

	//faz uma fetchlist sempre que a todolist for alterada
	useEffect(() => {
		fetch('https://assets.breatheco.de/apis/fake/todos/user/monneratachiame', {
			method: "PUT",
			body: JSON.stringify(fetchlist),
			headers: {
			  "Content-Type": "application/json"
			}
		  })
	},[fetchlist])

	const url = `https://assets.breatheco.de/apis/fake/todos/user/monneratachiame`

	// este delete esta deletando as tarefas e o usuario
	const cleanTasks = () =>{
		fetch(url, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json"
			}
		})
		setToDoList([]);
	}

	function deleteItem(index) {
		let tpmArray = [...toDoList]
		tpmArray.splice(index, 1);
		setToDoList(tpmArray);

		let tpmArrayFetch = [...fetchlist]
		tpmArrayFetch.splice(index, 1);
		setFetchlist(tpmArrayFetch);
	}


	console.log(toDoList);
	return (
			<div className="w-50 m-auto">
				<h1 className="text-center">todos</h1>
				<ul className="list-group">
					<input className="list-group-item" 
						onKeyDown={handleKeyDown}
						onChange={e => setValue(e.target.value)}
						value={value}
					/>
					<div>
					{toDoList.map((toDo, index) => {
						return (
							<li key={toDo.id} style={{listStyle: "none", height: ""}}>
								{toDo.string}
								<button onClick={() => {deleteItem(index)}}>delete</button>
							</li>
						)
						})}
					</div>
				</ul>
				<button
				className="btn btn-danger"
				onClick={cleanTasks}>
				Clean All Tasks
			</button>
			</div>
	);
};

export default Home;
