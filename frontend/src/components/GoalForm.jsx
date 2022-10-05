import React from 'react'
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { createGoal } from '../features/goals/goalSlice'
const GoalForm = () => {
    const dispatch = useDispatch();
    const [text, setText] = useState('')
    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(createGoal({ text }))
        setText('')
    }
    return (
        <>
            <section className='form'>
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label htmlFor="text">Goal</label>
                        <input type="text" id="text" name='text' value={text} onChange={(e) => setText(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <button className='btn btn-block'>Submit</button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default GoalForm