import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css'

import logoImg from '../../assets/logo.svg';

export default function UpdateIncident() {

	const [title, setTitle] = useState(localStorage.getItem('incidentTitle'));
	const [description, setDescription] = useState(localStorage.getItem('incidentDescription'));
	const [value, setValue] = useState(localStorage.getItem('incidentValue'));

	const id = localStorage.getItem('incidentId');

	const history = useHistory();

	function clearStorage() {
		localStorage.removeItem('incidentId');
		localStorage.removeItem('incidentTitle');
		localStorage.removeItem('incidentDescription');
		localStorage.removeItem('incidentValue');
	}

	async function handleUpdateIncident(e) {
		e.preventDefault();

		const data = {
			title,
			description,
			value
		}

		try {
			await api.put(`/incidents/${id}`, data);

		} catch (err) {
			alert('Erro ao alterar caso, tente novamente.');
		}
		
		clearStorage();

		history.push('/profile');
	}

	return (
		<div className="update-incident-container">
			<div className="content">
				<section>
					<img src={logoImg} alt="Be The Hero" />
					
					<h1>Alterar caso</h1>

					<p>Altere o caso conforme desejar.</p>

					<Link className="link" to="/profile" onClick={clearStorage}>
						<FiArrowLeft size={16} color="#E02041" />
						Voltar para home
					</Link>
				</section>

				<form onSubmit={handleUpdateIncident}>
					<input
						placeholder="Título do caso"
						value={title}
						onChange={e => setTitle(e.target.value)}
					/>
					<textarea
						placeholder="Descrição"
						value={description}
						onChange={e => setDescription(e.target.value)}
					/>
					<input
						type="number"
						placeholder="Valor em reais"
						value={value}
						onChange={e => setValue(e.target.value)}
					/>

					<button className="button" type="submit">Alterar</button>
				</form>
			</div>
		</div>
	);
}