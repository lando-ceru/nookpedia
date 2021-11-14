import React, { useState } from 'react';
import { Col, Row, OverlayTrigger, Tooltip, Modal } from 'react-bootstrap';
import Calendar from "../../features/calendar/Calendar.js";
import Clock from "../../features/clock/Clock.js";
import "./Critters.css";

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
		return hidden = (!props.availability["month-array-northern"].includes(currentMonth) && mode) ? "not-available" : "";
	})


	return (
		<>
			<OverlayTrigger
				placement="top"
				overlay={
					<Tooltip id={`tooltip-top`}>
						<strong>{props.name}</strong>
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
						<Col className="col-6 critterLeft">
							<div className="critterTitleShadow">
								<div className="critterTitle">{props.name}</div>
							</div>
							<img src={props.image} alt={props.name} width="100%" />
						</Col>
						<Col className="col-6 critterRight">
							<Calendar 
								months={month}
								availableMonths={props.availability["month-array-northern"]}
								currentMonth={currentMonth}
							/>
							<Clock 
								availableTime={props.availability["time-array"]}
							/>
							<div className="info">
								<Row className="col-12 mb-1">
									<Col className="col-6"><span className="label">{(props.availability.location) ? "Location" : "Speed"}</span></Col><Col className="col-6"><span className="label">{(props.availability.rarity) ? "Rarity" : "Shadow"}</span></Col>
								</Row>
								<Row className="col-12 mb-4">
									<Col className="col-6">{(props.availability.location) ? props.availability.location : props.speed}</Col><Col className="col-6">{(props.availability.rarity) ? props.availability.rarity : props.shadow}</Col>
								</Row>
								<Row className="col-12 mb-4">
									<Col className="col-12 mb-1"><span className="label">Price</span></Col><Col className="col-12">{props.price} bells{buyerMessage}</Col>
								</Row>
								{/* <Row className="col-12">
									<Col className="col-12 mb-1"><span className="label">Blather's notes</span></Col><Col className="col-12">{props.museum}</Col>
								</Row> */}
							</div>
						</Col>
					</Row>
				</Modal.Body>
			</Modal>
		</>
	);
}


export default CritterInfo;