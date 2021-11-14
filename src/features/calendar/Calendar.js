import React from 'react';
import "./Calendar.css";

function Calendar(props) {

	let availability = "unavailable";
	let current = "";
    
	return (
		<>
            <div className="seasonality">
                <h5 className="label">Seasonality</h5>
                <div className="calendar my-3">
                    {
                        props.months.map((month, i) => {
                            availability = (props.availableMonths.includes(i)) ? "available" : "unavailable";
                            current = (i === props.currentMonth) ? "current" : "";
                            return (
                                <div key={month + i} className={availability + " " + current}>
                                    <div className={availability + "-month"}>{month}</div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
		</>
	);
}


export default Calendar;