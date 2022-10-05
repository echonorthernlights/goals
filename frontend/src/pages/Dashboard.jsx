import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { getGoals, reset } from '../features/goals/goalSlice';

import Spinner from '../components/Spinner'
import GoalForm from '../components/GoalForm';
import GoalItem from '../components/GoalItem';

const Dashboard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth)
    const { goals, isError, isSuccess, message, isLoading } = useSelector((state) => state.goals)
    console.log(goals)
    useEffect(() => {
        if (isError) {
            console.log(message)
        }
        if (!user) {
            navigate('/login')
        }
        dispatch(getGoals())
        // fix the bug in this scenario "won't allow goals to reset goals:[], logout cause crash"
        // return () => {
        //     dispatch(reset());
        // }
    }, [user, isError, message, dispatch, navigate])

    if (isLoading) {
        return <Spinner />
    }
    return (
        <>
            <section className="heading">
                <h1>Welcome {user && user.name}</h1>
                <p>Goals Dshboard</p>
            </section>
            <GoalForm />
            <section className='content'>
                {goals.length > 0 ? (
                    <div className='goals'>
                        {goals.map((goal) => (
                            <GoalItem key={goal._id} goal={goal} />
                        ))}
                    </div>
                ) : (
                    <h3>You have not set any goals</h3>
                )}
            </section>
        </>
    )
}

export default Dashboard