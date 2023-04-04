
const todos = []
const link = "/api/v1/todos"




async function createToDo() {
    message = document.getElementById("ToDoString").value

    if (message == '') {
        alert("Message box can't be empty!")
        return
    }
    const toDoObject = { 'name': message, 'completed': false }
    const response = await fetch(link, {
        method: "POST", headers: {
            "Content-Type": "application/json",
        }, body: JSON.stringify(toDoObject)
    })
    const toDoResponse = await response.json()
    todos.push(toDoResponse.todo)
    addToDo(toDoResponse.todo)
}



function addToDo(toDo) {

    const list = document.getElementById("ToDoItemList")


    const messageNode = document.createTextNode(" " + toDo.name)


    const div = document.createElement("div")
    div.id = toDo._id

    const inputItem = document.createElement("input")

    inputItem.type = "checkbox"
    inputItem.checked = toDo.completed
    inputItem.id = `TodoItem${toDo._id}`
    inputItem.addEventListener('change', function () {

        for (i = 0; i < todos.length; ++i) {
            if (todos[i]._id == toDo._id) {
                if (this.checked) {
                    todos[i].completed = true
                }
                else {
                    todos[i].completed = false
                }
                fetch(link + '/' + toDo._id, {
                    method: "PATCH", headers: {
                        "Content-Type": "application/json",
                    }, body: JSON.stringify(todos[i])
                })
                break
            }
        }
    })

    const labelItem = document.createElement("label")
    labelItem.htmlFor = inputItem.id
    labelItem.className = "listItem"
    //labelItem.id = `ToDoItemLabel${itemCount}`

    labelItem.appendChild(messageNode)

    div.append(inputItem)
    div.append(labelItem)

    list.append(div)
}

async function deleteChecked() {

    for (i = 0; i < todos.length; ++i) {
        inputId = `TodoItem${todos[i]._id}`
        let inputCheckbox = document.getElementById(inputId)

        if (inputCheckbox == null) {
            continue
        }
        if (inputCheckbox.checked == true) {
            document.getElementById(todos[i]._id).remove()
            await fetch(link + '/' + todos[i]._id, {
                method: "DELETE"
            })
        }
    }
}


async function getData() {
    try {
        const response = await fetch(link)
        const result = await response.json()
        console.log(result)
        const array = result['todos']
        for (i = 0; i < array.length; ++i) {
            todos.push(array[i])
            addToDo(array[i])
        }
    } catch (error) {
        console.error(error)
    }

}

getData()

document.getElementById("SubmitButton").onclick = createToDo
document.getElementById("ClearCheckedButton").onclick = deleteChecked