import React, { useEffect, useState } from 'react';
import './App.css';
import { AjouterProduit } from './components/ajouterProduits';
import { ModifierProduit } from './components/modifierProduit';
import { TProduit } from './type/produit.type';

const baseUrl = 'http://localhost:8000/produits/';

function App() {
	const [produit, setProduit] = useState<TProduit[]>([]);

	const [page, setPage] = useState('bouton');

	const [numero, setnumero] = useState<TProduit>({
		id: 0,
		nom: 'string',
		prix: 0,
		quantite: 0,
	});

	const options = {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	};
	useEffect(() => {
		fetch(baseUrl, options)
			.then((response) => response.json())
			.then((data) => setProduit(data.data))
			.catch((erreur) => alert(erreur));
	}, []);

	let listShow;
	let affichage = 'off';

	//création de l'affichage, de la liste des produits en stock
	if (produit.length! > 0) {
		affichage = 'on';
		listShow = produit!.map((data) => (
			<tr key={data.id}>
				<th scope='row'>{data.id}</th>
				<td>{data.nom}</td>
				<td>{data.prix}</td>
				<td>{data.quantite}</td>
				<td>
					<button
						onClick={(e) => modifier(data)}
						type='button'
						className='btn btn-primary btn-sm me-2'
					>
						Editer
					</button>
					<button
						onClick={(e) =>
							deleteProduit(data.id)
						}
						type='button'
						className='btn btn-danger btn-sm ms-2'
					>
						Supprimer
					</button>
				</td>
			</tr>
		));
	}
	//fonction qui permet la suppression d'un produit
	const deleteProduit = async (id: number) => {
		const data = await fetch(baseUrl + id, {
			method: 'DELETE',
		});

		const dataJson = await data.json();

		if (dataJson.save) {
			const newList = produit.filter(
				(data) => data.id !== id
			);
			setProduit(newList);
		}
	};
	//fct qui permet l'affichage de l'element de modification d'un produit
	const modifier = async (data: TProduit) => {
		setPage('modifier');
		setnumero(data);
	};

	return (
		<div className='App text-center'>
			<nav className='navbar bg-primary '>
				<div className='container'>
					<p className='navbar-brand mb-0 h1 text-light'>
						<img
							className='me-2'
							src='favicon.png'
							alt='produit-logo'
							width='30'
							height='24'
						/>
						Produit
					</p>
				</div>
			</nav>
			<div className='container p-0 align-self-center'>
				<div className='m-5 text-start'>
					{page === 'bouton' && (
						<button
							onClick={() =>
								setPage('input')
							}
							type='button'
							className='btn btn-primary btn-lg'
						>
							Ajouter un produit
						</button>
					)}
				</div>
				{page === 'input' && (
					<AjouterProduit
						produit={produit}
						setProduit={setProduit}
						setPage={setPage}
					></AjouterProduit>
				)}
				{page === 'modifier' && (
					<ModifierProduit
						produit1={numero}
						produit={produit}
						setProduit={setProduit}
						setPage={setPage}
					></ModifierProduit>
				)}
				<div className='container row table-responsive'>
					{affichage === 'on' && (
						<table className='table'>
							<thead>
								<tr>
									<th scope='col'>
										#
									</th>
									<th scope='col'>
										Nom
									</th>
									<th scope='col'>
										Prix
									</th>
									<th scope='col'>
										Quantité
									</th>
									<th scope='col'>
										Action
									</th>
								</tr>
							</thead>
							<tbody>
								{listShow}
							</tbody>
						</table>
					)}
				</div>
			</div>
		</div>
	);
}

export default App;
