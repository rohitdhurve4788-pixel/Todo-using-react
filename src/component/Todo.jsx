import React, { useEffect, useState } from 'react'
const Todo = () => {
    const [tasks, settasks] = useState('')
    const [task, settask] = useState(()=>{
        const tskdata=localStorage.getItem('taskdata')
        if(tskdata){
            try {
                return JSON.parse(tskdata)
            } catch (error) {
                console.error('An Error Occoured',error)
                return []
            }
        }
        return []
    })
    useEffect(()=>{
        localStorage.setItem('taskdata',JSON.stringify(task))
    },[task])
    const [editindex, seteditindex] = useState(null)
    const [edittask, setedittask] = useState('')
    const [filter,setfilter]=useState('All')
    const taskadder = () => {
        if (tasks.trim() === '') {
            alert('input feild cannot be empty')
            return
        }
        settask([...task, { task: tasks.trim(), complete: false }])
        settasks('')
    }
    const deletetask = (index) => {
        let deletr = task.filter((_, id) => id != index)
        settask(deletr)
    }
    const clearall = () => {
        settask([])
    }
    const clearcomplete = () => {
        let clear = task.filter((e, i) => e.complete != true)
        settask(clear)
    }
    const edittindex = (index) => {
        if (editindex === index) {
            if (edittask.trim() !== '') {
                let copy = [...task]
                copy[index] = {
                    ...copy[index], task: edittask.trim()
                }
                settask(copy)
                seteditindex(null)
            }
        } else {
            setedittask(task[index].task)
            seteditindex(index)
        }
    }
const toggletask = (index) => {
    settask(
        task.map((e, i) =>
            i === index ? { ...e, complete: !e.complete } : e
        )
    )
}
const taskfilter=task.filter((elem)=>{
    if(filter=='All') return elem
    if(filter=='Active') return elem.complete==false
    if(filter=='Completed') return elem.complete==true
})

    return (
        <div className='h-screen bg-black pt-15 text-white'>
            <div className='bg-[#333]   max-w-[600px] m-auto p-5 flex flex-col gap-5 rounded-2xl'>
                <div className='text-green-400  text-3xl font-semi-bold'>todo</div>
                <div className='flex  gap-4'>
                    <input onChange={(e) => (settasks(e.target.value))} onKeyDown={(e) => { e.key === 'Enter' && taskadder() }} className='bg-[#111] py-3 px-4 w-full outline-none rounded-md' type="text" value={tasks} placeholder='enter yiour task ' />
                    <button onClick={taskadder} className='py-2 px-4 bg-green-500 rounded-md cursor-pointer'>Add</button>
                </div>
                <div className='flex  justify-between items-center'>
                    <div className='flex gap-1.5'>
                        <span  onClick={()=>setfilter('All')} className={` text-white  py-2 px-3 rounded-md cursor-pointer ${filter== 'All' ? 'bg-green-400':'bg-[#222]   '}`} >All</span>
                        <span onClick={()=>setfilter('Active')} className={` text-white py-2 px-3 rounded-md cursor-pointer  ${filter== 'Active' ? 'bg-green-400  ':'bg-[#222]  '}`} >Active</span>
                        <span  onClick={()=>setfilter('Completed')} className={`text-white  py-2 px-3 rounded-md cursor-pointer ${filter== 'Completed' ? 'bg-green-400':'bg-[#222]  '}`} >Completed</span>
                    </div>
                    <span className='text-md'>{task.length} Task</span>
                </div>
                <div className='flex gap-2 flex-col  h-[250px] overflow-scroll hide-scrollbar'>
                    {
                        taskfilter.map((elem, idx) => {
                            return (
                                <div key={idx} className='flex justify-between bg-[#222] p-4 rounded-lg gap-2'>
                                    {
                                        editindex == idx ? (
                                            <input autoFocus={true} value={edittask} className=' outline-none border-b-2 border-green-400 w-full  ' onChange={(e) => setedittask(e.target.value)} onKeyDown={(e) => e.key == 'Enter' && edittindex(idx)} />
                                        ) : (
                                            <div className='flex gap-2  cursor-pointer'>
                                                <input className='accent-green-500  cursor-pointer select-none' type="checkbox" name="" id={idx} checked={elem.complete }   onChange={()=>toggletask(idx)}           />
                                                <label htmlFor={idx} className={`text-md cursor-pointer ${elem.complete && 'line-through'}`}>{elem.task}</label>
                                            </div>
                                        )
                                    }
                                    <div className='flex gap-2'>
                                        <div onClick={() => deletetask(idx)} className='w-5 h-5 bg-red-500 rounded-full  cursor-pointer'></div>
                                        <div onClick={() => edittindex(idx)} className={`w-5 h-5  rounded-full cursor-pointer  ${editindex === idx ? 'bg-green-400' : 'bg-yellow-300'}`}></div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>

                <div className='flex gap-3'>
                    <button onClick={clearcomplete} className='py-3 px-4 cursor-pointer bg-red-600 rounded-lg'>Clear completed</button>
                    <button onClick={clearall} className='py-3 px-4 cursor-pointer bg-[#222] rounded-lg'>Clear all</button>
                </div>
            </div>
        </div>
    )
}

export default Todo