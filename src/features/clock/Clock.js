import React from 'react';
import "./Clock.css";

function Clock(props) {


    const d = new Date();
    let hour = d.getHours();
    let minutes = d.getMinutes();
	const hours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
	const hourDivs = [];
    let time_start = props.availableTime.split('–')[0];
    let time_finish = props.availableTime.split('–')[1];
    let hour_start = "";
    let hour_finish = "";
    var hourList = [];

    minutes = (100 * minutes) / 60;

	for (let i = 1; i <= 23; i++) {
		hourDivs.push(<div key={i} className="hour"></div>);
	}

    if(props.availableTime === "All day"){
        hour_start = 0;
        hour_finish = 23;
    }
    else{
        hour_start = time_start.includes("PM") ? parseInt(props.availableTime.replace(/(^\d+)(.+$)/i,'$1')) + 12 : props.availableTime.replace(/(^\d+)(.+$)/i,'$1');
        hour_finish = time_finish.includes("PM") ? parseInt(props.availableTime.match(/\d+/g)?.[1]) + 12 : props.availableTime.match(/\d+/g)?.[1];
    }

    if(hour_start < hour_finish){
        for (var i = hour_start; i <= hour_finish; i++) {
            hourList.push(i);
        }
    }
    else{
        for (i = hour_start; i <= 23; i++) {
            hourList.push(i);
        }
        for (i = 0; i <= hour_finish; i++) {
            hourList.push(i);
        }
    }

	let availabileHour = "unavailable";

	return (
		<>
            <div className="clock my-4">
                <div className="activeHours">
                    <h5 className="label">Current Active Hours</h5>
                    <div className="clock">
                        <div className="time_container">
                            <div className="am_pm">AM</div>
                            <div className="am_pm">PM</div>
                        </div>
                        <div className="time_container">
                            <div className="day_quarters">12</div>
                            <div className="day_quarters">6</div>
                            <div className="day_quarters">12</div>
                            <div className="day_quarters">6</div>
                        </div>
                        <div className="time">{hourDivs}</div>
                        <div className="current-time" style={{'left': ((100 * hour + minutes) / 23).toString() + "%"}}></div>
                        <div className="hour-bar">
                            {
                                hours.map((hour, i) => {
                                    availabileHour = (hourList.includes(i)) ? "available" : "unavailable";
                                    return (
                                        <div key={hour + i} className={availabileHour + "-hour"}></div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
		</>
	);
}


export default Clock;