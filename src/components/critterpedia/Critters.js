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
		fetch("https://api.nookipedia.com/nh/" + this.props.catalog, {
			mode: 'cors',
			headers: {
			  'X-API-KEY': '014227dc-46df-463f-8774-07bd27e15ef2'
			}
		})
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
				<Row className="flex mx-auto" style={{'place-content': "center"}}>
					<div className="wrapper-b">
						{Object.entries(critters).map(([key, data]) => (
							<Col key={key} id={"cx" + data.id} className="flex item">
								<div className="p-1">
									<CritterInfo
										id={data.number}
										// file={data["file-name"]}
										name={data.name}
										availability={data.north}
										shadow={data.shadow_size}
										speed={data.shadow_movement}
										location={data.location}
										rarity={data.rarity}
										price={data.sell_nook}
										cj={data.sell_cj}
										flick={data.sell_flick}
										icon={data.image_url}
										image={data.render_url}
										museum={data.catchphrases}
										weather={data.weather}
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