/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import { useReducer, useRef } from 'react'

const reducer = (initState,action) => {

    switch(action.type){
        case "Add" :
            return [...initState,{id : Date.now(),text : action.payload, isVisible: true}]
        

        case "Toggle" :
            return initState.map((ele)=>{
                return ele.id===action.payload ? {...ele, isVisible : !ele.isVisible} : ele
            })
        

        default :
        return initState
    }

}

const TaskList = () => {

    const inputRef = useRef(null);
    const [state,dispatch] = useReducer(reducer,[]);

    const addTask = (e) => {
        return dispatch({type:'Add',payload:e.target.value}),
        inputRef.current.value = ''
    }

    const toggleTask = (taskId) => {
        return dispatch({type:'Toggle',payload:taskId})
    }

    const scroll = () => {
        window.scrollTo({top:0,behavior:'smooth'}),
        inputRef.current.focus()
    }

    return (

        <>
        
        <div>
            <input type='text' ref={inputRef} onKeyDown={(e)=> {
            if(e.key=='Enter'){
                addTask(e)}
             }
             }/>
        </div>

        <div>
            {

                state.map((ele)=>{
                    return <li key={ele.id}>

                        {
                            ele.isVisible ? <div>
                                {ele.text}
                                <button onClick={()=>toggleTask(ele.id)}>Toggle</button>
                            </div> : <div>
                                The Content Is Hidden
                                <button onClick={()=>toggleTask(ele.id)}>Toggle</button>
                            </div>

                        }

                    </li>
                })

            }
        </div>

        <div>
            <button onClick={()=>scroll()}>Scroll To Top</button>
        </div>
        
        </>


    )


}


export default TaskList