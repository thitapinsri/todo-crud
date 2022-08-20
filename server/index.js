const express = require('express')
const db = require('./db.js')
const cors = require('cors')
const PORT = 3002
const app = express()
const bodyParser = require('body-parser')
app.use(cors())
// app.use(express.json())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (request, response) => {
    response.send("hello")
})

app.get("/todos",(request, response) => {
    const statement = db.prepare("SELECT * FROM todos")
    const result = statement.all();
    response.json(result)
} )

app.get("/todos/:id", function(request, response) {
    const id = request.params.id;
    const statement = db.prepare(`SELECT * FROM todos WHERE id = ${id}`);
    const result = statement.get()
    response.json(result)
})

app.post("/todos", (request, response) => {
    const title = request.body.title
    const date = request.body.date
    const status = request.body.status
    const remark = request.body.remark

    const statement = db.prepare("INSERT INTO todos (title, date, status, remark) VALUES (?, ?, ?, ?)")
    const result = statement.run(title, date, status, remark)
    response.json(result)
})

app.patch("/todos/:id", function(request, response) {
    const id = request.params.id
    const title = request.body.title
    const date = request.body.date
    const status = request.body.status
    const remark = request.body.remark

    const statement = db.prepare("UPDATE todos SET title = ? , date = ? , status = ? , remark = ? WHERE id = ?")
    const result = statement.run(title, date, status, remark, id)
    response.json(result)
})

app.delete("/todos/:id", function(request, response) {
    const id = request.params.id;
    const statement = db.prepare("DELETE FROM todos WHERE id = ?")
    const result = statement.run(id);
    response.json(result)
})

app.listen(PORT, function() {
    console.log(`application ready on port ${PORT}`)
})