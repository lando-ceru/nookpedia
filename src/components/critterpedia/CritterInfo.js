import React, { useState } from 'react';
import { Col, Row, OverlayTrigger, Tooltip, Modal } from 'react-bootstrap';
import Calendar from "../../features/calendar/Calendar.js";
import Clock from "../../features/clock/Clock.js";
import "./Critters.css";
//import { faClosedCaptioning } from '@fortawesome/free-solid-svg-icons';

function CritterInfo(props) {
	const [show, setShow] = useState(false);

	const d = new Date();
	const currentMonth = d.getMonth() + 1;
	const month = [];
	month[1] = "Jan.";
	month[2] = "Feb.";
	month[3] = "Mar.";
	month[4] = "Apr.";
	month[5] = "May.";
	month[6] = "Jun.";
	month[7] = "Jul.";
	month[8] = "Aug.";
	month[9] = "Sep.";
	month[10] = "Oct.";
	month[11] = "Nov.";
	month[12] = "Dec.";

	let availableTime = props.availability.availability_array[0].time;
    let hour = d.getHours();
    let minutes = d.getMinutes();
	const hours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
	const hourDivs = [];
    let time_start = availableTime.split('–')[0];
    let time_finish = availableTime.split('–')[1];
    let hour_start = "";
    let hour_finish = "";
    var hourList = [];

    minutes = (100 * minutes) / 60;

	for (let i = 1; i <= 23; i++) {
		hourDivs.push(<div key={i} className="hour"></div>);
	}

    if(availableTime === "All day"){
        hour_start = 0;
        hour_finish = 23;
    }
    else{
        hour_start = time_start.includes("PM") ? parseInt(availableTime.replace(/(^\d+)(.+$)/i,'$1')) + 12 : availableTime.replace(/(^\d+)(.+$)/i,'$1');
        hour_finish = time_finish.includes("PM") ? parseInt(availableTime.match(/\d+/g)?.[1]) + 12 : availableTime.match(/\d+/g)?.[1];
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

	let hidden = "";

	const higherBuyer = (props.cj) ? "CJ" : "Flick";
	const buyerPrice = (props.cj) ? props.cj : props.flick;
	const buyerMessage = (props.cj || props.flick) ? " (" + buyerPrice + " if sold to " + higherBuyer + ")" : "";
	
	const mode = (props.mode === "discover") ? true : false;

	month.map((m, i) => {
		hours.map((hour, j) => {
			return hidden = (!props.availability.months_array.includes(currentMonth) && mode) ? "not-available" : ((props.availability.months_array.includes(currentMonth) && (!hourList.includes(j)) && mode) ? "not-available-month" : "");
		})
	})


	return (
		<>
			<OverlayTrigger
				placement="top"
				overlay={
					<Tooltip id={`tooltip-top`}>
						<strong className="critterName">{props.name}</strong>
					</Tooltip>
				}
			>
				<img src={props.icon} alt={props.name} className={"p-1 " + hidden} variant="primary" onClick={() => setShow(true)} />
			</OverlayTrigger>

			<Modal
				show={show}
				onHide={() => setShow(false)}
				dialogClassName="modal-90w"
				aria-labelledby={props.file}
				centered
			>
				<Modal.Body className="my-5">
					<Row className="col-12">
						<Col className="col-md-6 col-12 critterLeft">
							<div className="critterTitleShadow">
								<div className="critterTitle">{props.name}</div>
							</div>
							<img src={props.image} alt={props.name} />
						</Col>
						<Col className="col-md-6 col-12 critterRight">
							<Calendar 
								months={month}
								availableMonths={props.availability.months_array}
								currentMonth={currentMonth}
							/>
							<Clock 
								availableTime={props.availability.availability_array["0"].time}
							/>
							<div className="info">
								<Row className="col-12 mb-1">
									<Col className="col-6"><span className="label">{((props.location) ? "Location" : "Shadow")}</span></Col><Col className="col-6"><span className="label">Rarity</span></Col>
								</Row>
								<Row className="col-12 mb-4">
									<Col className="col-6">{((props.location) ? props.location : props.shadow)}</Col><Col className="col-6">{((props.rarity) ? props.rarity : "Very Common")}</Col>
								</Row>
								<Row className="col-12 mb-1">
									<Col className="col-6"><span className="label">{((props.weather) ? "Weather" : ((props.speed) ? "Speed" : "Shadow"))}</span></Col><Col className="col-6"><span className="label">Price</span></Col>
								</Row>
								<Row className="col-12 mb-4">
									<Col className="col-6">{((props.weather) ? props.weather : ((props.speed) ? props.speed : props.shadow))}</Col><Col className="col-6">{props.price} bells{buyerMessage}</Col>
								</Row>
								<Row className="col-12">
									<Col className="col-12 mb-1"><span className="label">Catch notes</span></Col><Col className="col-12">{props.museum[Math.floor(Math.random() * props.museum.length)]}</Col>
								</Row>
							</div>
						</Col>
					</Row>
				</Modal.Body>
			</Modal>
		</>
	);
}


export default CritterInfo;