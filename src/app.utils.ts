export const showList = (todos) => 
     `Sizin etmeli isleniz: \n\n ${
        todos.map(todo => (todo.isCompleted ? '✅' : '⭕️') + ' ' + todo.name + '\n\n')
        .join('')}`