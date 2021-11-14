import React from 'react';
import "./Clock.css";

function Clock(props) {

	const hours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
	const hourDivs = [];
	for (let i = 1; i <= 23; i++) {
		hourDivs.push(<div key={i} className="hour"></div>);
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
                        <div className="hour-bar">
                            {
                                hours.map((hour, i) => {
                                    availabileHour = (props.availableTime.includes(i)) ? "available" : "unavailable";
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