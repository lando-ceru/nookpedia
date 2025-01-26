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

	let hidden = "";

	const higherBuyer = (props.cj) ? "CJ" : "Flick";
	const buyerPrice = (props.cj) ? props.cj : props.flick;
	const buyerMessage = (props.cj || props.flick) ? " (" + buyerPrice + " if sold to " + higherBuyer + ")" : "";
	
	const mode = (props.mode === "discover") ? true : false;

	month.map((m, i) => {
		return hidden = (!props.availability.months_array.includes(currentMonth) && mode) ? "not-available" : "";
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
									<Col className="col-6"><span className="label">{((props.weather) ? "Weather" : "Speed")}</span></Col><Col className="col-6"><span className="label">Price</span></Col>
								</Row>
								<Row className="col-12 mb-4">
									<Col className="col-6">{((props.weather) ? props.weather : props.speed)}</Col><Col className="col-6">{props.price} bells{buyerMessage}</Col>
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