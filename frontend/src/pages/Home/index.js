import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2, FiEdit } from 'react-icons/fi'

import api from '../../services/api';

import './styles.css'

import logoImg from '../../assets/logo.svg';

export default function Home() {

	const history = useHistory();

	const ongId = localStorage.getItem('ongId');
	const ongName = localStorage.getItem('ongName');

	const [incidents, setIncidents] = useState([]);

	useEffect(() => {
		api.get(`/home`, {
			headers: {
				Authorization: ongId,
			}
		}).then(response => {
			setIncidents(response.data);
		});
	}, [ongId]);

	async function handleDeleteIncident(id) {
		try {
			await api.delete(`incidents/${id}`, {
				headers: {
					Authorization: ongId,
				}
			});

			setIncidents(incidents.filter(incident => incident.id !== id))

		} catch (err) {
			alert('Erro ao deletar caso, tente novamente');
		}
	}

	async function startUpdateIncident(id, title, description, value) {

		localStorage.setItem('incidentId', id);
		localStorage.setItem('incidentTitle', title);
		localStorage.setItem('incidentDescription', description);
		localStorage.setItem('incidentValue', value);

		history.push(`/home/incidents/update`);
	}

	function handleLogout() {
		localStorage.clear();

		history.push('/');
	}

	return (
		<div className="profile-container">
			<header>
				<img src={logoImg} alt="Be The Hero"/>
				<span>Bem vinda, {ongName}</span>

				<Link className="button" to={'/home/incidents/new'} >Cadastrar novo caso</Link>
				<button type="button" onClick={handleLogout}>
					<FiPower size={18} color="#e02041" />
				</button>
			</header>

			<h1>Casos cadastrados</h1>

			<ul>
				{incidents.map(incident => (
					<li key={incident.id}>
						<strong>CASO:</strong>
						<p>{incident.title}</p>

						<strong>DESCRIÇÃO:</strong>
						<p>{incident.description}</p>

						<strong>VALOR:</strong>
						<p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>

						<button id="edit" onClick={() => startUpdateIncident(incident.id, incident.title, incident.description, incident.value)}>
							<FiEdit size={20} color="#a8a8b3" />
						</button>

						<button id="delete" onClick={() => handleDeleteIncident(incident.id)}>
							<FiTrash2 size={20} color="#a8a8b3" />
						</button>
					</li>
				))}
			</ul>
		</div>
	);
}