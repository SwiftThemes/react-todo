import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: ['Test', 'Today', 'Empty'],
            todos: [
                {
                    title: 'Submit the todo assignment',
                    category: 'Today',
                    done: false,
                },
                {
                    title: 'Prepare for the interview',
                    category: 'Today',
                    done: true,
                },
            ],
            newCategory: '',
            newTodo: '',
            activeCategory: 'Today',
        };
    }

    handleNewCategoryChange = (e) => {
        this.setState({ newCategory: e.target.value });
    };

    handleNewTodoChange = (e) => {
        this.setState({ newTodo: e.target.value });
    };

    addCategory = () => {
        const { categories, newCategory } = this.state;

        if (categories.indexOf(newCategory) !== -1) {
            alert('Category already exists.');
            return;
        }
        this.setState({ categories: [...categories, newCategory], newCategory: '', activeCategory: newCategory });
    };

    addTodo = () => {
        const { todos, activeCategory, newTodo } = this.state;
        const todo = { done: false, title: newTodo, category: activeCategory };
        this.setState({ todos: [...todos, todo], newTodo: '' });
    };

    toggleTodo = (e, todo) => {
        e.preventDefault();
        let message = 'Are you sure you want to mark this as complete?';
        if (todo.done) {
            message = 'Are you sure you want to mark this as incomplete?';
        }
        const agree = window.confirm(message);
        if (agree) {
            const { todos } = this.state;
            // Since todo is passed by reference, we are directly changing the property
            // instead of searching through the list, and then updating the state with new insatance
            todo.done = !todo.done;
            this.setState({ todos: [...todos] });
        }
    };

    deleteTodo = (e, todo) => {
        e.preventDefault();
        const agree = window.confirm(`Are you sure you want to delete "${todo.title}"`);
        if (agree) {
            const { todos } = this.state;
            const index = todos.indexOf(todo);
            if (index !== -1) {
                todos.splice(index, 1);
                this.setState({ todos: [...todos] });
            }
        }
    };

    render() {
        const { newCategory, categories, newTodo, todos, activeCategory } = this.state;

        const filteredTodos = todos.filter((todo) => todo.category === activeCategory);

        return (
            <div className="App">
                <div id="wrapper">
                    <div id="sb">
                        <div id="add-category">
                            <input type="text" value={newCategory} onChange={this.handleNewCategoryChange}></input>
                            <button disabled={!newCategory} onClick={() => this.addCategory()} title="Add category">
                                + Add
                            </button>
                        </div>

                        <ul id="categories">
                            {categories.map((cat) => (
                                <li key={cat}>
                                    <a
                                        href="#"
                                        onClick={() => {
                                            this.setState({ activeCategory: cat });
                                        }}
                                        className={cat === activeCategory ? 'active':''}
                                    >
                                        {cat}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div> 
                    
                    
                    <main id="main">
                        <header id="header">
                            <h1 className="title">{activeCategory} </h1>
                        </header>
                        <div className="clear"></div>
                        <div id="tood-list-wrapper">
                            {filteredTodos.length === 0 && (
                                <div className="no-todos">
                                    There are no todo's in this list!!<br></br>
                                    Please add some to get started
                                </div>
                            )}
                            {filteredTodos.length !== 0 && (
                                <ul id="todo-list">
                                    {filteredTodos.map((todo) => (
                                        <li className={todo.done ?'completed':''} key={todo.title}>
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    checked={todo.done}
                                                    onChange={(e) => this.toggleTodo(e, todo)}
                                                ></input>
                                                {todo.title}
                                            </label>
                                            <button className="delete-todo" onClick={(e) => this.deleteTodo(e, todo)} title="Delete todo">
                                                &times;
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        <div id="add-todo">
                            <textarea type="text" value={newTodo} onChange={this.handleNewTodoChange}></textarea>
                            <button disabled={!newTodo} onClick={() => this.addTodo()} title="Add todo">
                                + Add Todo
                            </button>
                        </div>
                    </main>
                </div>
            </div>
        );
    }
}

export default App;
