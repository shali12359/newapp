import React, { Component } from 'react';
import Item from './pItem';


class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        const {TodoItem} = this.props

        return ( 
            <div>
                

                {
                    TodoItem.map(todoItem => {
                        return  <Item key={todoItem.CategoryID}  nb={todoItem.CategoryID}  onCheckComplete={this.props.onCheckComplete} 
                        task={todoItem.CategoryType}
                            />    
                    })
                }
               

                
                
            </div>
            
         );
    }
}


 
export default TodoList;