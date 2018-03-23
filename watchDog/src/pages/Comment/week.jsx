import React from 'react';
import moment from "moment";


// const Week = ({day, week, times, onShow}) => {
const Week = (item) => {
    return ( 
        <div>
            <div className="weekdayHeader">
                <span style={(moment().format('YYYY-MM-DD') === item.day) ? {color: 'rgb(112,157,228)'} : {}}>{item.day}</span>
                <span style={(moment().format('YYYY-MM-DD') === item.day) ? {color: 'rgb(112,157,228)'} : {}}>{item.week}</span>
            </div>
            {
                item.times.map((val, key) => {
                    if (val.used) {
                        return (
                            <div className="timeSingleBlock" key={val.time}>
                                <div className="create" onClick={() => item.onShow(item, val)}>
                                    {
                                        (val.time == val.beginTime) ? (
                                            <div className="active" style={{borderTop:'2px solid #fff'}}>
                                                <span className="description">{val.description}</span>
                                            </div>
                                        ) : (
                                            <div className="active">
                                                <span>.</span>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        )
                    } else {
                        return (
                            <div key={val.time} className="timeSingleBlock">
                                <div className="create"
                                onClick={() => item.onShow(item, val)}
                                >
                                    <div className="makeMeet">
                                        预定
                                    </div>
                                </div>
                            </div>
                        )
                    }
                })
            }
        </div>
    )
}


export default Week;
