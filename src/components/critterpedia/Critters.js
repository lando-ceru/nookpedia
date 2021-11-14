import React from 'react';
import { Col, Row } from 'react-bootstrap';
import "./Critters.css";
import CritterInfo from './CritterInfo.js';

class Critters extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			error: null,
			isLoaded: false,
			critters: []
		};
	}

	componentDidMount() {
		fetch("https://acnhapi.com/v1/" + this.props.catalog)
			.then(res => res.json())
			.then(
				(result) => {
					this.setState({
						isLoaded: true,
						critters: result
					});
				},
				// Note: it's important to handle errors here
				// instead of a catch() block so that we don't swallow
				// exceptions from actual bugs in components.
				(error) => {
					this.setState({
						isLoaded: true,
						error
					});
				}
			)
	}

	capitalizeName(name) {
		const words = name.split(" ");

		for (let i = 0; i < words.length; i++) {
			words[i] = words[i][0].toUpperCase() + words[i].substr(1);
		}

		return words.join(" ");
	}

	render() {
		const { error, isLoaded, critters } = this.state;
		if (error) {
			return <div>Error: {error.message}</div>;
		} else if (!isLoaded) {
			return <div>Loading...</div>;
		} else {
			return (
				<Row className="flex mx-auto">
					<div className="wrapper-b">
						{Object.entries(critters).map(([key, data]) => (
							<Col key={key} id={"cx" + data.id} className="flex item">
								<div className="p-1">
									<CritterInfo
										id={data.id}
										file={data["file-name"]}
										name={this.capitalizeName(data.name["name-USen"])}
										availability={data.availability}
										shadow={data.shadow}
										speed={data.speed}
										price={data.price}
										cj={data["price-cj"]}
										flick={data["price-flick"]}
										icon={data.icon_uri}
										image={data.image_uri}
										museum={data["museum-phrase"]}
										className={"p-1"}
										mode={this.props.mode}
									/>
								</div>
							</Col>
						))}
					</div>
				</Row>
			);
		}
	}
}

export default Critters;